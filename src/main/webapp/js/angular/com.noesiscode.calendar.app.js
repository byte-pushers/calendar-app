/*global CalendarMonthViewController,CalendarDayViewController,console */
/**
 * Created with JetBrains WebStorm.
 * User: pouncilt
 * Date: 11/16/12
 * Time: 7:19 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('NoesisCodeCalendarApp', ['NoesisCodeCalendarApp.services', 'NoesisCodeCalendarApp.directives']).
    config(['$routeProvider', function ($routeProvider) {
        "use strict";
        /*$routeProvider.when('/processAuthenticateUserResponse', {templateUrl: 'partials/calendar-month-view.html', controller: CalendarMonthViewController, resolve: {"validSession": function(LoginService) { return LoginService.validateSession();}}});*/
        $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: LoginController});
        $routeProvider.when('/calendarMonthView/:selectedDate', {templateUrl: 'partials/calendar-month-view.html', controller: CalendarMonthViewController, resolve: {"validSession": function(LoginService) { return LoginService.validateSession();}}});
        $routeProvider.when('/calendarDayView/:selectedDate', {templateUrl: 'partials/calendar-day-view.html', controller: CalendarDayViewController, resolve: {"validSession": function(LoginService) { return LoginService.validateSession();}}});
        /*$routeProvider.otherwise({redirectTo: '/calendarMonthView/'});*/
    }]);