/*global NoesisCode, CalendarApp, CalendarController, CalendarMonthViewController, CalendarDayViewController */
/**
 * Created with JetBrains WebStorm.
 * User: pouncilt
 * Date: 11/3/12
 * Time: 9:35 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('NoesisCodeCalendarApp.directives', [])
//angular.module('NoesisCodeCalendarApp', [])
    .directive('noesisCodeCalendarMonthView', function () {
        "use strict";
        return {
            restrict: 'E',
            scope: {

            },
            controller: CalendarMonthViewController,
            templateUrl: 'partials/calendar-month-view-template.html',
            compile: function (tElement, tAttrs, transclude) {
                return function (scope, element, attrs, controller) {

                };
            }
        };
    })
    .directive('noesisCodeCalendarDayView', function () {
        "use strict";
        return {
            restrict: 'E',
            scope: {

            },
            controller: CalendarDayViewController,
            templateUrl: 'partials/calendar-day-view-template.html',
            compile: function (tElement, tAttrs, transclude) {
                return function (scope, element, attrs, controller) {

                };
            }
        };
    })
    .directive('calendarEventSummary', function () {
        "use strict";
        return {
            restrict: 'A', //attribute only
            link: function (scope, elem, attr, ctrl) {
                elem.bind('dragstart', function (event) {
                    event.target.style.opacity = '0.4';  // this / event.target is the source node.
                    event.originalEvent.dataTransfer.effectAllowed = "move";
                    event.originalEvent.dataTransfer.setData("text/html", event.target.id);
                });
                elem.bind('dragend', function (event) {
                    var calendarEventSummaries = NoesisCode.DOMUtility.querySelectorAll(".calendar-event-summary"),
                        calendarDayContainers = NoesisCode.DOMUtility.querySelectorAll(".calendar-day-container");
                    [].forEach.call(calendarEventSummaries, function (calendarEventSummary) {
                        calendarEventSummary.classList.remove("over");
                    });
                    [].forEach.call(calendarDayContainers, function (calendarDayContainer) {
                        calendarDayContainer.classList.remove("over");
                    });
                    event.target.style.opacity = '1';
                });
            }
        };
    })
    .directive('calendarDay', function () {
        "use strict";
        return {
            require: "^noesisCodeCalendarMonthView",
            restrict: 'A', //attribute only
            link: function (scope, elem, attr, ctrl) {


                elem.bind('dragenter', function (event) {
                    var targetDate = NoesisCode.converters.DateConverter.convertToDate(event.target.id, NoesisCode.converters.DateConverter.MMMDDYYYY_DATE_FORMAT);/*,
                        correspondingLastWeekInMonthDate = new Date(targetDate.getTime()),
                        correspondingLastWeekInMonthDay = null,
                        correspondingLastWeekInMonthElement = null;

                    correspondingLastWeekInMonthDate.setDate(correspondingLastWeekInMonthDate.getDate() + 7);*/
                    event.target.classList.remove("calendar-day-top-border");
                    if (CalendarApp.getInstance().getCurrentMonth().isLastWeekInMonth(targetDate)) {
                        event.target.classList.remove("calendar-day-bottom-border");
                    }
                    /*if(CalendarApp.getInstance().getCurrentMonth().isLastWeekInMonth(correspondingLastWeekInMonthDate)){
                        correspondingLastWeekInMonthDay = CalendarApp.getInstance().getCurrentMonth().findDayInMonth(correspondingLastWeekInMonthDate);
                        correspondingLastWeekInMonthElement = NoesisCode.DOMUtility.querySelector("#" + correspondingLastWeekInMonthDay.getId());
                        correspondingLastWeekInMonthElement.classList.remove("calendar-day-top-border");
                    }*/
                    event.target.classList.add("over");
                });
                elem.bind('dragover', function handleDragOver(e) {
                    if (e.preventDefault) {
                        e.preventDefault(); // Necessary. Allows us to drop.
                    }

                    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

                    return false;
                });
                elem.bind('drop', function (event) {
                    var targetStartDate = NoesisCode.converters.DateConverter.convertToDate(event.target.id, NoesisCode.converters.DateConverter.MMMDDYYYY_DATE_FORMAT),
                        calendarEventId;
                    if (event.stopPropagation) {
                        event.stopPropagation();
                    }
                    if (event.preventDefault) {
                        event.preventDefault();
                    }

                    event.target.classList.remove("over");
                    event.target.classList.add("calendar-day-top-border");
                    if (CalendarApp.getInstance().getCurrentMonth().isLastWeekInMonth(targetStartDate)) {
                        event.target.classList.add("calendar-day-bottom-border");
                    }

                    calendarEventId = NoesisCode.DOMUtility.filterMetaData(event.originalEvent.dataTransfer.getData("text/html"));
                    scope.rescheduleEvent(calendarEventId, targetStartDate);

                    return false;
                });
                elem.bind('dragleave', function (event) {
                    var targetDate = NoesisCode.converters.DateConverter.convertToDate(event.target.id, NoesisCode.converters.DateConverter.MMMDDYYYY_DATE_FORMAT);/*,
                        correspondingLastWeekInMonthDate = new Date(targetDate.getTime()),
                        correspondingLastWeekInMonthDay = null,
                        correspondingLastWeekInMonthElement = null;

                    correspondingLastWeekInMonthDate.setDate(correspondingLastWeekInMonthDate.getDate() + 7);*/
                    event.target.classList.remove("over");
                    event.target.classList.add("calendar-day-top-border");
                    if (CalendarApp.getInstance().getCurrentMonth().isLastWeekInMonth(targetDate)) {
                        event.target.classList.add("calendar-day-bottom-border");
                    }
                    /*if(CalendarApp.getInstance().getCurrentMonth().isLastWeekInMonth(correspondingLastWeekInMonthDate)){
                        correspondingLastWeekInMonthDay = CalendarApp.getInstance().getCurrentMonth().findDayInMonth(correspondingLastWeekInMonthDate);
                        correspondingLastWeekInMonthElement = NoesisCode.DOMUtility.querySelector("#" + correspondingLastWeekInMonthDay.getId());
                        correspondingLastWeekInMonthElement.classList.add("calendar-day-top-border");
                    }*/
                });
            }
        };
    })
    .directive('calendarDayEvent', function () {
        "use strict";
        return {
            restrict: 'A', //attribute only
            link: function (scope, elem, attr, ctrl) {
                elem.bind('dragstart', function (event) {
                    event.target.style.opacity = '0.4';  // this / event.target is the source node.
                    event.originalEvent.dataTransfer.effectAllowed = "move";
                    event.originalEvent.dataTransfer.setData("text/html", event.target.id);
                });
                elem.bind('dragend', function (event) {
                    var calendarEventSummaries = NoesisCode.DOMUtility.querySelectorAll(".calendar-event-summary"),
                        calendarDayContainers = NoesisCode.DOMUtility.querySelectorAll(".calendar-day-container");
                    [].forEach.call(calendarEventSummaries, function (calendarEventSummary) {
                        calendarEventSummary.classList.remove("over");
                    });
                    [].forEach.call(calendarDayContainers, function (calendarDayContainer) {
                        calendarDayContainer.classList.remove("over");
                    });
                    event.target.style.opacity = '1';
                });
            }
        };
    })
    .directive('calendarDayHour', function () {
        "use strict";
        return {
            require: "^noesisCodeCalendarDayView",
            restrict: 'A', //attribute only
            link: function (scope, elem, attr, ctrl) {
                elem.bind('dragenter', function (event) {
                    CalendarApp.getInstance().saveLastDraggedEnterElementId(this.id);
                    CalendarApp.getInstance().saveLastDraggedElementId(event.target.id);
                    CalendarApp.getInstance().deselectHalfHourBlock(event);
                    CalendarApp.getInstance().selectHalfHourBlock(event);

                });
                elem.bind('dragover', function handleDragOver(e) {
                    if (e.preventDefault) {
                        e.preventDefault(); // Necessary. Allows us to drop.
                    }

                    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

                    return false;
                });
                elem.bind('drop', function (event) {
                    var targetEventArray = CalendarApp.getInstance().getLastDraggedElementId().split(":"),
                        eventArray = CalendarApp.getInstance().getLastDraggedEnterElementId().split(":"),
                        calendarEventId = targetEventArray[targetEventArray.length - 1],
                        targetStartDate = NoesisCode.converters.DateConverter.convertToDate(eventArray[0], NoesisCode.converters.DateConverter.MMMDDYYYY_DATE_FORMAT);

                    CalendarApp.getInstance().deselectHalfHourBlock(event);

                    targetStartDate.setHours(eventArray[1]);
                    targetStartDate.setMinutes(eventArray[2]);

                    scope.rescheduleEvent(calendarEventId, targetStartDate);
                    CalendarApp.getInstance().saveLastDraggedElementId(null);

                    if (event.stopPropagation) {
                        event.stopPropagation();
                    }
                    if (event.preventDefault) {
                        event.preventDefault();
                    }
                    return false;
                });
                elem.bind('dragleave', function (event) {

                });
            }
        };
    });