/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 1/19/13
 * Time: 1:42 PM
 * To change this template use File | Settings | File Templates.
 */
/*global $, NoesisCode */
var CalendarApp = CalendarApp || {};
CalendarApp.models = CalendarApp.models || CalendarApp.namespace("com.noesiscode.calendar.models");
/**
 * Creates a {@link Month} object that represents the current calendar month.
 *
 * @class Represents a calendar month.
 * @returns An instance of the Week class.
 *
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
CalendarApp.models.Month = function () {
    "use strict";
    var that = this,
        /**
         * <p>Represents the selected date a user has selected.</p>
         * @private
         * @field
         * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
         */
        selectedDate = new Date(),
        /**
         * <p>Represents the name of the selected month a user has selected.
         * @private
         * @field
         * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
         */
        selectedMonthName,
        /**
         * <p>Represents the current date of the month.</p>
         * @private
         * @field
         * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
         */
        currentDate = new Date(),
        /**
         * <p>Represents the display name of the current day of the month.</p>
         * @private
         * @field
         * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
         */
        currentDateDisplayName,
        /**
         * <p>Represents all the events for the current month.</p>
         * @private
         * @field
         * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
         */
        events = [],
        /**
         * <p> Represents the total number of days that are in a week.</p>
         *
         * @constant
         * @type {String}
         * @default
         * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
         */
        TOTAL_WEEKDAYS = 7,
        /**
         * <p>Represents all the weeks in the Month.  This field is populated during object creation.</p>
         * @private
         * @field
         * @type {Calendar.models.Week[]}
         * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
         */
        weeks = [],
        /**
         * <p>Represents the name of the Month.  This field is populated during object creation.</p>
         * @private
         * @field
         * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
         */
        name = null;
    /**
     * <p>Gets the {@link Calendar.models.Week[]}s of the current month.</p>
     *
     * @returns {Calendar.models.Week[]} The weeks of the current month.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.getWeeks = function () {
        return weeks;
    };
    /**
     * <p>Binds the events that are scheduled for the month to the appropriate days for the current month.</p>
     *
     * @return {Void}
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.bindEvents = function () {
        var i, week;
        if (events.length > 0) {
            for (i = 0; i < weeks.length; i = i + 1) {
                if (weeks[i] !== undefined && weeks[i] !== null) {
                    week = weeks[i];
                    week.setEvents(events);
                }
            }
        }
    };
    /**
     * <p>Set the events that are scheduled for the month to the appropriate days.</p>
     *
     * @param {@link CalendarApp.models.Event} The events that are scheduled for the month.
     * @return {Void}
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.setEvents = function (newEvents) {
        events = newEvents;
        this.bindEvents();
    };
    /**
     * <p>Gets the events that are scheduled for the month.</p>
     *
     * @returns {CalendarApp.models.Event} The events that are scheduled for the month.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.getEvents = function () {
        return events;
    };
    /**
     * <p>Convenience method to find events on given date.</p>
     *
     * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} someDate Represents some arbitrary calendar date that is used as a search criteria.
     * @returns {CalendarApp.models.Event}s The events that are scheduled for the day.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.findEventsByDate = function (someDate) {
        var events = this.getEvents(), i, selectedEvents = [];
        for (i = 0; i < events.length; i = i + 1) {
            if (events[i] !== undefined && events[i] !== null) {
                if (events[i].getStart().isDateEqualTo(someDate)) {
                    selectedEvents[selectedEvents.length] = events[i];
                }
            }
        }
        return selectedEvents;
    };
    /**
     * <p>Convenience method to find events for today.</p>
     *
     * @returns {CalendarApp.models.Event}s The events that are scheduled for today.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.findEventsForToday = function () {
        var events = this.getEvents(), i, date = new Date();
        CalendarApp.todaysEvents = [];
        for (i = 0; i < events.length; i = i + 1) {
            if (events[i] !== undefined && events[i] !== null) {
                if (events[i].getStart().isDateEqualTo(date)) {
                    CalendarApp.todaysEvents[CalendarApp.todaysEvents.length] = events[i];
                }
            }
        }
        return CalendarApp.todaysEvents;
    };
    /**
     * <p>Convenience method to find an event by its identifier.</p>
     *
     * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_number.asp">Number</a>} id Represents an event identifier that is used as a search criteria.
     * @returns {CalendarApp.models.Event}s The event that is scheduled for the month.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.findEventById = function (id) {
        var events = this.getEvents(), i, targetEvent = null;
        for (i = 0; i < events.length; i = i + 1) {
            if (events[i] !== undefined && events[i] !== null) {
                if (events[i].id === id) {
                    targetEvent = events[i];
                }
            }
        }
        return targetEvent;
    };
    /**
     * <p>Gets the current day of the month.</p>
     *
     * @returns {CalendarApp.models.Day} The current day of the month.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.getCurrentDayOfTheMonth = function () {
        var i, week, currentDayOfMonth = null;
        for (i = 0; i < weeks.length; i = i + 1) {
            week = weeks[i];
            currentDayOfMonth = week.findCurrentDayOfWeek();
            if (currentDayOfMonth !== undefined && currentDayOfMonth !== null) {
                break;
            }
        }
        if (currentDayOfMonth === "undefined" || currentDayOfMonth === null) {
            throw new CalendarApp.exceptions.ExpectedToHaveCurrentDayOfMonthException("Expected to have a current day in the month.");
        }
        currentDate = currentDayOfMonth.getDate();
        return currentDayOfMonth;
    };
    /**
     * <p>Sets the current day of the month.</p>
     *
     * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} someDate Represents a some arbitrary calendar date to set the current day of the month.
     * @returns {CalendarApp.models.Day} The current day of the month.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.setCurrentDayOfTheMonth = function (someDate) {
        var i = 0, currentDayOfTheMonth = null;

        try {
            currentDayOfTheMonth = this.getCurrentDayOfTheMonth();
        } catch (e) {
            console.log(e.message);
        }

        if (currentDayOfTheMonth !== null) {
            if (currentDayOfTheMonth.getDate().getMonth() !== selectedDate.getMonth()) {
                setWeeksInMonth(someDate);
                currentDayOfTheMonth = this.getCurrentDayOfTheMonth();
            } else if (currentDayOfTheMonth.getDate().getDate() < selectedDate.getDate()) {
                setWeeksInMonth(someDate);
                currentDayOfTheMonth = this.getCurrentDayOfTheMonth();
            }
        }

        return currentDayOfTheMonth;
    };
    /**
     * <p>Convenience method that sets and selects the day of the month on the calendar based on the specified day.</p>
     *
     * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} someDate Represents a some arbitrary calendar date to set the current day of the month.
     * @returns {CalendarApp.models.Day} The day on the month on the calendar.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.selectDayOfTheMonth = function (someDate) {
        this.setSelectedDate(someDate);
        this.setSelectedMonthName();
        this.setSelectedDateDisplayName();
        return this.setCurrentDayOfTheMonth(this.getSelectedDate());
    };
    /**
     * <p>Convenience method to gets the name of the month for the selected date on the calendar.</p>
     *
     * @returns {String} The selected month name.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.getMonthNameOfSelectedDate = function () {
        return getMonthName(selectedDate.getMonth(), false);
    };
    /**
     * <p>Convenience method to get the selected date on the calendar.</p>
     *
     * @returns {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} The date that was selected for the month.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.getSelectedDate = function () {
        return selectedDate;
    };
    /**
     * <p>Convenience method to set the selected date on the calendar.</p>
     *
     * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} someDate Represents some arbitrary calendar date that is used to set the current date on the calendar.
     * @returns {Void}
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.setSelectedDate = function (someDate) {
        selectedDate.setTime(someDate.getTime());
    };
    /**
     * <p>Convenience method that gets the display name of the selected date on the calendar.</p>
     *
     * @returns {String} The display name of the selected date on the calendar.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.getSelectedDateDisplayName = function () {
        var month = getMonthName(selectedDate.getMonth(), false),
            year = selectedDate.getFullYear(),
            date = selectedDate.getDate(),
            day = CalendarApp.models.Month.weekdayNames[selectedDate.getDay()].name;
        return day + " " + month + " " + date + ", " + year;
    };
    /**
     * <p>Convenience method that sets the calendar's selected month name.</p>
     *
     * @return {Void}
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.setSelectedMonthName = function () {
        this.selectedMonthName = this.getMonthNameOfSelectedDate();
    };
    /**
     * <p>Convenience method that sets the display name of the calendar's selected date.</p>
     *
     * @return {Void}
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.setSelectedDateDisplayName = function () {
        this.selectedDateDisplayName = this.getSelectedDateDisplayName();
    };
    /**
     * <p>Convenience method that sets and selects a day on the calendar based on the selected date.</p>
     *
     * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} selectedDate Represents a selected date on the calendar.
     * @returns {CalendarApp.models.Day} The selected day on the calendar.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.selectDay = function (selectedDate) {
        this.setSelectedDate(selectedDate);
        this.setSelectedMonthName();
        this.setSelectedDateDisplayName();
        return this.setCurrentDayOfTheMonth(this.getSelectedDate());
    };
    /**
     * <p>Convenience method that selects the next day on the calendar.</p>
     *
     * @returns {CalendarApp.models.Day} The next {@link CalendarApp.models.Day} on the calendar.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.selectNextDay = function () {
        this.setSelectedDate(getNextDay());
        this.setSelectedMonthName();
        this.setSelectedDateDisplayName();
        return this.setCurrentDayOfTheMonth(this.getSelectedDate());
    };
    /**
     * <p>Convenience method that selects the previous day on the calendar.</p>
     *
     * @returns {CalendarApp.models.Day} The previous {@link CalendarApp.models.Day} on the calendar.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.selectPreviousDay = function () {
        this.setSelectedDate(getPreviousDay());
        this.setSelectedMonthName();
        this.setSelectedDateDisplayName();
        return this.setCurrentDayOfTheMonth(this.getSelectedDate());
    };
    /**
     * <p>Convenience method that selects the first day of the next month on the calendar.</p>
     *
     * @returns {CalendarApp.models.Day} The first {@link CalendarApp.models.Day} on the next month on the calendar.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.selectFirstDayOfNextMonth = function () {
        this.setSelectedDate(getNextMonth(1));
        this.setSelectedMonthName();
        this.setSelectedDateDisplayName();
        return this.setCurrentDayOfTheMonth(this.getSelectedDate());
    };
    /**
     * <p>Convenience method that selects the first day of the previous month on the calendar.</p>
     *
     * @returns {CalendarApp.models.Day} The first {@link CalendarApp.models.Day} on the previous month on the calendar.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.selectFirstDayOfPreviousMonth = function () {
        this.setSelectedDate(getPreviousMonth(1));
        this.setSelectedMonthName();
        this.setSelectedDateDisplayName();
        return this.setCurrentDayOfTheMonth(this.getSelectedDate());
    };
    /**
     * <p>Convenience method that selects the last day of the previous month on the calendar.</p>
     *
     * @returns {CalendarApp.models.Day} The last day on the previous month on the calendar.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.selectLastDayOfPreviousMonth = function () {
        this.setSelectedDate(getPreviousMonth(CalendarApp.models.Month.getPreviousMonthTotalDays(this.getSelectedDate())));
        this.setSelectedMonthName();
        this.setSelectedDateDisplayName();
        return this.setCurrentDayOfTheMonth(this.getSelectedDate());
    };
    /**
     * <p>Convenience method to high light the selected day on the calendar.</p>
     *
     * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} previousSelectedDate Represents the previously selected calendar date.
     * @return {Void}
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.highLightSelectedDay = function (previousSelectedDate) {
        var selector = "div#" + (new CalendarApp.models.Day(selectedDate)).getId();
        if (this.findEventsByDate(selectedDate).length < 1) {
            $(selector).removeClass("calendar-day-selected-with-events calendar-day-with-no-events calendar-day-with-events");
            $(selector).addClass("calendar-day-selected");
        } else {
            $(selector).removeClass("calendar-day-selected calendar-day-with-no-events calendar-day-with-events");
            $(selector).addClass("calendar-day-selected-with-events");
        }
        selector = "div#" + (new CalendarApp.models.Day(previousSelectedDate)).getId();
        if (this.findEventsByDate(previousSelectedDate).length < 1) {
            $(selector).removeClass("calendar-day-selected calendar-day-selected-with-events calendar-day-with-events");
            $(selector).addClass("calendar-day-with-no-events");
        } else {
            $(selector).removeClass("calendar-day-selected calendar-day-with-no-events calendar-day-selected-with-events");
            $(selector).addClass("calendar-day-with-events");
        }
    };
    /**
     * <p>Convenience method to determine the if the arbitrary date is in the last week of the month.</p>
     *
     * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} someDate Represents the previously selected calendar date.
     * @return {<a href="http://www.w3schools.com/jsref/jsref_obj_boolean.asp">Boolean</a>} True if the arbitrary date is in the last week of the month; otherwise return false.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.isLastWeekInMonth = function (someDate) {
        var targetWeek = findWeekInMonth(someDate);
        return targetWeek.lastWeekInMonth;
    };
    /**
     * <p>Gets month name.</p>
     * @private
     * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_number.asp">Number</a>} index Represents the position of the month in a month array.
     * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_boolean.asp">Boolean</a>} useAbbr An optional boolean flag that governs whether the
     * full name of the month is returned or its abbreviation.
     *
     * @returns {String} The name of the weekday.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    function getMonthName(index, getAbbr) {
        if (getAbbr) {
            return CalendarApp.models.Month.monthNames[index].abbr;
        } else {
            return CalendarApp.models.Month.monthNames[index].name;
        }
    }
    /**
     * <p>Gets remaining weekdays left in the {@link Week} before the <a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a> pass in.</p>
     * @private
     * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} date Represents some arbitrary calendar date.
     *
     * @returns {Array} An array of the remaining weekdays of the week before is the <a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a> passed in.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    function getRemainingWeekDaysBefore(date) {
        var weekdays = [], weekday = date.getDay() - 1, d = new Date(date.getTime());
        do {
            if (weekday > -1) {
                d.setDate(d.getDate() - 1);
                weekdays[weekday] = new CalendarApp.models.Day(new Date(d.getTime()), null, false);
                weekday = weekday - 1;
            }
        } while (weekday > -1);
        return weekdays;
    }
    /**
     * <p>Gets remaining weekdays left in the {@link Week} after the <a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a> pass in.</p>
     * @private
     * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} date Represents some arbitrary calendar date.
     *
     * @returns {Array} An array of the remaining weekdays of the week after the <a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a> passed in.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    function getRemainingWeekDaysAfter(date) {
        var weekdays = [], weekday = date.getDay() + 1, d = new Date(date.getTime());
        do {
            if (weekday < TOTAL_WEEKDAYS) {
                d.setDate(d.getDate() + 1);
                weekdays[weekday] = new CalendarApp.models.Day(new Date(d.getTime()), null, false);
                weekday = weekday + 1;
            }
        } while (weekday < TOTAL_WEEKDAYS);
        return weekdays;
    }
    /**
     * <p>Gets {@link Week} based on the <a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a> pass in.</p>
     * @private
     * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} date Represents some arbitrary calendar date.
     *
     * @returns {Week} An array of weekdays that represents an entire week that contains the <a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a> passed in.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    function getWeek(date) {
        var weekdays = [], weekDaysBeforeArray = getRemainingWeekDaysBefore(new Date(date.getTime())), weekDaysBeforeArrayIndex, weekDaysAfterArray = getRemainingWeekDaysAfter(new Date(date.getTime())), weekDaysAfterArrayIndex;
        for (weekDaysBeforeArrayIndex = 0; weekDaysBeforeArrayIndex < weekDaysBeforeArray.length; weekDaysBeforeArrayIndex = weekDaysBeforeArrayIndex + 1) {
            if (weekDaysBeforeArray[weekDaysBeforeArrayIndex] !== undefined) {
                weekdays[weekdays.length] = weekDaysBeforeArray[weekDaysBeforeArrayIndex];
            }
        }
        weekdays[weekdays.length] = new CalendarApp.models.Day(new Date(date.getTime()), null, true);
        for (weekDaysAfterArrayIndex = 0; weekDaysAfterArrayIndex < weekDaysAfterArray.length; weekDaysAfterArrayIndex = weekDaysAfterArrayIndex + 1) {
            if (weekDaysAfterArray[weekDaysAfterArrayIndex] !== undefined) {
                weekdays[weekdays.length] = weekDaysAfterArray[weekDaysAfterArrayIndex];
            }
        }
        return new CalendarApp.models.Week(weekdays);
    }
    /**
     * <p>Gets {@link Week} before the <a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a> pass in.</p>
     * @private
     * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} date Represents some arbitrary calendar date.
     *
     * @returns {Week} An array of weekdays that represents an entire week that is before the <a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a> passed in.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    function getWeekBefore(date) {
        var weekdays = [], totalDays = TOTAL_WEEKDAYS + date.getDay(), d = new Date(date.getTime()), weekday;
        do {
            d.setDate(d.getDate() - 1);
            if (totalDays <= TOTAL_WEEKDAYS) {
                weekday = totalDays - 1;
                weekdays[weekday] = new CalendarApp.models.Day(new Date(d));
            }
        } while ((totalDays = totalDays - 1) > 0);
        return new CalendarApp.models.Week(weekdays);
    }
    /**
     * <p>Gets {@link Week} after the <a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a> pass in.</p>
     * @private
     * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} date Represents some arbitrary calendar date.
     *
     * @returns {Week} An array of weekdays that represents an entire week that is after the <a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a> passed in up to and including the last day in the week.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    function getWeekAfter(date) {
        var weekdays = [], totalDays = (TOTAL_WEEKDAYS - 1 - date.getDay()) + TOTAL_WEEKDAYS, d = new Date(date.getTime()), weekday;
        do {
            d.setDate(d.getDate() + 1);
            if (totalDays <= TOTAL_WEEKDAYS) {
                weekday = TOTAL_WEEKDAYS - totalDays;
                weekdays[weekday] = new CalendarApp.models.Day(new Date(d));
            }
        } while ((totalDays = totalDays - 1) > 0);
        return new CalendarApp.models.Week(weekdays);
    }
    /**
     * <p>Retrieves the first week in the calendar month.
     * @private
     * @param {@link Week} Represents some arbitrary calendar week in a calendar month.
     *
     * @returns {Week} The first week in calendar month.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    function getFirstWeekInMonth(someWeekInMonth, month) {
        var firstWeekInMonth = null;
        do {
            if (someWeekInMonth.isFirstWeekInMonth(month)) {
                firstWeekInMonth = someWeekInMonth;
            } else {
                someWeekInMonth = getWeekBefore(someWeekInMonth.sunday.getDate());
            }
        } while (firstWeekInMonth === null);
        firstWeekInMonth.isFirstWeekInMonth = true;
        return firstWeekInMonth;
    }
    /**
     * <p>Retrieves all the weeks in a calendar month.
     * @private
     * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} Represents some arbitrary calendar Date in a calendar month.
     *
     * @returns {Week} The all the {@link Week}s in the calendar month.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    function getWeeksInMonth(date) {
        var weeksInMonth = [], firstWeekInMonth = getFirstWeekInMonth(getWeek(date), date.getMonth()),
            i = 0;
        weeksInMonth[0] = firstWeekInMonth;
        weeksInMonth[1] = getWeekAfter(weeksInMonth[0].saturday.getDate());
        weeksInMonth[2] = getWeekAfter(weeksInMonth[1].saturday.getDate());
        weeksInMonth[3] = getWeekAfter(weeksInMonth[2].saturday.getDate());
        if (weeksInMonth[3].isLastWeekInMonth()) {
            weeksInMonth[3].lastWeekInMonth = true;
        } else {
            weeksInMonth[4] = getWeekAfter(weeksInMonth[3].saturday.getDate());
            if (weeksInMonth[4].isLastWeekInMonth()) {
                weeksInMonth[4].lastWeekInMonth = true;
            } else {
                weeksInMonth[5] = getWeekAfter(weeksInMonth[4].saturday.getDate());
                if (weeksInMonth[5].isLastWeekInMonth()) {
                    weeksInMonth[5].lastWeekInMonth = true;
                } else {
                    weeksInMonth[6] = getWeekAfter(weeksInMonth[5].saturday.getDate());
                    weeksInMonth[6].lastWeekInMonth = true;
                }
            }
        }
        for (i; i < weeksInMonth.length; i = i + 1) {
            weeksInMonth[i].setCurrentDayOfWeek(date);
        }

        return weeksInMonth;
    }
    /**
     * <p>Convenience method that finds the week in the current month for the specified date</p>
     * <p>The specified date should be in the current month.</p>
     *
     * @private
     * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} someDate Represents an arbitrary calendar date.
     * @return {@link Week} Week of the current month.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    function findWeekInMonth(someDate) {
        var i, targetWeek = null;
        for (i = 0; i < weeks.length; i = i + 1) {
            if (weeks[i].isWeekOf(someDate)) {
                targetWeek = weeks[i];
                break;
            }
        }
        return targetWeek;
    }
    /**
     * <p>Convenience method that sets and returns the {@link Week}s of the current Month.
     * The specified date object is used to determine which month to use when returning the weeks
     * in the month.</p>
     *
     * @private
     * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} someDate Represents an arbitrary calendar date.
     * @return {@link Week} An array of weeks of the month.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    function setWeeksInMonth(date) {
        weeks = getWeeksInMonth(date);
        that.bindEvents();
        //that.setCurrentDayOfTheMonth(date);
        return weeks;
    }
    /**
     * <p>Convenience method that returns the next {@link Day} after the selected date on the calendar.</p>
     *
     * @private
     * @return {@link Day} The next day after the selected date.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    function getNextDay() {
        var nextDay = new Date(selectedDate.getTime());
        nextDay.setDate(nextDay.getDate() + 1);
        return nextDay;
    }
    /**
     * <p>Convenience method that returns the previous {@link Day} before the selected date on the calendar.</p>
     *
     * @private
     * @return {@link Day} The previous day before the selected date.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    function getPreviousDay() {
        var previousDay = new Date(selectedDate.getTime());
        previousDay.setDate(previousDay.getDate() - 1);
        return previousDay;
    }
    /**
     * <p>Convenience method that returns the next {@link Month} after the selected date on the calendar.</p>
     *
     * @private
     * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_number.asp">Number</a>} dayOfTheMonth Represents the day of the month.
     * @return {@link Day} The next month after the selected date.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    function getNextMonth(dayOfTheMonth) {
        var nextMonth = new Date(selectedDate.getTime());
        nextMonth.setMonth((nextMonth.getMonth() + 1), dayOfTheMonth);
        return nextMonth;
    }
    /**
     * <p>Convenience method that returns the previous {@link Month} before the selected date on the calendar.</p>
     *
     * @private
     * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_number.asp">Number</a>} dayOfTheMonth Represents the day of the month.
     * @return {@link Day} The previous month before the selected date.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    function getPreviousMonth(dayOfTheMonth) {
        var previousMonth = new Date(selectedDate.getTime());
        previousMonth.setMonth((previousMonth.getMonth() - 1), dayOfTheMonth);
        return previousMonth;
    }
    weeks = setWeeksInMonth(selectedDate);
    name = getMonthName((new Date()).getMonth(), false);
    selectedMonthName = this.getMonthNameOfSelectedDate();
    currentDateDisplayName = this.getSelectedDateDisplayName();
    this.setCurrentDayOfTheMonth(this.getSelectedDate());
};
/**
 * <p>Static field that is used to get calendar full name, abbreviated names, and total calendar days.</p>
 * @static
 * @field
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
CalendarApp.models.Month.getMonthIndex = function (abbr) {
    "use strict";
    var i;
    for (i = 0; i < CalendarApp.models.Month.monthNames.length; i = i + 1) {
        if (CalendarApp.models.Month.monthNames[i].abbr === abbr) {
            return i;
        }
    }
    return -1;
};
/**
 * <p>Static field that is used to get calendar total calendar days of the previous month.</p>
 * @static
 * @function
 * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} date Represents some arbitrary calendar date.
 * @return {@link <a href="http://www.w3schools.com/jsref/jsref_obj_number.asp">Number</a>} The total days in the previous month.
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
CalendarApp.models.Month.getPreviousMonthTotalDays = function (date) {
    "use strict";
    if (date.getMonth() === 0) {
        return CalendarApp.models.Month.monthNames[11].getTotalDays(date.getFullYear());
    } else {
        return CalendarApp.models.Month.monthNames[date.getMonth() - 1].getTotalDays(date.getFullYear());
    }
};
/**
 * <p>Static function that is used to get the total calendar days of the next month.</p>
 * @static
 * @function
 * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} date Represents some arbitrary calendar date.
 * @return {@link <a href="http://www.w3schools.com/jsref/jsref_obj_number.asp">Number</a>} The total days in the next month.
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
CalendarApp.models.Month.getNextMonthTotalDays = function (date) {
    "use strict";
    if (date.getMonth() === 11) {
        return CalendarApp.models.Month.monthNames[0].getTotalDays(date.getFullYear());
    } else {
        return CalendarApp.models.Month.monthNames[date.getMonth() + 1].getTotalDays(date.getFullYear());
    }
};
/**
 * <p>Static field for the list of month.</p>
 * @static
 * @field
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
CalendarApp.models.Month.monthNames = [
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
/**
 * <p>Static field for the list of weekdays.</p>
 * @static
 * @field
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
CalendarApp.models.Month.weekdayNames = [
    {"name": "Sunday", "abbr": "Sun."},
    {"name": "Monday", "abbr": "Mon."},
    {"name": "Tuesday", "abbr": "Tue."},
    {"name": "Wednesday", "abbr": "Wed."},
    {"name": "Thursday", "abbr": "Thu."},
    {"name": "Friday", "abbr": "Fri."},
    {"name": "Saturday", "abbr": "Sat."}
];