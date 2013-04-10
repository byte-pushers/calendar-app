/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 1/19/13
 * Time: 1:22 PM
 * To change this template use File | Settings | File Templates.
 */
var CalendarApp = CalendarApp || {};
CalendarApp.models = CalendarApp.models || CalendarApp.namespace("com.noesiscode.calendar.models");
/**
 * Creates a {@link Week} object that represents a calendar week in a calendar month.
 *
 * @class Represents a {@link Week} of the {@link Month}.
 * @param weekdays An array of weekdays that represents a calendar week.
 *
 * @returns An instance of the Week class based on the weekdays passed in.
 *
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
CalendarApp.models.Week = function (weekdays) {
    "use strict";
    var that = this;
    this.weekdays = (weekdays === undefined || weekdays === null || !Array.isArray(weekdays)) ? [] : weekdays;
    this.sunday = (this.weekdays.length >= 1) ? this.weekdays[0] : null;
    this.monday = (this.weekdays.length >= 2) ? this.weekdays[1] : null;
    this.tuesday = (this.weekdays.length >= 3) ? this.weekdays[2] : null;
    this.wednesday = (this.weekdays.length >= 4) ? this.weekdays[3] : null;
    this.thursday = (this.weekdays.length >= 5) ? this.weekdays[4] : null;
    this.friday = (this.weekdays.length >= 6) ? this.weekdays[5] : null;
    this.saturday = (this.weekdays.length >= 7) ? this.weekdays[6] : null;
    this.lastWeekInMonth = false;
    this.firstWeekInMonth = false;
    /**
     * Determines if this instance of {@link Week} is the first week in the calendar month.
     *
     * @returns {Boolean} true if this instance of {@link Week} is the first week of the calendar month.
     * Otherwise, it will return false.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.isFirstWeekInMonth = function (month) {
        var firstWeekInMonth = false;
        this.weekdays.forEach(function (week, index) {
            if (week !== undefined) {
                if (week.getWeekDate() === 1 && week.getDate().getMonth() === month) {
                    firstWeekInMonth = true;
                }
            }
        });
        return firstWeekInMonth;
    };
    /**
     * Determines if this instance of {@link Week} is the last week in the calendar month.
     *
     * @returns {Boolean} true if this instance of {@link Week} is the last week of the calendar month.
     * Otherwise, it will return false.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.isLastWeekInMonth = function () {
        var monthIndex, year, weekdate, totalDaysInMonth, lastWeekInMonth = false;
        this.weekdays.forEach(function (weekday, index) {
            monthIndex = weekday.getDate().getMonth();
            year = weekday.getDate().getFullYear();
            weekdate = weekday.getWeekDate();
            totalDaysInMonth = CalendarApp.models.Week.monthNames[monthIndex].getTotalDays(year);
            if (weekdate === totalDaysInMonth) {
                lastWeekInMonth = true;
            }
        });
        return lastWeekInMonth;
    };
    /**
     * <p>Clear the events that are scheduled for the week.</p>
     *
     * @param {@link CalendarApp.models.Event} The events that are scheduled for the week.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.clearEvents = function () {
        this.weekdays.forEach(function (weekday, index) {
            if (weekday !== undefined) {
                weekday.clearEvents();
            }
        });
    };
    /**
     * <p>Set the events that are scheduled for the week to the appropriate days.</p>
     *
     * @param {@link CalendarApp.models.Event} The events that are scheduled for the week.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.setEvents = function (events) {//TODO: Need to rename to addEvents because the current logic does not reset events.
        this.weekdays.forEach(function (weekday, index) {
            if (weekday !== undefined) {
                weekday.setEvents(events);
            }
        });
    };
    /**
     * <p>Get the events that are scheduled for the week from the appropriate days.</p>
     *
     * @returns {@link CalendarApp.models.Event}s The events that are scheduled for the week.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.getEvents = function () {
        var events = [];
        this.weekdays.forEach(function (weekday, index) {
            if (weekday !== undefined && weekday !== null) {
                events = events.concat(weekday.getEvents());
            }
        });
        return events;
    };
    this.setCurrentDayOfWeek = function (selectedDateOfWeek) {
        var currentDayOfWeek = null;
        this.weekdays.forEach(function (weeday, index) {
            if (weeday !== undefined && weeday !== null) {
                if (weeday.getDate().toString() === selectedDateOfWeek.toString()) {
                    weeday.setCurrentDayOfWeek(true);
                    currentDayOfWeek = weeday;
                } else {
                    weeday.setCurrentDayOfWeek(false);
                }
            }
        });
        return currentDayOfWeek;
    };
    this.findCurrentDayOfWeek = function () {
        var loopCount = 0, weekdaysLength = this.weekdays.length, currentDayOfWeek = null;
        this.weekdays.every(function (weeday) {
            if (loopCount <= weekdaysLength) {
                return true;
            }

            if (weeday !== undefined && weeday !== null) {
                if (weeday.isCurrentDayOfWeek()) {
                    currentDayOfWeek = weeday;
                    return true;
                }
            }

            loopCount = loopCount + 1;
            return false;
        });
        return currentDayOfWeek;
    };
    this.isWeekOf = function (date) {
        return this.weekdays.every(function (weeday) {
            if (weeday !== undefined && weeday !== null) {
                if (weeday.getDate().getFullYear() === date.getFullYear()) {
                    if (weeday.getDate().getMonth() === date.getMonth()) {
                        if (weeday.getDate().getDate() === date.getDate()) {
                            return true;
                        }
                    }

                }
            }
            return false;
        });
    };
};
/**
 * <p>Static field that is used to get calendar full name, abbreviated names, and total calendar days.</p>
 * @static
 * @field
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
CalendarApp.models.Week.monthNames = [
    {"name": "January", "abbr": "Jan", "getTotalDays": function (year) { "use strict"; return 31; } },
    {"name": "February", "abbr": "Feb", "getTotalDays": function (year) { "use strict"; if (year) { return (year % 4 === 0) ? 29 : 28; } else { throw ("Expected parameter(Year) is not defined."); } } },
    {"name": "March", "abbr": "Mar", "getTotalDays": function (year) { "use strict"; return 31; }},
    {"name": "April", "abbr": "Apr", "getTotalDays": function (year) { "use strict"; return 30; }},
    {"name": "May", "abbr": "May", "getTotalDays": function (year) { "use strict"; return 31; }},
    {"name": "June", "abbr": "Jun", "getTotalDays": function (year) { "use strict"; return 30; }},
    {"name": "July", "abbr": "Jul", "getTotalDays": function (year) { "use strict"; return 31; }},
    {"name": "August", "abbr": "Aug", "getTotalDays": function (year) { "use strict"; return 31; }},
    {"name": "September", "abbr": "Sep", "getTotalDays": function (year) { "use strict"; return 30; }},
    {"name": "October", "abbr": "Oct", "getTotalDays": function (year) { "use strict"; return 31; }},
    {"name": "November", "abbr": "Nov", "getTotalDays": function (year) { "use strict"; return 30; }},
    {"name": "December", "abbr": "Dec", "getTotalDays": function (year) { "use strict"; return 31; }}
];