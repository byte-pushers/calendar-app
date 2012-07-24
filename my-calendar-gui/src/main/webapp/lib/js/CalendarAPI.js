/*global InvalidParameterException, DateRange, $, ExpectedToHaveCurrentDayOfMonthException*/
var monthNames = [{"name": "January", "abbr": "Jan", "getTotalDays": function (year) { "use strict"; return 31; } },
                  {"name": "February", "abbr": "Feb", "getTotalDays": function (year) { "use strict"; if (year) { return (year % 4 === 0) ? 29 : 28; } else { throw ("Expected parameter(Year) is not defined."); } } },
                  {"name": "March", "abbr": "Mar", "getTotalDays": function (year) { "use strict"; return 31; }},
                  {"name": "April", "abbr": "Apr", "getTotalDays": function (year) { "use strict"; return 30; }},
                  {"name": "May", "abbr": "May", "getTotalDays": function (year) { "use strict"; return 31; }},
                  {"name": "June", "abbr": "Jun", "getTotalDays": function (year) { "use strict"; return 30; }},
                  {"name": "July", "abbr": "Jul", "getTotalDays": function (year) { "use strict"; return 31; }},
                  {"name": "August", "abbr": "Aug", "getTotalDays": function (year) { "use strict"; return 31; }},
                  {"name": "September", "abbr": "Sept", "getTotalDays": function (year) { "use strict"; return 30; }},
                  {"name": "October", "abbr": "Oct", "getTotalDays": function (year) { "use strict"; return 31; }},
                  {"name": "November", "abbr": "Nov", "getTotalDays": function (year) { "use strict"; return 30; }},
                  {"name": "December", "abbr": "Dec", "getTotalDays": function (year) { "use strict"; return 31; }}];
var weekdayNames = [{"name": "Sunday", "abbr": "Sun."},
                     {"name": "Monday", "abbr": "Mon."},
                     {"name": "Tuesday", "abbr": "Tue."},
                     {"name": "Wednesday", "abbr": "Wed."},
                     {"name": "Thursday", "abbr": "Thu."},
                     {"name": "Friday", "abbr": "Fri."},
                     {"name": "Saturday", "abbr": "Sat."}];

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
function Day(date, weekIndex, currentDayOfWeek) {
	"use strict";
	this.date = date;
	this.weekIndex = (weekIndex === undefined || weekIndex === null) ? -1 : weekIndex;
	this.currentDayOfWeek = (currentDayOfWeek === undefined || currentDayOfWeek === null) ? false : currentDayOfWeek;
	this.weekdayNames = [{"name": "Sunday", "abbr": "Sun."},
	                     {"name": "Monday", "abbr": "Mon."},
	                     {"name": "Tuesday", "abbr": "Tue."},
	                     {"name": "Wednesday", "abbr": "Wed."},
	                     {"name": "Thursday", "abbr": "Thu."},
	                     {"name": "Friday", "abbr": "Fri."},
	                     {"name": "Saturday", "abbr": "Sat."}];
	this.events = [];
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
	/*this.toString = function(){
		alert("Day[weekday: " + this.weekday +", day: " + this.day + ", weekIndex: " + this.weekIndex + "]");
	};*/
	/**
	 * <p>Set the events that are scheduled for the appropriate days.</p>
	 * 
	 * @param {@link Event} The events that are scheduled for the day.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	 */
	this.setEvents = function (events) {
		var i, eventStartEndTime, endTime;
		for (i = 0; i < events.length; i = i + 1) {
			if (events[i] !== undefined && events[i] !== null) {
				eventStartEndTime = new DateRange(events[i].getStart(), events[i].getEnd());
				if (eventStartEndTime.isBetweenRange(this.date)) {
					this.events[this.events.length] = events[i];
				}
			}
		}
	};
	/**
	 * <p>Get the events that are scheduled for the week from the appropriate days.</p>
	 * 
	 * @returns {@link Event}s The events that are scheduled for the week.
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
		return monthNames[this.getDate().getMonth()].abbr + this.getWeekDate();
	};
}



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
function Week(weekdays) {
	"use strict";
	var that = this;
	this.weekdays = (weekdays === undefined) ? [] : weekdays;
	this.sunday = (this.weekdays.length >= 1) ? this.weekdays[0] : null;
	this.monday = (this.weekdays.length >= 2) ? this.weekdays[1] : null;
	this.tuesday = (this.weekdays.length >= 3) ? this.weekdays[2] : null;
	this.wednesday = (this.weekdays.length >= 4) ? this.weekdays[3] : null;
	this.thursday = (this.weekdays.length >= 5) ? this.weekdays[4] : null;
	this.friday = (this.weekdays.length >= 6) ? this.weekdays[5] : null;
	this.saturday = (this.weekdays.length >= 7) ? this.weekdays[6] : null;
	/**
	 * Determines if this instance of {@link Week} is the first week in the calendar month. 
	 * 
	 * @returns {Boolean} true if this instance of {@link Week} is the first week of the calendar month.
	 * Otherwise, it will return false.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.isFirstWeekInMonth = function (month) {
		var i;
		for (i = this.weekdays.length - 1; i > -1; i = i - 1) {
			if (this.weekdays[i] !== undefined) {
				if (this.weekdays[i].getWeekDate() === 1 && this.weekdays[i].getDate().getMonth() === month) {
					return true;
				}
			}
		}
		return false;
	};
	/**
	 * Determines if this instance of {@link Week} is the last week in the calendar month. 
	 *
	 * @returns {Boolean} true if this instance of {@link Week} is the last week of the calendar month.
	 * Otherwise, it will return false.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.isLastWeekInMonth = function () {
		var i, monthIndex, year, weekdate, totalDaysInMonth;
		for (i = 0; i < this.weekdays.length; i = i + 1) {
			monthIndex = this.weekdays[i].getDate().getMonth();
			year = this.weekdays[i].getDate().getFullYear();
			weekdate = this.weekdays[i].getWeekDate();
			totalDaysInMonth = this.monthNames[monthIndex].getTotalDays(year);
			if (weekdate === totalDaysInMonth) {
				return true;
			}
		}
		return false;
	};
	/**
	 * <p>Set the events that are scheduled for the week to the appropriate days.</p>
	 * 
	 * @param {@link Event} The events that are scheduled for the week.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	 */
	this.setEvents = function (events) {
		var i;
		for (i = 0; i < this.weekdays.length; i = i + 1) {
			if (this.weekdays[i] !== undefined) {
				this.weekdays[i].setEvents(events);
			}
		}
	};
	/**
	 * <p>Get the events that are scheduled for the week from the appropriate days.</p>
	 * 
	 * @returns {@link Event}s The events that are scheduled for the week.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	 */
	this.getEvents = function () {
		var i, events = [];
		for (i = 0; i < this.weekdays.length; i = i + 1) {
			if (this.weekdays[i] !== undefined && this.weekdays[i] !== null) {
				events = events.concat(this.weekdays[i].getEvents());
			}
		}
		return events;
	};
	this.setCurrentDayOfWeek = function (selectedDateOfWeek) {
		var i, currentDayOfWeekSelectedStatus = false;
		for (i = 0; i < this.weekdays.length; i = i + 1) {
			if (this.weekdays[i] !== undefined && this.weekdays[i] !== null) {
				if (this.weekdays[i].getDate().getTime() === selectedDateOfWeek.getTime()) {
					this.weekdays[i].setCurrentDayOfWeek(true);
					currentDayOfWeekSelectedStatus = true;
					break;
				}
			}
		}
		return currentDayOfWeekSelectedStatus;
	};
	this.findCurrentDayOfWeek = function () {
		var i, currentDayOfWeek = null;
		for (i = 0; i < this.weekdays.length; i = i + 1) {
			if (this.weekdays[i] !== undefined && this.weekdays[i] !== null) {
				if (this.weekdays[i].isCurrentDayOfWeek()) {
					currentDayOfWeek = this.weekdays[i];
					break;
				}
			}
		}
		return currentDayOfWeek;
	};
}

/**
 * <p>Static field that is used to get calendar full name, abbreviated names, and total calendar days.</p>
 * @static
 * @field
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
*/
Week.prototype.monthNames = monthNames;






/**
 * Creates a {@link Month} object that represents the current calendar month.
 * 
 * @class Represents a calendar month.
 * @returns An instance of the Week class.
 * 
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
*/
function Month() {
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
			return monthNames[index].abbr;
		} else {
			return monthNames[index].name;
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
				weekdays[weekday] = new Day(new Date(d.getTime()), null, false);
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
				weekdays[weekday] = new Day(new Date(d.getTime()), null, false);
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
		weekdays[weekdays.length] = new Day(new Date(date.getTime()), null, true);
		for (weekDaysAfterArrayIndex = 0; weekDaysAfterArrayIndex < weekDaysAfterArray.length; weekDaysAfterArrayIndex = weekDaysAfterArrayIndex + 1) {
			if (weekDaysAfterArray[weekDaysAfterArrayIndex] !== undefined) {
				weekdays[weekdays.length] = weekDaysAfterArray[weekDaysAfterArrayIndex];
			}
		}
		return new Week(weekdays);
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
				weekdays[weekday] = new Day(new Date(d));
			}
		} while ((totalDays = totalDays - 1) > 0);
		return new Week(weekdays);
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
				weekdays[weekday] = new Day(new Date(d));
			}
		} while ((totalDays = totalDays - 1) > 0);
		return new Week(weekdays);
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
		var weeksInMonth = [], firstWeekInMonth = getFirstWeekInMonth(getWeek(date), date.getMonth()), foundLastWeekInMonth = false;
		if (firstWeekInMonth !== null) {
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
	 * @param {@link Event} The events that are scheduled for the month.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	 */
	this.setEvents = function (events) {
		this.selectedMonthEvents = events;
		this.bindEvents();
	};
	/**
	 * <p>Gets the events that are scheduled for the month.</p>
	 * 
	 * @returns {@link Event} The events that are scheduled for the month.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	 */
	this.getEvents = function () {
		return this.selectedMonthEvents;
	};
	/**
	 * <p>Convenience method to find events on given date.</p>
	 * 
	 * @returns {@link Event}s The events that are scheduled for the day.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	 */
	this.findEventsByDate = function (date) {
		var events = this.getEvents(), i, todaysEvents = [];
		for (i = 0; i < events.length; i = i + 1) {
			if (events[i] !== undefined && events[i] !== null) {
				if (events[i].getStart().isDateEqualTo(date)) {
					todaysEvents[todaysEvents.length] = events[i];
				}
			}
		}
		return todaysEvents;
	};
	this.getSelectedMonthName = function () {
		return getMonthName(selectedDate.getMonth(), false);
	};
	this.getSelectedDate = function () {
		return selectedDate;
	};
	this.setSelectedDate = function (date) {
		selectedDate = date;
	};
	this.getSelectedDateDisplayName = function () {
		var month = getMonthName(selectedDate.getMonth(), false),
			year = selectedDate.getFullYear(),
			date = selectedDate.getDate(),
			day = weekdayNames[selectedDate.getDay()].name;
		return day + " " + month + " " + date + ", " + year;
	};
	this.setSelectedMonthName = function () {
		this.selectedMonthName = this.getSelectedMonthName();
	};
	this.setSelectedDateDisplayName = function () {
		this.selectedDateDisplayName = this.getSelectedDateDisplayName();
	};
	this.selectDay = function (day) {
		this.setSelectedDate(day.getDate());
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
		setWeeksInMonth(getPreviousMonthDate(this.getPreviousMonthTotalDays(this.getSelectedDate())));
		this.setSelectedMonthName();
		this.setSelectedDateDisplayName();
		return this.getCurrentDayOfMonth(this.getSelectedDate());
	};
	this.highLightSelectedDay = function (previouslySelectedDate) {
		var selector = "div#" + (new Day(selectedDate)).getId();
		if (this.findEventsByDate(selectedDate).length < 1) {
			$(selector).removeClass("calendar-day-with-events calendar-day-with-no-events");
			$(selector).addClass("calendar-day-selected");
		} else {
			$(selector).removeClass("calendar-day-selected calendar-day-with-no-events");
			$(selector).addClass("calendar-day-with-events");
		}
		selector = "div#" + (new Day(previouslySelectedDate)).getId();
		if (this.findEventsByDate(previouslySelectedDate).length < 1) {
			$(selector).removeClass("calendar-day-selected calendar-day-with-events");
			$(selector).addClass("calendar-day-with-no-events");
		} else {
			$(selector).removeClass("calendar-day-selected calendar-day-with-no-events");
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
		var i, week, currentDayOfMonth;
		for (i = 0; i < this.weeks.length; i = i + 1) {
			week = this.weeks[i];
			currentDayOfMonth = week.findCurrentDayOfWeek();
			if (currentDayOfMonth !== undefined && currentDayOfMonth !== null) {
				break;
			}
		}
		if (currentDayOfMonth === undefined || currentDayOfMonth === null) {
			throw new ExpectedToHaveCurrentDayOfMonthException("Expected to have a current day in the month.");
		}
		return currentDayOfMonth;
	};
	this.selectedMonthName = this.getSelectedMonthName();
	this.selectedDateDisplayName = this.getSelectedDateDisplayName();
}
/**
 * <p>Static field that is used to get calendar full name, abbreviated names, and total calendar days.</p>
 * @static
 * @field
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
*/
Month.prototype.monthNames = monthNames;

/**
 * <p>Static field that is used to get calendar total calendar days of the previous month.</p>
 * @static
 * @function
 * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} date Represents some arbitrary calendar date.
 * @return {@link <a href="http://www.w3schools.com/jsref/jsref_obj_number.asp">Number</a>} The total days in the previous month.
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
*/
Month.prototype.getPreviousMonthTotalDays = function (date) {
	"use strict";
	if (date.getMonth() === 0) {
		return this.monthNames[11].getTotalDays(date.getFullYear());
	} else {
		return this.monthNames[date.getMonth() - 1].getTotalDays(date.getFullYear());
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
Month.prototype.getNextMonthTotalDays = function (date) {
	"use strict";
	if (date.getMonth() === 11) {
		return this.monthNames[0].getTotalDays(date.getFullYear());
	} else {
		return this.monthNames[date.getMonth() + 1].getTotalDays(date.getFullYear());
	}
};