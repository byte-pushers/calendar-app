/*global NoesisCode, CalendarApp */
/**
 * Created with JetBrains WebStorm.
 * User: pouncilt
 * Date: 11/3/12
 * Time: 9:35 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('NoesisCodeCalendar', ['NoesisCodeCalendarService'])
    .directive('noesisCodeCalendarMonthView', function () {
        "use strict";
        return {
            restrict: 'E',
            scope: {

            },
            controller: CalendarController,
            templateUrl: 'partials/calendar-month-view-template.html',
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
            link: function(scope, elem, attr, ctrl) {
                elem.bind('dragstart', function (event) {
                    "use strict";
                    event.target.style.opacity = '0.4';  // this / event.target is the source node.
                    event.originalEvent.dataTransfer.effectAllowed = "move";
                    event.originalEvent.dataTransfer.setData("text/html", event.target.id);
                });
                elem.bind('dragend', function (event) {
                    "use strict";
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
            link: function(scope, elem, attr, ctrl) {


                elem.bind('dragenter', function (event) {
                    "use strict";
                    var targetDate = NoesisCode.converters.DateConverter.convertToDate(event.target.id, NoesisCode.converters.DateConverter.MMMDDYYYY_DATE_FORMAT);/*,
                        correspondingLastWeekInMonthDate = new Date(targetDate.getTime()),
                        correspondingLastWeekInMonthDay = null,
                        correspondingLastWeekInMonthElement = null;

                    correspondingLastWeekInMonthDate.setDate(correspondingLastWeekInMonthDate.getDate() + 7);*/
                    event.target.classList.remove("calendar-day-top-border");
                    if(CalendarApp.getInstance().getCurrentMonth().isLastWeekInMonth(targetDate)){
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
                    'use strict';
                    var targetDate = NoesisCode.converters.DateConverter.convertToDate(event.target.id, NoesisCode.converters.DateConverter.MMMDDYYYY_DATE_FORMAT),
                        calendarEventId = null;
                    if (event.stopPropagation) {
                        event.stopPropagation();
                    }
                    if (event.preventDefault) {
                        event.preventDefault();
                    }

                    event.target.classList.remove("over");
                    event.target.classList.add("calendar-day-top-border");
                    if(CalendarApp.getInstance().getCurrentMonth().isLastWeekInMonth(targetDate)){
                        event.target.classList.add("calendar-day-bottom-border");
                    }

                    calendarEventId = NoesisCode.DOMUtility.filterMetaData(event.originalEvent.dataTransfer.getData("text/html"));
                    scope.rescheduleEvent(calendarEventId, targetDate);

                    return false;
                });
                elem.bind('dragleave', function (event) {
                    "use strict";
                    var targetDate = NoesisCode.converters.DateConverter.convertToDate(event.target.id, NoesisCode.converters.DateConverter.MMMDDYYYY_DATE_FORMAT);/*,
                        correspondingLastWeekInMonthDate = new Date(targetDate.getTime()),
                        correspondingLastWeekInMonthDay = null,
                        correspondingLastWeekInMonthElement = null;

                    correspondingLastWeekInMonthDate.setDate(correspondingLastWeekInMonthDate.getDate() + 7);*/
                    event.target.classList.remove("over");
                    event.target.classList.add("calendar-day-top-border");
                    if(CalendarApp.getInstance().getCurrentMonth().isLastWeekInMonth(targetDate)){
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
    });