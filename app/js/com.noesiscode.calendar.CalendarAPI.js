/*global $, NoesisCode */
function CalendarApp () {
    var classProps = [], instance;   // cached instance

    function doNotFilterClassProperties(prop){
        var filters = ["getClassType", "getObjectType"], i, doFilter = true;
        if(prop !== undefined){
            for(i = 0; i < filters.length; i = i + 1){
                if(prop === filters[i]){
                    doFilter = false;
                    break;
                }
            }
        } else {
            doFilter = false;
        }

        return doFilter;
    }

    for(var prop in CalendarApp) {
        if (doNotFilterClassProperties(prop) === true) {
            classProps[classProps.length] = {name: prop, value: CalendarApp[prop]};
        }
    }
    // rewrite the constructor
    CalendarApp = function CalendarApp () {
        return instance;
    };
    // carry over prototype properties
    CalendarApp.prototype = this;
    for(i = 0; i < classProps.length; i = i + 1){
        CalendarApp[classProps[i].name] = classProps[i].value;
    }
    // the instance
    instance = new CalendarApp();
    // the rest of the constructor pointer
    instance.constructor = CalendarApp;

    instance.events = [];
    instance.cachedWeeks = [];
    /**
     * <p>Represents the current calendar month.</p>
     * @private
     * @field
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    instance.currentMonth;
    /**
     * <p>Represents a cached calendar month.
     * @private
     * @field
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    instance.cachedMonth;
    instance.setEvents = function (events) {
        this.events = events;
    };
    instance.getEvents = function () {
        return this.events;
    };
    instance.applyEvents = function () {
        if(this.currentMonth !== undefined && this.currentMonth !== null) {
            this.currentMonth.setEvents(this.events);
        }
    };
    instance.getTodaysEvents = function () {
        return this.findEventsByDate(new Date());
    };
    instance.findEventsByDate = function (someDate) {
        var i, selectedEvents = [];
        for (i = 0; i < this.events.length; i = i + 1) {
            if (this.events[i] !== undefined && this.events[i] !== null) {
                if (this.events[i].getStart().isDateEqualTo(someDate)) {
                    selectedEvents[selectedEvents.length] = this.events[i];
                }
            }
        }
        return selectedEvents;
    };
    instance.findEventById = function (id, someEvents) {
        'use strict';
        var i, targetEvent = null,
            events = (someEvents !== undefined && someEvents !== null) ? someEvents : this.events;
        for (i = 0; i < events.length; i = i + 1) {
            if (events[i] !== undefined && events[i] !== null) {
                if (events[i].getId() === parseInt(id)) {
                    targetEvent = events[i];
                }
            }
        }
        return targetEvent;
    };
    instance.rescheduleEvent = function (calendarEventId, targetDate) {
        var calendarEvent = CalendarApp.getInstance().findEventById(calendarEventId);
        calendarEvent.reschedule(targetDate);
        return this.events;
    };
    /**
     * <p>Gets the {@link Calendar.models.Month} object for the current month.</p>
     *
     * @returns {Calendar.models.Month} The {@link Calendar.models.Month} object for the current month.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    instance.getCurrentMonth = function () {
        return instance.currentMonth;
    };
    /**
     * <p>Sets the {@link Calendar.models.Month} object for the current month.</p>
     *
     * @param {Calendar.models.Month} Represents a new current {@link Calendar.models.Month} object.
     * @returns {Void}
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    instance.setCurrentMonth = function (cMonth) {
        instance.currentMonth = cMonth;
    };
    /**
     * <p>Gets the cached {@link Calendar.models.Month} object for the current calendar view.</p>
     *
     * @returns {Calendar.models.Month} The cached {@link Calendar.models.Month} object for the current calendar view.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    instance.getCachedMonth = function () {
        return instance.cachedMonth;
    };
    /**
     * <p>Sets the cached {@link Calendar.models.Month} object for the current calendar view.</p>
     *
     * @param {Calendar.models.Month} Represents a new cached {@link Calendar.models.Month} object.
     * @returns {Void}
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    instance.setCachedMonth = function (cMonth) {
        instance.cachedMonth = cMonth;
    };

    return instance;
};
CalendarApp.getInstance = function getInstance(){
    var instance;
    instance = new CalendarApp();
    return instance;
};
CalendarApp.namespace = function (ns_string) {
    'use strict';
    var parts = ns_string.split('.'), parent = CalendarApp, i;
    // strip redundant leading global
    if (parts[0] === "CalendarApp") {
        parts = parts.slice(1);
    }
    for (i = 0; i < parts.length; i += 1) {
        // create a property if it doesn't exist
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};
CalendarApp.views = CalendarApp.views || CalendarApp.namespace("com.noesiscode.calendar.views");
CalendarApp.models = CalendarApp.models || CalendarApp.namespace("com.noesiscode.calendar.models");
