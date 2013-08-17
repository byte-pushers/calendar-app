/*global CalendarMonthViewController,CalendarDayViewController,LoginController,console,document */
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
        $routeProvider.when('', {
            templateUrl: 'partials/calendar-month-view.html',
            controller: CalendarMonthViewController,
            resolve: {
                'validSession': function ($route, LoginService) {
                    return LoginService.validateSession();
                }
            }
        });
        $routeProvider.when('/', {
            templateUrl: 'partials/calendar-month-view.html',
            controller: CalendarMonthViewController,
            resolve: {
                'validSession': function ($route, LoginService) {
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
                'validSession': function ($route, LoginService) {
                    return LoginService.validateSession();
                }
            }
        });
        $routeProvider.when('/calendarDayView/:selectedDate', {
            templateUrl: 'partials/calendar-day-view.html',
            controller: CalendarDayViewController,
            resolve: {
                'validSession': function (LoginService) {
                    return LoginService.validateSession();
                }
            }
        });
        $routeProvider.otherwise({
            redirectTo: '/calendarMonthView/',
            resolve: {
                sessionStatus: function ($q, $route, $location) {
                    var deferred = $q.defer();

                    if (document.location.hash !== null && document.location.hash !== undefined) {
                        $location.hash(document.location.hash);
                    }
                    deferred.resolve("Session Starting.");
                    return deferred.promise;
                }
            }
        });
    }]);