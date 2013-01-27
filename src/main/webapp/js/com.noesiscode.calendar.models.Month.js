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
    var that = this, selectedDate = new Date();
    this.TOTAL_WEEKDAYS = 7;
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
     * @returns {@link Array} An array of the remaining weekdays of the week before is the <a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a> passed in.
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
     * @returns {@link Array} An array of the remaining weekdays of the week after the <a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a> passed in.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    function getRemainingWeekDaysAfter(date) {
        var weekdays = [], weekday = date.getDay() + 1, d = new Date(date.getTime());
        do {
            if (weekday < that.TOTAL_WEEKDAYS) {
                d.setDate(d.getDate() + 1);
                weekdays[weekday] = new CalendarApp.models.Day(new Date(d.getTime()), null, false);
                weekday = weekday + 1;
            }
        } while (weekday < that.TOTAL_WEEKDAYS);
        return weekdays;
    }

    /**
     * <p>Gets {@link Week} based on the <a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a> pass in.</p>
     * @private
     * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} date Represents some arbitrary calendar date.
     *
     * @returns {@link Week} An array of weekdays that represents an entire week that contains the <a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a> passed in.
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
     * @returns {@link Week} An array of weekdays that represents an entire week that is before the <a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a> passed in.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    function getWeekBefore(date) {
        var weekdays = [], totalDays = that.TOTAL_WEEKDAYS + date.getDay(), d = new Date(date.getTime()), weekday;
        do {
            d.setDate(d.getDate() - 1);
            if (totalDays <= that.TOTAL_WEEKDAYS) {
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
     * @returns {@link Week} An array of weekdays that represents an entire week that is after the <a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a> passed in up to and including the last day in the week.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    function getWeekAfter(date) {
        var weekdays = [], totalDays = (that.TOTAL_WEEKDAYS - 1 - date.getDay()) + that.TOTAL_WEEKDAYS, d = new Date(date.getTime()), weekday;
        do {
            d.setDate(d.getDate() + 1);
            if (totalDays <= that.TOTAL_WEEKDAYS) {
                weekday = that.TOTAL_WEEKDAYS - totalDays;
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
     * @returns {@link Week} The first week in calendar month.
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
        return firstWeekInMonth;
    }

    /**
     * <p>Retrieves all the weeks in a calendar month.
     * @private
     * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} Represents some arbitrary calendar Date in a calendar month.
     *
     * @returns {@link Week} The all the {@link Week}s in the calendar month.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    function getWeeksInMonth(date) {
        var weeksInMonth = [], firstWeekInMonth = getFirstWeekInMonth(getWeek(date), date.getMonth());
        weeksInMonth[0] = firstWeekInMonth;
        weeksInMonth[1] = getWeekAfter(weeksInMonth[0].saturday.getDate());
        weeksInMonth[2] = getWeekAfter(weeksInMonth[1].saturday.getDate());
        weeksInMonth[3] = getWeekAfter(weeksInMonth[2].saturday.getDate());
        if (!weeksInMonth[3].isLastWeekInMonth()) {
            weeksInMonth[4] = getWeekAfter(weeksInMonth[3].saturday.getDate());
            if (!weeksInMonth[4].isLastWeekInMonth()) {
                weeksInMonth[5] = getWeekAfter(weeksInMonth[4].saturday.getDate());
                if (!weeksInMonth[5].isLastWeekInMonth()) {
                    weeksInMonth[6] = getWeekAfter(weeksInMonth[5].saturday.getDate());
                }
            }
        }
        return weeksInMonth;
    }

    function setWeeksInMonth(date) {
        that.weeks = getWeeksInMonth(date);
        that.setCurrentDayOfMonth(date);
        that.bindEvents();
    }
    function getNextDate() {
        selectedDate.setDate(selectedDate.getDate() + 1);
        return selectedDate;
    }
    function getPreviousDate() {
        selectedDate.setDate(selectedDate.getDate() - 1);
        return selectedDate;
    }
    function getNextMonthDate(dayOfMonth) {
        selectedDate.setMonth((selectedDate.getMonth() + 1), dayOfMonth);
        return selectedDate;
    }
    function getPreviousMonthDate(dayOfMonth) {
        selectedDate.setMonth((selectedDate.getMonth() - 1), dayOfMonth);
        return selectedDate;
    }
    /**
     * <p>Represents all the weeks in the Month.  This field is populated during object creation.</p>
     * @field
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.weeks = getWeeksInMonth(selectedDate);
    /**
     * <p>Represents the name of the Month.  This field is populated during object creation.</p>
     * @field
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.name = getMonthName((new Date()).getMonth(), false);
    this.selectedMonthEvents = [];
    this.bindEvents = function () {
        var i, week;
        if (this.selectedMonthEvents.length > 0) {
            for (i = 0; i < this.weeks.length; i = i + 1) {
                if (this.weeks[i] !== undefined && this.weeks[i] !== null) {
                    week = this.weeks[i];
                    week.setEvents(this.selectedMonthEvents);
                }
            }
        }
    };
    /**
     * <p>Set the events that are scheduled for the month to the appropriate days.</p>
     *
     * @param {@link CalendarApp.models.Event} The events that are scheduled for the month.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.setEvents = function (events) {
        this.selectedMonthEvents = events;
        this.bindEvents();
    };
    /**
     * <p>Gets the events that are scheduled for the month.</p>
     *
     * @returns {@link CalendarApp.models.Event} The events that are scheduled for the month.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.getEvents = function () {
        return this.selectedMonthEvents;
    };
    /**
     * <p>Convenience method to find events on given date.</p>
     *
     * @returns {@link CalendarApp.models.Event}s The events that are scheduled for the day.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.findEventsByDate = function (date) {
        var events = this.getEvents(), i;
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
    this.getSelectedMonthName = function () {
        return getMonthName(selectedDate.getMonth(), false);
    };
    this.getSelectedDate = function () {
        return selectedDate;
    };
    this.setSelectedDate = function (date) {
        selectedDate.setTime(date.getTime());
    };
    this.getSelectedDateDisplayName = function () {
        var month = getMonthName(selectedDate.getMonth(), false),
            year = selectedDate.getFullYear(),
            date = selectedDate.getDate(),
            day = CalendarApp.models.Month.monthNames[selectedDate.getDay()].name;
        return day + " " + month + " " + date + ", " + year;
    };
    this.setSelectedMonthName = function () {
        this.selectedMonthName = this.getSelectedMonthName();
    };
    this.setSelectedDateDisplayName = function () {
        this.selectedDateDisplayName = this.getSelectedDateDisplayName();
    };
    this.selectDay = function (selectedDate) {
        this.setSelectedDate(selectedDate);
        setWeeksInMonth(this.getSelectedDate());
        this.setSelectedMonthName();
        this.setSelectedDateDisplayName();
        return this.getCurrentDayOfMonth(this.getSelectedDate());
    };
    this.selectNextDay = function () {
        setWeeksInMonth(getNextDate());
        this.setSelectedMonthName();
        this.setSelectedDateDisplayName();
        return this.getCurrentDayOfMonth(this.getSelectedDate());
    };
    this.selectPreviousDay = function () {
        setWeeksInMonth(getPreviousDate());
        this.setSelectedMonthName();
        this.setSelectedDateDisplayName();
        return this.getCurrentDayOfMonth(this.getSelectedDate());
    };
    this.selectFirstDayOfNextMonth = function () {
        setWeeksInMonth(getNextMonthDate(1));
        this.setSelectedMonthName();
        this.setSelectedDateDisplayName();
        return this.getCurrentDayOfMonth(this.getSelectedDate());
    };
    this.selectFirstDayOfPreviousMonth = function () {
        setWeeksInMonth(getPreviousMonthDate(1));
        this.setSelectedMonthName();
        this.setSelectedDateDisplayName();
        return this.getCurrentDayOfMonth(this.getSelectedDate());
    };
    this.selectLastDayOfPreviousMonth = function () {
        setWeeksInMonth(getPreviousMonthDate(CalendarApp.models.Month.getPreviousMonthTotalDays(this.getSelectedDate())));
        this.setSelectedMonthName();
        this.setSelectedDateDisplayName();
        return this.getCurrentDayOfMonth(this.getSelectedDate());
    };
    this.highLightSelectedDay = function (previouslySelectedDate) {
        var selector = "div#" + (new CalendarApp.models.Day(selectedDate)).getId();
        if (this.findEventsByDate(selectedDate).length < 1) {
            $(selector).removeClass("calendar-day-selected-with-events calendar-day-with-no-events calendar-day-with-events");
            $(selector).addClass("calendar-day-selected");
        } else {
            $(selector).removeClass("calendar-day-selected calendar-day-with-no-events calendar-day-with-events");
            $(selector).addClass("calendar-day-selected-with-events");
        }
        selector = "div#" + (new CalendarApp.models.Day(previouslySelectedDate)).getId();
        if (this.findEventsByDate(previouslySelectedDate).length < 1) {
            $(selector).removeClass("calendar-day-selected calendar-day-selected-with-events calendar-day-with-events");
            $(selector).addClass("calendar-day-with-no-events");
        } else {
            $(selector).removeClass("calendar-day-selected calendar-day-with-no-events calendar-day-selected-with-events");
            $(selector).addClass("calendar-day-with-events");
        }
    };
    this.setCurrentDayOfMonth = function (selectedDateOfWeek) {
        var i, week;
        for (i = 0; i < this.weeks.length; i = i + 1) {
            week = this.weeks[i];
            if (week.setCurrentDayOfWeek(selectedDateOfWeek)) {
                break;
            }
        }
    };
    this.getCurrentDayOfMonth = function () {
        var i, week, currentDayOfMonth = null;
        for (i = 0; i < this.weeks.length; i = i + 1) {
            week = this.weeks[i];
            currentDayOfMonth = week.findCurrentDayOfWeek();
            if (currentDayOfMonth !== undefined && currentDayOfMonth !== null) {
                break;
            }
        }
        if (currentDayOfMonth === "undefined" || currentDayOfMonth === null) {
            throw new CalendarApp.exceptions.ExpectedToHaveCurrentDayOfMonthException("Expected to have a current day in the month.");
        }
        return currentDayOfMonth;
    };
    this.selectedMonthName = this.getSelectedMonthName();
    this.selectedDateDisplayName = this.getSelectedDateDisplayName();
    this.setCurrentDayOfMonth(this.getSelectedDate());
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
CalendarApp.models.Month.weekdayNames = [
    {"name": "Sunday", "abbr": "Sun."},
    {"name": "Monday", "abbr": "Mon."},
    {"name": "Tuesday", "abbr": "Tue."},
    {"name": "Wednesday", "abbr": "Wed."},
    {"name": "Thursday", "abbr": "Thu."},
    {"name": "Friday", "abbr": "Fri."},
    {"name": "Saturday", "abbr": "Sat."}
];