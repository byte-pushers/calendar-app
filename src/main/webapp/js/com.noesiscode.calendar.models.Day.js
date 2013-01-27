/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 1/19/13
 * Time: 12:54 PM
 * To change this template use File | Settings | File Templates.
 */
/*global NoesisCode */
var CalendarApp = CalendarApp || {};
CalendarApp.models = CalendarApp.models || CalendarApp.namespace("com.noesiscode.calendar.models");
/**
 * Creates a Day object that represents the day of the {@link Week}.
 *
 * @class Represents a Day of the week or month.
 * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} date The date of the day.
 * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_number.asp">Number</a>} weekIndex The week index of the month for this day.
 * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_boolean.asp">Boolean</a>} currentDayOfWeek Specifies whether this is the current day of the week.
 *
 * @returns An instance of the Day class.
 *
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
CalendarApp.models.Day = function (date, weekIndex, currentDayOfWeek) {
    "use strict";
    this.date = date;
    this.weekIndex = (weekIndex === "undefined" || weekIndex === null) ? -1 : weekIndex;
    this.currentDayOfWeek = (currentDayOfWeek === "undefined" || currentDayOfWeek === null) ? false : currentDayOfWeek;
    this.weekdayNames = [
        {"name": "Sunday", "abbr": "Sun."},
        {"name": "Monday", "abbr": "Mon."},
        {"name": "Tuesday", "abbr": "Tue."},
        {"name": "Wednesday", "abbr": "Wed."},
        {"name": "Thursday", "abbr": "Thu."},
        {"name": "Friday", "abbr": "Fri."},
        {"name": "Saturday", "abbr": "Sat."}
    ];
    this.events = [];
    this.lastWeekInMonth = false;
    /**
     * <p>Gets the weekday name.</p>
     * <p>This method could return for example: Sunday,
     * Sun., Monday, Mon., Tuesday, Tue., Wednesday, Wed., Thursday, Thu.,
     * Friday, Fri., Saturday, or Sat.</p>
     *
     * @param {Boolean} abbr An optional abbreviation flag the returns the abbreviated version
     * of the weekday name when set to true.
     *
     * @returns {String} The name of the weekday.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.getWeekDay = function (abbr) {
        return (abbr !== undefined && abbr === true) ?
                this.weekdayNames[this.date.getDay()].abbr :
                this.weekdayNames[this.date.getDay()].name;
    };
    /**
     * <p>Gets the date for a specific day of the month.</p>
     *
     * @returns {Date} The date for a specific day of the month.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.getWeekDate = function () {
        return this.date.getDate();
    };
    /**
     * <p>Gets the actual <a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a> Object for the weekday.</p>
     *
     * @returns {String} The name of the weekday.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.getDate = function () {
        return this.date;
    };
    this.toString = function () {
        return "Day[weekday: " + this.weekday + ", day: " + this.day + ", weekIndex: " + this.weekIndex + "]";
    };
    /**
     * <p>Set the events that are scheduled for the appropriate days.</p>
     *
     * @param {@link CalendarApp.models.Event} The events that are scheduled for the day.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.setEvents = function (events) {
        var i, eventStartEndTime;
        for (i = 0; i < events.length; i = i + 1) {
            if (events[i] !== undefined && events[i] !== null) {
                eventStartEndTime = new CalendarApp.models.DateRange(events[i].getStart(), events[i].getEnd());
                if (eventStartEndTime.isBetweenRange(this.date)) {
                    this.events[this.events.length] = events[i];
                }
            }
        }
    };
    /**
     * <p>Get the events that are scheduled for the week from the appropriate days.</p>
     *
     * @returns {@link CalendarApp.models.Event}s The events that are scheduled for the week.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.getEvents = function () {
        return this.events;
    };
    /**
     * <p>Determines if there are events that are scheduled for the day.</p>
     *
     * @returns {@link Boolean} An indication if the day has scheduled events.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.hasEvents = function () {
        return (this.events.length > 0) ? true : false;
    };
    this.setCurrentDayOfWeek = function (currentDayOfWeek) {
        this.currentDayOfWeek = currentDayOfWeek;
    };
    /**
     * <p>Determines if the following day is the current day of the week.</p>
     *
     * @returns {@link Boolean} An indication if the day has scheduled events.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.isCurrentDayOfWeek = function () {
        return this.currentDayOfWeek;
    };
    /**
     * <p>Get the unique id for the day.  The unique Id is made up of the abbreviated month and the date.</p>
     *
     * @returns {@link String} An Id for the day.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.getId = function () {
        var day = this.getWeekDate();
        if (NoesisCode.NumberUtility.isSingleDigit(day)) {
            day = NoesisCode.NumberUtility.padLeft(day, 2);
        }
        return CalendarApp.models.Day.monthNames[this.getDate().getMonth()].abbr + day + this.getDate().getFullYear();
    };
    this.setLastWeekInMonth = function (lastWeekInMonth) {
        this.lastWeekInMonth = lastWeekInMonth;
    };
    this.isLastWeekInMonth = function () {
        return this.lastWeekInMonth;
    };
};
CalendarApp.models.Day.monthNames = [
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