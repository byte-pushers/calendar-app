/**
 * Created with JetBrains WebStorm.
 * User: pouncilt
 * Date: 11/10/12
 * Time: 7:40 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('NoesisCodeCalendarService', ['ngResource']).
    factory('CalendarEventService', function ($resource) {
        "use strict";
        return $resource('data/events/:eventId.json', {}, {
            query: {method: 'GET', params: {eventId: 'events'}, isArray: true}
        });
    }).
    factory('CalendarDayHoursService', function ($resource) {
        "use strict";
        return $resource('data/:dayHoursId.json', {}, {
            query: {method: 'GET', params: {dayHoursId: 'dayHours'}, isArray: true}
        });
    });
