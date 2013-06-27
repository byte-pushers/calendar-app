/*global CalendarMonthViewController,CalendarDayViewController */
/**
 * Created with JetBrains WebStorm.
 * User: pouncilt
 * Date: 11/16/12
 * Time: 7:19 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('NoesisCodeCalendarApp', ['NoesisCodeCalendar', 'NoesisCodeCalendarService']).
    config(['$routeProvider', function ($routeProvider) {
        "use strict";
        //$routeProvider.when('/calendar', {templateUrl: 'partials/calendar.html', controller: CalendarMonthViewController});
        $routeProvider.when('/calendarMonthView/:selectedDate', {templateUrl: 'partials/calendar-month-view.html', controller: CalendarMonthViewController});
        $routeProvider.when('/calendarDayView/:selectedDate', {templateUrl: 'partials/calendar-day-view.html', controller: CalendarDayViewController});
        $routeProvider.otherwise({redirectTo: '/calendarMonthView/'});
    }]);


