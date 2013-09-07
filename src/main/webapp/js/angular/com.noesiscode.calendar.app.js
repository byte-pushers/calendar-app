/*global CalendarMonthViewController,CalendarDayViewController,LoginController,console,location */
/**
 * Created with JetBrains WebStorm.
 * User: pouncilt
 * Date: 11/16/12
 * Time: 7:19 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('NoesisCodeCalendarApp', ['ngRoute', 'NoesisCodeCalendarApp.services', 'NoesisCodeCalendarApp.directives']).
    config(function ($routeProvider) {
        "use strict";
        $routeProvider.when('', {
            templateUrl: 'partials/calendar-month-view.html',
            controller: CalendarMonthViewController,
            resolve: {
                'validSession': function ($route, $log, $location, LoginService) {
                    $log.info("route '' method: url: " + $location.absUrl());
                    return LoginService.validateSession();
                }
            }
        });
        $routeProvider.when('/', {
            templateUrl: 'partials/calendar-month-view.html',
            controller: CalendarMonthViewController,
            resolve: {
                'validSession': function ($route, $log, $location, LoginService) {
                    $log.info("route '/' method: url: " + $location.absUrl());
                    return LoginService.validateSession();
                }
            }
        });
        $routeProvider.when('/login', {
            templateUrl: 'partials/login.html',
            controller: LoginController
        });
        $routeProvider.when('/calendarMonthView/:selectedDate', {
            templateUrl: 'partials/calendar-month-view.html',
            controller: CalendarMonthViewController,
            resolve: {
                'validSession': function ($route, $log, $location, LoginService) {
                    $log.info("route '/calendarMonthView/' method: url: " + $location.absUrl());
                    return LoginService.validateSession();
                }
            }
        });
        $routeProvider.when('/calendarDayView/:selectedDate', {
            templateUrl: 'partials/calendar-day-view.html',
            controller: CalendarDayViewController,
            resolve: {
                'validSession': function ($route, $log, $location, LoginService) {
                    $log.info("route '/calendarDayView/' method: url: " + $location.absUrl());
                    return LoginService.validateSession();
                }
            }
        });
        $routeProvider.otherwise({
            redirectTo: '/calendarMonthView/',
            resolve: {
                sessionStatus: function ($q, $route, $log, $location) {
                    var deferred = $q.defer(), path = null, hash = null;
                    $log.info("route 'otherwise' method: url: " + $location.absUrl());
                    if (location.hash !== null && location.hash !== undefined) {
                        $location.hash(location.hash);
                        //location.hash = "";
                    }
                    deferred.resolve("Session Starting.");
                    return deferred.promise;
                }
            }
        });
    });