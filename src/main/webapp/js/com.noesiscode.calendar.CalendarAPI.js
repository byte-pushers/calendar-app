var CalendarApp = CalendarApp || {};
CalendarApp.todaysEvents = [];
CalendarApp.models = CalendarApp.namespace("com.noesiscode.calendar.models");
CalendarApp.models.findEventById = function (id, events) {
    'use strict';
    var i, targetEvent = null;
    for (i = 0; i < events.length; i = i + 1) {
        if (events[i] !== undefined && events[i] !== null) {
            if (events[i].id === id) {
                targetEvent = events[i];
            }
        }
    }
    return targetEvent;
};



