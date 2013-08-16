/*global CalendarApp, NoesisCode*/
/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 12/19/12
 * Time: 12:02 AM
 * To change this template use File | Settings | File Templates.
 */
function CalendarMonthViewController($scope, $location, $routeParams, CalendarEventService) {
    "use strict";
    if ($routeParams.selectedDate !== undefined &&
            $routeParams.selectedDate !== null &&
            NoesisCode.NumberUtility.isANumber($routeParams.selectedDate)) {
        $scope.targetDate =  new Date();
        $scope.targetDate.setTime($routeParams.selectedDate);
    } else {
        $scope.targetDate = new Date();
        $scope.todaysEvents = [];
    }

    CalendarApp.getInstance().setCurrentMonth(new CalendarApp.models.Month($scope.targetDate));
    CalendarApp.getInstance().setCachedMonth(new CalendarApp.models.Month($scope.targetDate));
    $scope.month = CalendarApp.getInstance().getCurrentMonth();
    $scope.weeks = $scope.month.getWeeks();
    $scope.todaysEvents = [];


    CalendarEventService.query(function (jsonEvents) {
        // TODO: Once the persistence layer is in place, remove if statement but keep if statement body.
        // This if statement is only in place to keep the day view from reloading the events when they
        // are re-scheduled on the month view.
        if (CalendarApp.getInstance().getEvents().length === 0) {
            CalendarApp.getInstance().setEvents(CalendarApp.models.EventTransformer.transformJSONEvents(jsonEvents));
        }
        CalendarApp.getInstance().applyEvents();
        $scope.todaysEvents = CalendarApp.getInstance().findEventsByDate($scope.targetDate);
    });

    $scope.go = function (path) {
        path = path + CalendarApp.getInstance().getCurrentMonth().getSelectedDate().getTime();
        $location.path(path);
    };

    $scope.getCalendarDayClass = function (day) {
        var cssClass = ($scope.month.isLastWeekInMonth(day.getDate())) ? "calendar-day-top-border calendar-day-bottom-border " : "calendar-day-top-border ";

        if (day.getWeekDay(true) === "Sun") {
            cssClass += "calendar-day-left-border ";
        }

        if (day.hasEvents() && day.isCurrentDayOfWeek()) {
            cssClass += "calendar-day-selected-with-events calendar-day-right-border ";
        } else if (day.hasEvents()) {
            cssClass += "calendar-day-with-events calendar-day-right-border ";
        } else if (day.isCurrentDayOfWeek()) {
            cssClass += "calendar-day-selected calendar-day-right-border ";
        } else {
            cssClass += "calendar-day-with-no-events calendar-day-right-border ";
        }

        return cssClass;
    };
    $scope.selectDay = function (selectedDate, resetWeeks) {
        var previouslySelectedDate = new Date($scope.month.getSelectedDate().getTime()), selectedDay;
        selectedDay = $scope.month.selectDay(selectedDate, resetWeeks);
        resetWeeks = (resetWeeks !== undefined && resetWeeks !== null) ? resetWeeks : false; //Todo: Check for type boolean.
        $scope.todaysEvents = selectedDay.getEvents();
        $scope.month.highLightSelectedDay(previouslySelectedDate);
    };
    $scope.selectToday = function () {
        var previouslySelectedDate = new Date($scope.month.getSelectedDate().getTime()),
            cachedWeeks = CalendarApp.getInstance().getCachedMonth().getWeeks(),
            todaysDate = new Date(),
            selectedDay;

        if (CalendarApp.utils.MonthUtility.isDateNotInMonthView(todaysDate, cachedWeeks)) {
            selectedDay = $scope.month.selectDay(todaysDate, true);
            $scope.weeks = $scope.month.getWeeks();
            CalendarApp.getInstance().setCachedMonth(new CalendarApp.models.Month(todaysDate));
        } else {
            selectedDay = $scope.month.selectDay(todaysDate);
            $scope.todaysEvents = selectedDay.getEvents();
        }
    };
    $scope.selectNextDay = function () {
        var previouslySelectedDate = new Date($scope.month.getSelectedDate().getTime()),
            cachedWeeks = CalendarApp.getInstance().getCachedMonth().getWeeks(),
            selectedDay = $scope.month.selectNextDay();

        if (CalendarApp.utils.MonthUtility.isDateNotInMonthView(selectedDay.getDate(), cachedWeeks)) {
            $scope.weeks = $scope.month.getWeeks();
            CalendarApp.getInstance().setCachedMonth(new CalendarApp.models.Month(selectedDay.getDate()));
        }

        $scope.todaysEvents = selectedDay.getEvents();
        $scope.month.highLightSelectedDay(previouslySelectedDate);
    };
    $scope.selectPreviousDay = function () {
        var previouslySelectedDate = new Date($scope.month.getSelectedDate().getTime()),
            cachedWeeks = CalendarApp.getInstance().getCachedMonth().getWeeks(),
            selectedDay = $scope.month.selectPreviousDay();

        if (CalendarApp.utils.MonthUtility.isDateNotInMonthView(selectedDay.getDate(), cachedWeeks)) {
            $scope.weeks = $scope.month.getWeeks();
            CalendarApp.getInstance().setCachedMonth(new CalendarApp.models.Month(selectedDay.getDate()));
        }

        $scope.todaysEvents = selectedDay.getEvents();
        $scope.month.highLightSelectedDay(previouslySelectedDate);
    };
    $scope.selectFirstDayOfPreviousMonth = function () {
        var selectedDate = $scope.month.getDateFor1stDayOfPreviousMonth();
        $scope.selectDay(selectedDate, true);
        $scope.weeks = $scope.month.getWeeks();
        CalendarApp.getInstance().setCachedMonth(new CalendarApp.models.Month(selectedDate));
    };
    $scope.selectFirstDayOfNextMonth = function () {
        var selectedDate = $scope.month.getDateFor1stDayOfNextMonth();
        $scope.selectDay(selectedDate, true);
        $scope.weeks = $scope.month.getWeeks();
        CalendarApp.getInstance().setCachedMonth(new CalendarApp.models.Month(selectedDate));
    };
    $scope.rescheduleEvent = function (calendarEventId, targetStartDate) {
        var currentlySelectedDate = CalendarApp.getInstance().getCurrentMonth().getSelectedDate();
        CalendarApp.getInstance().rescheduleEvent(calendarEventId, targetStartDate);
        CalendarApp.getInstance().applyEvents();
        //$scope.month = CalendarApp.getInstance().getCurrentMonth();
        //$scope.weeks = $scope.month.getWeeks();//CalendarApp.getInstance().getCurrentMonth().getWeeks();
        $scope.selectDay(currentlySelectedDate, false);
        $scope.month.highLightTargetDayWithEvents(targetStartDate);
        $scope.$apply(function () {
            $scope.todaysEvents = CalendarApp.getInstance().findEventsByDate(currentlySelectedDate);
        });

        //$scope.month.highLightSelectedDay(new Date($scope.month.getSelectedDate().getTime()));
    };
}
CalendarMonthViewController.$inject = ['$scope', '$location', '$routeParams', 'CalendarEventService'];
function CalendarDayViewController($scope, CalendarEventService, /*CalendarDayHoursService,*/ $routeParams) {
    "use strict";
    $scope.selectedDate = new Date();
    if ($routeParams.selectedDate !== undefined &&
            $routeParams.selectedDate !== null &&
            NoesisCode.NumberUtility.isANumber($routeParams.selectedDate)) {
        $scope.selectedDate.setTime($routeParams.selectedDate);
    }
    $scope.todaysEvents = [];
    $scope.dayHours = [];

    if (!CalendarApp.getInstance().getCurrentMonth()) {
        CalendarApp.getInstance().setCurrentMonth(new CalendarApp.models.Month($scope.selectedDate));
        CalendarApp.getInstance().setCachedMonth(new CalendarApp.models.Month($scope.selectedDate));
    }

    $scope.selectedDay = CalendarApp.getInstance().getCurrentMonth().getCurrentDayOfTheMonth();

    CalendarEventService.query(function (jsonEvents) {
        // TODO: Once the persistence layer is in place, remove if statement but keep if statement body.
        // This if statement is only in place to keep the day view from reloading the events when they
        // are re-scheduled on the month view.
        if (CalendarApp.getInstance().getEvents().length === 0) {
            CalendarApp.getInstance().setEvents(CalendarApp.models.EventTransformer.transformJSONEvents(jsonEvents));
        }
        CalendarApp.getInstance().applyEvents();
        $scope.todaysEvents = CalendarApp.getInstance().getTodaysEvents();

    });

    /*CalendarDayHoursService.query(function (jsonDayHours) {
        $scope.dayHours = jsonDayHours;
        $scope.dayHours.forEach(function (dayHour, index) {
            if (dayHour !== undefined && dayHour !== null) {
                dayHour.events = $scope.findEventsWithStartTime(dayHour.hour, dayHour.minutes);
            }
        });
    });*/

    $scope.selectNextDay = function () {
        var cachedWeeks = CalendarApp.getInstance().getCachedMonth().getWeeks(),
            selectedDay;

        $scope.selectedDate = CalendarApp.getInstance().getCurrentMonth().getNextDate($scope.selectedDate);

        if (CalendarApp.utils.MonthUtility.isDateNotInMonthView($scope.selectedDate, cachedWeeks)) {
            selectedDay = CalendarApp.getInstance().getCurrentMonth().selectNextDay(true);
            CalendarApp.getInstance().setCachedMonth(new CalendarApp.models.Month(selectedDay.getDate()));
        } else {
            selectedDay = CalendarApp.getInstance().getCurrentMonth().selectNextDay();
        }

        $scope.selectedDate = selectedDay.getDate();
        $scope.todaysEvents = selectedDay.getEvents();
    };
    $scope.selectPreviousDay = function () {
        var cachedWeeks = CalendarApp.getInstance().getCachedMonth().getWeeks(),
            selectedDay;

        $scope.selectedDate = CalendarApp.getInstance().getCurrentMonth().getPreviousDate($scope.selectedDate);

        if (CalendarApp.utils.MonthUtility.isDateNotInMonthView($scope.selectedDate, cachedWeeks)) {
            selectedDay = CalendarApp.getInstance().getCurrentMonth().selectPreviousDay(true);
            CalendarApp.getInstance().setCachedMonth(new CalendarApp.models.Month(selectedDay.getDate()));
        } else {
            selectedDay = CalendarApp.getInstance().getCurrentMonth().selectPreviousDay();
        }
        $scope.selectedDate = selectedDay.getDate();
        $scope.todaysEvents = selectedDay.getEvents();
    };
    $scope.selectToday = function () {
        var cachedWeeks = CalendarApp.getInstance().getCachedMonth().getWeeks(),
            selectedDay;

        $scope.selectedDate = new Date();

        if (CalendarApp.utils.MonthUtility.isDateNotInMonthView($scope.selectedDate, cachedWeeks)) {
            selectedDay = CalendarApp.getInstance().getCurrentMonth().selectDay(new Date(), true);
            CalendarApp.getInstance().setCachedMonth(new CalendarApp.models.Month(selectedDay.getDate()));
        } else {
            selectedDay = CalendarApp.getInstance().getCurrentMonth().selectDay(new Date());
        }

        $scope.selectedDate = selectedDay.getDate();
        $scope.todaysEvents = selectedDay.getEvents();
    };
    $scope.getSelectedDayDecoratedDisplayName = function () {
        return CalendarApp.getInstance().getCurrentMonth().getSelectedDateDecoratedDisplayName();
    };
    $scope.findEventsWithStartTime = function (startTimeHour, startTimeMinutes) {
        var events = [], continuationEvents = [];
        if (startTimeHour === 0 && startTimeMinutes === 0) {
            continuationEvents = CalendarApp.getInstance().findContinuationEvents($scope.selectedDate);
        }
        $scope.selectedDate.setHours(startTimeHour);
        $scope.selectedDate.setMinutes(startTimeMinutes);
        events = CalendarApp.getInstance().findEventsByDateAndTime($scope.selectedDate);
        return continuationEvents.concat(events);
    };
    $scope.getDayId = function () {
        return CalendarApp.getInstance().getDayId($scope.selectedDate);
    };
    $scope.configureDisplayedEvent = function (baseHeight, event) {
        var halfUnit = baseHeight / 2,
            durationInHoursAndMinutes = (new CalendarApp.models.DateRange(event.getStart(), event.getEnd())).calculateDuration().toFixed(2),
            durationInHours = (Math.floor(durationInHoursAndMinutes)).toFixed(2),
            durationInMinutes =  Math.floor((durationInHoursAndMinutes - durationInHours) * 100),
            heightUnit = (durationInMinutes === 0) ? 0 : durationInMinutes / 15,
            totalNumberOfEventsWithSameStartTime = event.getTotalNumberOfEventsWithSameStartTime(),
            calculatedHeight,
            calculatedWidth,
            timeToMidnightFromStartTime,
            midnight,
            cssObj = {};

        if (!event.getStart().isDateEqualTo(event.getEnd())) {
            if (event.getStart().isDateEqualTo($scope.selectedDate)) {
                midnight = new Date();
                midnight.setTime(event.getStart().getTime());
                midnight.setDate(midnight.getDate() + 1);
                midnight.setHours(0, 0, 0, 0);
                timeToMidnightFromStartTime = (new CalendarApp.models.DateRange(event.getStart(), midnight)).calculateDuration().toFixed(2);

                if (durationInHoursAndMinutes > timeToMidnightFromStartTime) {
                    durationInHours = Math.floor(timeToMidnightFromStartTime);
                    if (durationInHours === 0) {
                        durationInMinutes =  (timeToMidnightFromStartTime) * 100;
                    } else {
                        durationInMinutes = 0;
                    }
                    heightUnit = (durationInMinutes === 0) ? 0 : durationInMinutes / 15;
                }
            } else {
                if (event.getEnd().isDateEqualToYesterday(event.getStart())) {
                    durationInHours = event.getEnd().getHours();
                    durationInMinutes =  event.getEnd().getMinutes();
                    heightUnit = (durationInMinutes === 0) ? 0 : durationInMinutes / 15;
                }
            }

        }

        heightUnit = (heightUnit === 1) ? halfUnit : (heightUnit === 2) ? baseHeight : (heightUnit === 3) ? baseHeight + halfUnit : 0;
        calculatedHeight = (baseHeight * (durationInHours * 2)) + heightUnit;
        calculatedHeight += "px";

        calculatedWidth = (90 / totalNumberOfEventsWithSameStartTime);
        if (totalNumberOfEventsWithSameStartTime === 1) {
            calculatedWidth = calculatedWidth + 8;
        }

        calculatedWidth = calculatedWidth + "%";


        cssObj.height = calculatedHeight;
        cssObj.width = calculatedWidth;
        cssObj.zIndex = event.getZIndex();
        cssObj.marginLeft =  event.indentWidth + "px";

        return cssObj;
    };
    $scope.rescheduleEvent = function (calendarEventId, targetStartDate) {
        CalendarApp.getInstance().rescheduleEvent(calendarEventId, targetStartDate);
        CalendarApp.getInstance().applyEvents();
        $scope.$apply(function () {
            $scope.todaysEvents = CalendarApp.getInstance().findEventsByDate($scope.selectedDate);
        });
    };
}
CalendarDayViewController.$inject = ['$scope', 'CalendarEventService', /*'CalendarDayHoursService',*/'$routeParams'];
