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
                $scope.calendar = new CalendarApp.models.Calendar();
                $scope.month = $scope.calendar.getCurrentMonth();
                //$scope.month = new CalendarApp.models.Month();
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
                $scope.selectDay = function (selectedDate) {
                    var previouslySelectedDate = new Date($scope.month.getSelectedDate().getTime()),
                        selectedDay = $scope.month.selectDayOfTheMonth(selectedDate);
                    $scope.todaysEvents = selectedDay.getEvents();
                    $scope.month.highLightSelectedDay(previouslySelectedDate);
                };
                $scope.selectNextDay = function () {
                    var previouslySelectedDate = new Date($scope.month.getSelectedDate().getTime()),
                        cachedWeeks = $scope.calendar.getCachedMonth().getWeeks(),
                        selectedDay = $scope.month.selectNextDay();

                    if (CalendarApp.MonthUtility.isDateNotInMonthView(selectedDay.getDate(), cachedWeeks)) {
                        $scope.weeks = $scope.month.getWeeks();
                        $scope.todaysEvents = selectedDay.getEvents();
                    }

                    $scope.month.highLightSelectedDay(previouslySelectedDate);
                };
                $scope.selectPreviousDay = function () {
                    var previouslySelectedDate = new Date($scope.month.getSelectedDate().getTime()),
                        previousDay = new Date(previouslySelectedDate.getTime()),
                        selectedDay = null;
                    previousDay.setDate(previousDay.getDate() - 1);
                    if (previouslySelectedDate.getMonth() !== previousDay.getMonth()) {
                        selectedDay = $scope.selectLastDayOfPreviousMonth();
                    } else {
                        selectedDay = $scope.month.selectPreviousDay();
                    }
                    $scope.todaysEvents = selectedDay.getEvents();
                    $scope.month.highLightSelectedDay(previouslySelectedDate);
                };
                $scope.selectFirstDayOfPreviousMonth = function () {
                    var selectedDay = $scope.month.selectFirstDayOfPreviousMonth();
                    $scope.todaysEvents = selectedDay.getEvents();
                    $scope.weeks = $scope.month.getWeeks();
                };
                $scope.selectFirstDayOfNextMonth = function () {
                    var selectedDay = $scope.month.selectFirstDayOfNextMonth();
                    $scope.todaysEvents = selectedDay.getEvents();
                    $scope.weeks = $scope.month.getWeeks();
                };
                $scope.selectLastDayOfPreviousMonth = function () {
                    var selectedDay = $scope.month.selectLastDayOfPreviousMonth();
                    $scope.todaysEvents = selectedDay.getEvents();
                    $scope.weeks = $scope.month.getWeeks();
                };
                $scope.selectDayOfTheMonth = function (day) {
                    var selectedDay = $scope.month.selectDayOfTheMonth(day);
                    $scope.todaysEvents = selectedDay.getEvents();
                    $scope.weeks = $scope.month.getWeeks();
                    return selectedDay;
                };
            },
            templateUrl: 'partials/calendar-month-view-template.html',
            compile: function (tElement, tAttrs, transclude) {
                return function (scope, element, attrs, controller) {

                };
            }
        };
    });