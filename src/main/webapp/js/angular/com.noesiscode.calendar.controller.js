/*global CalendarApp*/
/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 12/19/12
 * Time: 12:02 AM
 * To change this template use File | Settings | File Templates.
 */
function CalendarController($scope, CalendarEventService) {
    "use strict";

    CalendarApp.getInstance().setCurrentMonth(new CalendarApp.models.Month());
    CalendarApp.getInstance().setCachedMonth(new CalendarApp.models.Month());
    $scope.month = CalendarApp.getInstance().getCurrentMonth();
    $scope.weeks = $scope.month.getWeeks();
    $scope.todaysEvents = [];
    CalendarEventService.query(function (jsonEvents) {
        CalendarApp.getInstance().setEvents(CalendarApp.models.EventTransformer.transformJSONEvents(jsonEvents));
        CalendarApp.getInstance().applyEvents();
        $scope.todaysEvents = CalendarApp.getInstance().getTodaysEvents();
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