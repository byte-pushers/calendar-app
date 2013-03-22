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
            controller: function CalendarController($scope, CalendarEventService) {
                CalendarApp.getInstance().setCurrentMonth(new CalendarApp.models.Month());
                CalendarApp.getInstance().setCachedMonth(new CalendarApp.models.Month());
                $scope.month = CalendarApp.getInstance().getCurrentMonth();
                $scope.weeks = $scope.month.getWeeks();

                CalendarEventService.query(function (jsonEvents) {
                    $scope.events = CalendarApp.models.EventTransformer.transformJSONEvents(jsonEvents);
                    $scope.month.setEvents($scope.events);
                    $scope.todaysEvents = $scope.month.findEventsByDate(new Date());
                });

                $scope.getCalendarDayClass = function (day) {
                    var cssClass;
                    if (day.hasEvents() && day.isCurrentDayOfWeek()) {
                        cssClass = "calendar-day-selected-with-events calendar-date";
                    } else if (day.hasEvents()) {
                        cssClass = "calendar-day-with-events calendar-date";
                    } else if (day.isCurrentDayOfWeek()) {
                        cssClass = "calendar-day-selected calendar-date";
                    } else {
                        cssClass = "calendar-day-with-no-events calendar-date";
                    }
                    return cssClass;
                };
                $scope.selectDay = function (selectedDate, resetWeeks) {
                    var previouslySelectedDate = new Date($scope.month.getSelectedDate().getTime()),
                        resetWeeks = (resetWeeks !== undefined && resetWeeks !== null)? resetWeeks : false, //Todo: Check for type boolean.
                        selectedDay = $scope.month.selectDay(selectedDate, resetWeeks);

                    if (resetWeeks) $scope.weeks = $scope.month.getWeeks();
                    $scope.todaysEvents = selectedDay.getEvents();
                    $scope.month.highLightSelectedDay(previouslySelectedDate);
                };
                $scope.selectNextDay = function () {
                    var previouslySelectedDate = new Date($scope.month.getSelectedDate().getTime()),
                        cachedWeeks = CalendarApp.getInstance().getCachedMonth().getWeeks(),
                        selectedDay = $scope.month.selectNextDay();

                    if (CalendarApp.utils.MonthUtility.isDateNotInMonthView(selectedDay.getDate(), cachedWeeks)) {
                        $scope.weeks = $scope.month.getWeeks();
                        $scope.todaysEvents = selectedDay.getEvents();
                        CalendarApp.getInstance().setCachedMonth(new CalendarApp.models.Month(selectedDay.getDate()));
                    }

                    $scope.month.highLightSelectedDay(previouslySelectedDate);
                };
                $scope.selectPreviousDay = function () {
                    var previouslySelectedDate = new Date($scope.month.getSelectedDate().getTime()),
                        cachedWeeks = CalendarApp.getInstance().getCachedMonth().getWeeks(),
                        selectedDay = $scope.month.selectPreviousDay();

                    if (CalendarApp.utils.MonthUtility.isDateNotInMonthView(selectedDay.getDate(), cachedWeeks)) {
                        $scope.weeks = $scope.month.getWeeks();
                        $scope.todaysEvents = selectedDay.getEvents();
                        CalendarApp.getInstance().setCachedMonth(new CalendarApp.models.Month(selectedDay.getDate()));
                    }

                    $scope.month.highLightSelectedDay(previouslySelectedDate);
                };
                $scope.selectFirstDayOfPreviousMonth = function () {
                    $scope.selectDay($scope.month.getDateFor1stDayOfPreviousMonth(), true);
                };
                $scope.selectFirstDayOfNextMonth = function () {
                    $scope.selectDay($scope.month.getDateFor1stDayOfNextMonth(), true);
                };
                $scope.selectLastDayOfPreviousMonth = function () {
                    var selectedDay = $scope.month.selectLastDayOfPreviousMonth();
                    $scope.todaysEvents = selectedDay.getEvents();
                    $scope.weeks = $scope.month.getWeeks();
                };
            },
            templateUrl: 'partials/calendar-month-view-template.html',
            compile: function (tElement, tAttrs, transclude) {
                return function (scope, element, attrs, controller) {

                };
            }
        };
    });