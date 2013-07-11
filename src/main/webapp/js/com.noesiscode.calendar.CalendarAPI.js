/*global CalendarApp:true, $, NoesisCode, document, console, location*/

function CalendarApp() {
    "use strict";
    var classProps = [], instance, prop;   // cached instance

    function doNotFilterClassProperties(prop) {
        var filters = ["getClassType", "getObjectType"], doFilter = true;
        if (prop !== undefined) {
            filters.every(function (element) {
                if (prop === element) {
                    doFilter = false;
                    return false;
                }
                return true;
            });
        } else {
            doFilter = false;
        }

        return doFilter;
    }

    for (prop in CalendarApp) {
        if (CalendarApp.hasOwnProperty(prop)) {
            if (doNotFilterClassProperties(prop) === true) {
                classProps[classProps.length] = {name: prop, value: CalendarApp[prop]};
            }
        }
    }
    // rewrite the constructor
    CalendarApp = function CalendarApp() {
        return instance;
    };
    // carry over prototype properties
    CalendarApp.prototype = this;
    classProps.forEach(function (prop, index) {
        CalendarApp[prop.name] = prop.value;
    });
    // the instance
    instance = new CalendarApp();
    // the rest of the constructor pointer
    instance.constructor = CalendarApp;

    instance.events = [];
    instance.displayedEvents = [];
    instance.cachedWeeks = [];
    instance.lastDraggedEnterElement = [];
    instance.lastDraggedEnterElementId = null;
    instance.lastDraggedElementId = null;
    /**
     * <p>Represents the current calendar month.</p>
     * @private
     * @field
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    instance.currentMonth = null;
    /**
     * <p>Represents a cached calendar month.
     * @private
     * @field
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    instance.cachedMonth = null;
    //instance.compareStartTimesOfEventsFunction = null;

    //instance.setCompareStartTimesOfEventsFunction = function (func) {
    //    console.log("*** setting instance.compareStartTimesOfEventsFunction = " + func);
    //    instance.compareStartTimesOfEventsFunction = func;
    //};
    //instance.getCompareStartTimesOfEventsFunction = function () {console.log("3.1.1");
    //    console.log("3.1.1 - instance:"+ instance);
    //    console.log("3.1.1 - instance.compareStartTimesOfEventsFunction:"+ instance.compareStartTimesOfEventsFunction);
    //    return instance.compareStartTimesOfEventsFunction;
    //}
    instance.setEvents = function (events) {
        instance.events = events;
    };
    instance.getEvents = function () {
        return instance.events;
    };
    instance.applyEvents = function () {
        if (instance.currentMonth !== undefined && instance.currentMonth !== null) {
            instance.currentMonth.setEvents(instance.events);
        }
    };
    instance.getTodaysEvents = function () {
        return instance.findEventsByDate(new Date());
    };
    instance.findEventsByDate = function (someDate) {
        var selectedEvents = [], continuationEvents = instance.findContinuationEvents(someDate);

        instance.events.forEach(function (event, index) {
            if (event !== undefined && event !== null) {
                if (event.getStart().isDateEqualTo(someDate)) {
                    selectedEvents[selectedEvents.length] = event;
                }
            }
        });
        return continuationEvents.concat(selectedEvents);
    };
    instance.findEventsByDateAndTime = function (someDate) {
        var selectedEvents = [];
        instance.events.forEach(function (event, index) {
            if (event !== undefined && event !== null) {
                if (event.getStart().isDateEqualToDateAndTime(someDate)) {
                    selectedEvents[selectedEvents.length] = event;
                }
            }
        });
        return selectedEvents;
    };
    instance.findContinuationEvents = function (someDate) {
        var selectedEvents = [];
        instance.events.forEach(function (event, index) {
            if (instance.isEventAContinuationFromDate(event, someDate)) {
                selectedEvents[selectedEvents.length] = event;
            }
        });

        return selectedEvents;
    };
    instance.isEventAContinuationFromDate = function (event, someDate) {
        var yesterday = new Date(), result = false;
        yesterday.setTime(someDate.getTime());
        yesterday.setDate(yesterday.getDate() - 1);

        if (event !== undefined && event !== null) {
            if (event.getStart().isDateEqualTo(yesterday) && event.getEnd().isDateEqualTo(someDate)) {
                if (event.getEnd().getHours() === 0 && event.getEnd().getMinutes() >= 15) {
                    result = true;
                } else if (event.getEnd().getHours() > 0) {
                    result = true;
                }
            }
        }

        return result;
    };
    instance.calculateHowManyEventsHaveSameStartTime = function (targetEvent) {
        var eventsWithSameStartTime = [];
        targetEvent.setEventsWithSameStartTime([]);
        instance.findEventsByDateAndTime(targetEvent.getStart()).forEach(function (event, index) {
            if (event !== undefined && event !== null) {
                if (event.getId() !== targetEvent.getId()) {
                    eventsWithSameStartTime[eventsWithSameStartTime.length] = event;
                }
            }
        });
        targetEvent.setEventsWithSameStartTime(eventsWithSameStartTime);
        return eventsWithSameStartTime;
    };
    instance.calculateEventIndentWidth = function (events) {
        var hasConflictingEventsWithIncreasedWidth = false;
        events.forEach(function (event, index, events) {
            if (event.getZIndex() > event.getDefaultZIndex()) {
                if (!event.indentWidthWasIncreased() && event.getEventsWithSameStartTime().length > 0) {
                    hasConflictingEventsWithIncreasedWidth = event.getEventsWithSameStartTime().some(function (event) {
                        if (event.indentWidthWasIncreased()) {
                            return true;
                        }

                        return false;
                    });

                    if (!hasConflictingEventsWithIncreasedWidth) {
                        event.setIndentWidth((event.getZIndex() * event.getIndentWidth()));
                        event.indentWidthWasIncreased(true);
                    }
                } else if (!event.indentWidthWasIncreased()) {
                    event.setIndentWidth((event.getZIndex() * event.getIndentWidth()));
                    event.indentWidthWasIncreased(true);
                }
            }
        });
    };
    instance.shuffleEventsZIndex = function (targetEvent, targetEvents) {
        targetEvents.forEach(function (event, index, events) {
            if (targetEvent !== undefined && targetEvent !== null && event !== undefined && event !== null) {
                if (targetEvent.getId() !== event.getId()) {
                    switch (targetEvent.hasConflictingStartTimes(event)) {
                    case 0:
                        //No conflicting start times and no conflicting end times.
                        break;
                    case 1:
                        //Conflicting start times.
                        if (targetEvent.compareStartTimes(event) === 1) {
                            targetEvent.setZIndex(event.getZIndex() + 1);
                        } else if (targetEvent.compareStartTimes(event) === -1) {
                            event.setZIndex(targetEvent.getZIndex() + 1);
                        } /*else {
                            //targetEvent.setZIndex(event.getZIndex() - 1);
                        }*/
                        break;
                    case 2:
                        //Conflicting start times and conflicting end times.
                        if (targetEvent.compareStartTimes(event) === 1) {
                            targetEvent.setZIndex(event.getZIndex() + 1);
                        } else if (targetEvent.compareStartTimes(event) === -1) {
                            event.setZIndex(targetEvent.getZIndex() + 1);
                        } /*else {
                            //targetEvent.setZIndex(event.getZIndex() - 1);
                        } */
                        break;
                    case 3:
                        //Conflicting end times.
                        targetEvent.setZIndex(event.getZIndex() - 1);
                        break;
                    }

                }
            }
        });
    };
    instance.findEventById = function (id, someEvents) {
        var targetEvent = null,
            events = (someEvents !== undefined && someEvents !== null) ? someEvents : instance.events;
        events.forEach(function (event, index) {
            if (event !== undefined && event !== null) {
                if (event.getId() === parseInt(id, 10)) {
                    targetEvent = event;
                }
            }
        });
        return targetEvent;
    };
    instance.rescheduleEvent = function (calendarEventId, targetStartDate) {
        var calendarEvent = CalendarApp.getInstance().findEventById(calendarEventId),
            calendarEventDuration = (new CalendarApp.models.DateRange(calendarEvent.getStart(), calendarEvent.getEnd())).calculateDuration().toFixed(2),
            targetEndDate =  targetStartDate.addTime(calendarEventDuration);

        if (targetEndDate.getHours() === 0 &&
            targetEndDate.getMinutes() === 0 &&
            targetEndDate.getSeconds() === 0 ) {
            targetEndDate.setDate(targetStartDate.getDate());
            targetEndDate.setHours(23, 59, 59);
        }

        calendarEvent.reschedule(targetStartDate, targetEndDate);
        calendarEvent.resetDisplay();
        return instance.events;
    };
    instance.saveLastDraggedEnterElementId = function (elementId) {
        instance.lastDraggedEnterElementId = elementId;
    };
    instance.getLastDraggedEnterElementId = function () {
        return instance.lastDraggedEnterElementId;
    };
    instance.saveLastDraggedElementId = function (elementId) {
        if ((instance.lastDraggedElementId === undefined || instance.lastDraggedElementId === null) &&
                elementId !== undefined && elementId !== null) {
            instance.lastDraggedElementId = elementId;
        } else if (elementId === undefined || elementId === null) {
            instance.lastDraggedElementId = elementId;
        }
    };
    instance.selectHalfHourBlock = function (event) {
        var containerId = instance.getLastDraggedEnterElementId(),
            targetContainerId = instance.getLastDraggedElementId(),
            targetElementIdArray = instance.getLastDraggedElementId().split(":"),
            elementIdArray = containerId.split(":"),
            hourBefore = Math.abs((elementIdArray[1]) - 1),
            containerId30MinutesBefore;

        if (elementIdArray[1] !== targetElementIdArray[1] || elementIdArray[2] !== targetElementIdArray[2]) {
            //console.log("dragenter - containerId      :" + containerId);
            //console.log("dragenter - targetContainerId:" + targetContainerId);
            //console.log("dragenter - targetId         :" + event.target.id);
            document.getElementById(containerId).classList.remove("calendar-day-view-right-half-hour-block-regular-border"); // Remove Solid Line
            document.getElementById(containerId).classList.add("calendar-day-view-right-half-hour-block-over-border"); // Remove Dashed Line
            if (elementIdArray[2] === "00") {
                if (elementIdArray[1] === "0") {
                    //hourBefore = Math.abs((new Number(elementIdArray[1]) - 1)),
                    containerId30MinutesBefore = "calendar-day-view-right-header";
                    //console.log("dragenter - containerId30MinutesBefore: " + containerId30MinutesBefore);
                    if (document.getElementById(containerId).classList.contains("calendar-day-view-top-of-the-hour-block-regular-border")) {
                        document.getElementById(containerId).classList.remove("calendar-day-view-top-of-the-hour-block-regular-border");  // Remove Bottom Dotted Line
                        document.getElementById(containerId).classList.add("calendar-day-view-top-of-the-hour-block-over-border"); // Add Bottom Dashed Line
                    }
                    if (document.getElementById(containerId30MinutesBefore).classList.contains("calendar-day-view-right-header-normal")) {
                        document.getElementById(containerId30MinutesBefore).classList.remove("calendar-day-view-right-header-normal"); // Remove Bottom Solid Line
                        document.getElementById(containerId30MinutesBefore).classList.add("calendar-day-view-right-header-over"); // Add Bottom Dashed Line
                    }
                } else {
                    containerId30MinutesBefore = elementIdArray[0] + ":" + hourBefore + ":30";
                    //console.log("dragenter - containerId30MinutesBefore: " + containerId30MinutesBefore);
                    if (document.getElementById(containerId).classList.contains("calendar-day-view-top-of-the-hour-block-regular-border")) {
                        document.getElementById(containerId).classList.remove("calendar-day-view-top-of-the-hour-block-regular-border");  // Remove Bottom Dotted Line
                        document.getElementById(containerId).classList.add("calendar-day-view-top-of-the-hour-block-over-border"); // Add Bottom Dashed Line
                    }
                    if (document.getElementById(containerId30MinutesBefore).classList.contains("calendar-day-view-bottom-of-the-hour-block-regular-border")) {
                        document.getElementById(containerId30MinutesBefore).classList.remove("calendar-day-view-bottom-of-the-hour-block-regular-border"); // Remove Bottom Solid Line
                        document.getElementById(containerId30MinutesBefore).classList.add("calendar-day-view-bottom-of-the-hour-block-over-border"); // Add Bottom Dashed Line
                    }
                }
            } else if (elementIdArray[2] === "30") {
                containerId30MinutesBefore = elementIdArray[0] + ":" + elementIdArray[1] + ":00";
                //console.log("dragenter - containerId30MinutesBefore: " + containerId30MinutesBefore);
                if (document.getElementById(containerId30MinutesBefore).classList.contains("calendar-day-view-top-of-the-hour-block-regular-border")) {
                    document.getElementById(containerId30MinutesBefore).classList.remove("calendar-day-view-top-of-the-hour-block-regular-border"); // Remove Bottom Dotted Line
                    document.getElementById(containerId30MinutesBefore).classList.add("calendar-day-view-top-of-the-hour-block-over-border");  // Add Bottom Dashed Line
                }
                if (document.getElementById(containerId).classList.contains("calendar-day-view-bottom-of-the-hour-block-regular-border")) {
                    document.getElementById(containerId).classList.remove("calendar-day-view-bottom-of-the-hour-block-regular-border"); // Remove Bottom Solid Line
                    document.getElementById(containerId).classList.add("calendar-day-view-bottom-of-the-hour-block-over-border");  // Add Bottom Dashed Line
                }
            }

            instance.lastDraggedEnterElement.push(containerId);
        }
    };
    instance.deselectHalfHourBlock = function (event) {
        var containerId = instance.lastDraggedEnterElement.pop(),
            targetElementIdArray = instance.getLastDraggedElementId().split(":"),
            elementIdArray,
            hourBefore,
            containerId30MinutesBefore;


        if (containerId !== undefined && containerId !== null) {
            elementIdArray = containerId.split(":");
            hourBefore = Math.abs((elementIdArray[1]) - 1);
            console.log("dragleave - containerId      :" + containerId);
            if (elementIdArray[1] !== targetElementIdArray[1] || elementIdArray[2] !== targetElementIdArray[2]) {
                document.getElementById(containerId).classList.remove("calendar-day-view-right-half-hour-block-over-border");  // Remove Dashed Line
                document.getElementById(containerId).classList.add("calendar-day-view-right-half-hour-block-regular-border");  // Add Solid Line
                if (elementIdArray[2] === "00") {
                    if (elementIdArray[1] === "0") {
                        containerId30MinutesBefore = "calendar-day-view-right-header";
                        console.log("dragleave - containerId30MinutesBefore: " + containerId30MinutesBefore);
                        if (document.getElementById(containerId).classList.contains("calendar-day-view-top-of-the-hour-block-over-border")) {
                            document.getElementById(containerId).classList.remove("calendar-day-view-top-of-the-hour-block-over-border"); // Remove Bottom Dashed Line
                            document.getElementById(containerId).classList.add("calendar-day-view-top-of-the-hour-block-regular-border"); // Add Bottom Dotted Line
                        }
                        if (document.getElementById(containerId30MinutesBefore).classList.contains("calendar-day-view-right-header-over")) {
                            document.getElementById(containerId30MinutesBefore).classList.remove("calendar-day-view-right-header-over"); // Remove Bottom Solid Line
                            document.getElementById(containerId30MinutesBefore).classList.add("calendar-day-view-right-header-normal"); // Add Bottom Dashed Line
                        }
                    } else {
                        containerId30MinutesBefore = elementIdArray[0] + ":" + hourBefore + ":30";
                        console.log("dragleave - containerId30MinutesBefore: " + containerId30MinutesBefore);
                        if (document.getElementById(containerId).classList.contains("calendar-day-view-top-of-the-hour-block-over-border")) {
                            document.getElementById(containerId).classList.remove("calendar-day-view-top-of-the-hour-block-over-border"); // Remove Bottom Dashed Line
                            document.getElementById(containerId).classList.add("calendar-day-view-top-of-the-hour-block-regular-border"); // Add Bottom Dotted Line
                        }
                        if (document.getElementById(containerId30MinutesBefore).classList.contains("calendar-day-view-bottom-of-the-hour-block-over-border")) {
                            document.getElementById(containerId30MinutesBefore).classList.remove("calendar-day-view-bottom-of-the-hour-block-over-border"); // Remove Bottom Dashed Line
                            document.getElementById(containerId30MinutesBefore).classList.add("calendar-day-view-bottom-of-the-hour-block-regular-border"); // Add Bottom Solid Line
                        }
                    }
                } else if (elementIdArray[2] === "30") {
                    containerId30MinutesBefore = elementIdArray[0] + ":" + elementIdArray[1] + ":00";
                    console.log("dragleave - containerId30MinutesBefore: " + containerId30MinutesBefore);
                    if (document.getElementById(containerId30MinutesBefore).classList.contains("calendar-day-view-top-of-the-hour-block-over-border")) {
                        document.getElementById(containerId30MinutesBefore).classList.remove("calendar-day-view-top-of-the-hour-block-over-border");  // Remove Bottom Dashed Line
                        document.getElementById(containerId30MinutesBefore).classList.add("calendar-day-view-top-of-the-hour-block-regular-border");  // Add Bottom Dotted Line
                    }
                    if (document.getElementById(containerId).classList.contains("calendar-day-view-bottom-of-the-hour-block-over-border")) {
                        document.getElementById(containerId).classList.remove("calendar-day-view-bottom-of-the-hour-block-over-border"); // Remove Bottom Dashed Line
                        document.getElementById(containerId).classList.add("calendar-day-view-bottom-of-the-hour-block-regular-border"); // Add Bottom Solid Line
                    }
                }
            }
        }
    };
    instance.getLastDraggedElementId = function () {
        return instance.lastDraggedElementId;
    };
    instance.getDayId = function (someDate) {
        var day = someDate.getDate();
        if (NoesisCode.NumberUtility.isSingleDigit(day)) {
            day = NoesisCode.NumberUtility.padLeft(day, 2);
        }
        return CalendarApp.models.Day.monthNames[someDate.getMonth()].abbr + day + someDate.getFullYear();
    };
    /**
     * <p>Gets the {@link Calendar.models.Month} object for the current month.</p>
     *
     * @returns {Calendar.models.Month} The {@link Calendar.models.Month} object for the current month.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    instance.getCurrentMonth = function () {
        return instance.currentMonth;
    };
    /**
     * <p>Sets the {@link Calendar.models.Month} object for the current month.</p>
     *
     * @param {Calendar.models.Month} Represents a new current {@link Calendar.models.Month} object.
     * @returns {Void}
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    instance.setCurrentMonth = function (cMonth) {
        instance.currentMonth = cMonth;
    };
    /**
     * <p>Gets the cached {@link Calendar.models.Month} object for the current calendar view.</p>
     *
     * @returns {Calendar.models.Month} The cached {@link Calendar.models.Month} object for the current calendar view.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    instance.getCachedMonth = function () {
        return instance.cachedMonth;
    };
    /**
     * <p>Sets the cached {@link Calendar.models.Month} object for the current calendar view.</p>
     *
     * @param {Calendar.models.Month} Represents a new cached {@link Calendar.models.Month} object.
     * @returns {Void}
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    instance.setCachedMonth = function (cMonth) {
        instance.cachedMonth = cMonth;
    };
    instance.getCalendarDayViewUrl = function (redirectTo) {
        location.href = redirectTo + instance.currentMonth.getSelectedDate().getTime();
    };
    instance.getCalendarMonthViewUrl = function (redirectTo) {
        location.href = redirectTo + instance.currentMonth.getSelectedDate().getTime();
    };

    return instance;
}
CalendarApp.getInstance = function getInstance() {
    'use strict';
    var instance;
    instance = new CalendarApp();
    return instance;
};
CalendarApp.namespace = function (ns_string) {
    'use strict';
    var parts = ns_string.split('.'), parent = CalendarApp;
    // strip redundant leading global
    if (parts[0] === "CalendarApp") {
        parts = parts.slice(1);
    }
    parts.forEach(function (part, index) {
        // create a property if it doesn't exist
        if (typeof parent[part] === "undefined") {
            parent[part] = {};
        }
        parent = parent[part];
    });
    /*for (i = 0; i < parts.length; i = i + 1) {
        // create a property if it doesn't exist
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }*/
    return parent;
};
CalendarApp.instance = null;
CalendarApp.views = CalendarApp.views || CalendarApp.namespace("com.noesiscode.calendar.views");
CalendarApp.models = CalendarApp.models || CalendarApp.namespace("com.noesiscode.calendar.models");
