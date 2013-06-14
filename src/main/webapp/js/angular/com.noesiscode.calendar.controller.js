/*global CalendarApp*/
/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 12/19/12
 * Time: 12:02 AM
 * To change this template use File | Settings | File Templates.
 */
function CalendarMonthViewController($scope, CalendarEventService, $routeParams) {
    "use strict";
    if ($routeParams.selectedDate !== undefined &&
        $routeParams.selectedDate !== null &&
        NoesisCode.NumberUtility.isANumber($routeParams.selectedDate)) {
        $scope.targetDate =  new Date();
        $scope.targetDate.setTime($routeParams.selectedDate);
    } else {
        $scope.targetDate = new Date();
    }
    CalendarApp.getInstance().setCurrentMonth(new CalendarApp.models.Month($scope.targetDate));
    CalendarApp.getInstance().setCachedMonth(new CalendarApp.models.Month());
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
    $scope.rescheduleEvent = function (calendarEventId, targetDate) {
        var currentlySelectedDate = CalendarApp.getInstance().getCurrentMonth().getSelectedDate();
        CalendarApp.getInstance().rescheduleEvent(calendarEventId, targetDate);
        CalendarApp.getInstance().applyEvents();
        //$scope.month = CalendarApp.getInstance().getCurrentMonth();
        //$scope.weeks = $scope.month.getWeeks();//CalendarApp.getInstance().getCurrentMonth().getWeeks();
        $scope.selectDay(currentlySelectedDate, false);
        $scope.month.highLightTargetDayWithEvents(targetDate);
        $scope.$apply(function () {
            $scope.todaysEvents = CalendarApp.getInstance().findEventsByDate(currentlySelectedDate);
        });

        //$scope.month.highLightSelectedDay(new Date($scope.month.getSelectedDate().getTime()));
    };
}
CalendarMonthViewController.$inject = ['$scope', 'CalendarEventService', '$routeParams'];
function CalendarDayViewController($scope, CalendarEventService, CalendarDayHoursService, $routeParams) {
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
        if (CalendarApp.getInstance().getEvents().length == 0) {
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
        var events = [];
        $scope.selectedDate.setHours(startTimeHour);
        $scope.selectedDate.setMinutes(startTimeMinutes);
        events = CalendarApp.getInstance().findEventsByDateAndTime($scope.selectedDate);
        return events;
    };
    $scope.getSelectedDate = function () {
        return $scope.selectedDate.getMonth() + "-" +$scope.selectedDate.getDate() + "-" + $scope.selectedDate.getFullYear();
    };
    $scope.configureDisplayedEvent = function (baseHeight, event) {
        var halfUnit = baseHeight / 2,
            heightUnit = (event.getEnd().getMinutes() === 0) ? 0: event.getEnd().getMinutes()/15,
            calculatedHeight,
            totalNumberOfEventsWithSameStartTime = event.getTotalNumberOfEventsWithSameStartTime(),
            calculatedWidth;

        heightUnit = (heightUnit == 1)? halfUnit : (heightUnit == 2)? baseHeight: (heightUnit == 3) ? baseHeight + halfUnit : 0;
        calculatedHeight = (baseHeight * ((event.getEnd().getHours() - event.getStart().getHours()) * 2)) + heightUnit;
        calculatedHeight += "px";

        calculatedWidth = (90 / totalNumberOfEventsWithSameStartTime);
        if (totalNumberOfEventsWithSameStartTime === 1) {
            calculatedWidth = calculatedWidth + 8;
        }

        calculatedWidth = calculatedWidth + "%";

        var cssObj = new Object();
        cssObj.height = calculatedHeight;
        cssObj.width = calculatedWidth;
        cssObj.zIndex = event.getZIndex();
        cssObj.marginLeft =  event.indentWidth + "px";

        return cssObj;
    };
}
CalendarDayViewController.$inject = ['$scope', 'CalendarEventService','CalendarDayHoursService','$routeParams'];
