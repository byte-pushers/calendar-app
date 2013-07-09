/*global NoesisCode, console*/
/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 12/23/12
 * Time: 2:02 PM
 * To change this template use File | Settings | File Templates.
 */
var CalendarApp = CalendarApp || {};
CalendarApp.models = CalendarApp.models || CalendarApp.namespace("com.noesiscode.calendar.models");
CalendarApp.models.EventTransformer = CalendarApp.namespace("com.noesiscode.calendar.models.EventTransformer");
CalendarApp.models.EventTransformer.transformJSONEvents = function (jsonEvents) {
    'use strict';
    var events = [];
    if ((jsonEvents === undefined) || (jsonEvents === null) || (!jsonEvents.isArray())) {
        throw new NoesisCode.exceptions.InvalidParameterException("jsonEvents must be of type Array.");
    }
    jsonEvents.forEach(function (event, index) {
        if (event !== undefined && event !== null) {
            event = new CalendarApp.models.Event(event);
            events[events.length] = event;
        }
    });
    return events;
};