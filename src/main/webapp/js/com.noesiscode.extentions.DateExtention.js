/**
 * <p>Static function that is used to determine if two dates objects have the same date.</p>
 * @static
 * @function
 * @param {@link Date} The date to evaluate against this object.
 * @return {<a href="http://www.w3schools.com/jsref/jsref_obj_boolean.asp">Boolean</a>} True if the date passed in is equal the date object; otherwise return false.
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
*/
Date.prototype.isDateEqualTo = function (date) {
	"use strict";
	if (this.getFullYear() === date.getFullYear()) {
		if (this.getMonth() === date.getMonth()) {
			if (this.getDate() === date.getDate()) {
				return true;
			}
		}
	}
	return false;
};
/**
 * <p>Static function that is used to determine if two dates objects have the same date and time.</p>
 * @static
 * @function
 * @param {@link Date} The date to evaluate against this object.
 * @return {<a href="http://www.w3schools.com/jsref/jsref_obj_boolean.asp">Boolean</a>} True if the date passed in is equal the date object; otherwise return false.
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
Date.prototype.isDateEqualToDateAndTime = function (date) {
    "use strict";
    if (this.getFullYear() === date.getFullYear()) {
        if (this.getMonth() === date.getMonth()) {
            if (this.getDate() === date.getDate()) {
                if (this.getHours() === date.getHours()) {
                    if (this.getMinutes() === date.getMinutes()) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
};
Date.prototype.isDateEqualToTomorrow = function (date) {
    "use strict";
    if (this.getFullYear() === date.getFullYear()) {
        if (this.getMonth() === date.getMonth()) {
            if (this.getDate() + 1 === date.getDate()) {
                return true;
            }
        } else if (this.getMonth() + 1 === date.getMonth()) {
            if (this.isLastDayInMonth() && date.getDate() === 1) {
                return true;
            }
        }
    }
    return false;
};
Date.prototype.isDateEqualToYesterday = function (date) {
    "use strict";
    if (this.getFullYear() === date.getFullYear()) {
        if (this.getMonth() === date.getMonth()) {
            if (this.getDate() - 1 === date.getDate()) {
                return true;
            }
        } else if (this.getMonth() === date.getMonth() + 1) {
            if (this.getDate() === 1 && date.isLastDayInMonth()) {
                return true;
            }
        }
    }
    return false;
};
Date.prototype.isLastDayInMonth = function (date) {
    "use strict";
    var targetDate = (date === undefined) ? this : date, lastDayInMonth;
    lastDayInMonth = targetDate.getCurrentMonthTotalDays();
    if (targetDate.getDate() === lastDayInMonth) {
        return true;
    }
    return false;
};
/**
 * <p>Static field that is used to get calendar total calendar days of the previous month.</p>
 * @static
 * @function
 * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} date Represents an optional arbitrary calendar date for which to calculate the next month.  If omitted, next month calculation will be done with this instance of date.
 * @returns {@link <a href="http://www.w3schools.com/jsref/jsref_obj_number.asp">Number</a>} The total days in the previous month.
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
Date.prototype.getPreviousMonthTotalDays = function (date) {
    "use strict";
    var targetDate = (date === undefined) ? this : date;
    if (targetDate.getMonth() === 0) {
        return this.monthNames[11].getTotalDays(targetDate.getFullYear());
    } else {
        return this.monthNames[targetDate.getMonth() - 1].getTotalDays(targetDate.getFullYear());
    }
};
/**
 * <p>Static function that is used to get the total calendar days of the next month.</p>
 * @static
 * @function
 * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} date Represents an optional arbitrary calendar date for which to calculate the next month.  If omitted, next month calculation will be done with this instance of date.
 * @returns {@link <a href="http://www.w3schools.com/jsref/jsref_obj_number.asp">Number</a>} The total days in the next month.
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
Date.prototype.getNextMonthTotalDays = function (date) {
    "use strict";
    var targetDate = (date === undefined) ? this : date;
    if (targetDate.getMonth() === 11) {
        return this.monthNames[0].getTotalDays(targetDate.getFullYear());
    } else {
        return this.monthNames[targetDate.getMonth() + 1].getTotalDays(targetDate.getFullYear());
    }
};
/**
 * <p>Static function that is used to get the total calendar days of the next month.</p>
 * @static
 * @function
 * @param {<a href="http://www.w3schools.com/jsref/jsref_obj_date.asp">Date</a>} date Represents an optional arbitrary calendar date for which to calculate the next month.  If omitted, next month calculation will be done with this instance of date.
 * @returns {@link <a href="http://www.w3schools.com/jsref/jsref_obj_number.asp">Number</a>} The total days in the next month.
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
Date.prototype.getCurrentMonthTotalDays = function (date) {
    "use strict";
    var targetDate = (date === undefined) ? this : date;
    if (targetDate.getMonth() === 11) {
        return this.monthNames[0].getTotalDays(targetDate.getFullYear());
    } else {
        return this.monthNames[targetDate.getMonth()].getTotalDays(targetDate.getFullYear());
    }
};
Date.prototype.addTime = function (time) {
    "use strict";
    var newDate = new Date(),
        wholeNumber = (time > 0) ? Math.floor(time) : Math.ceil(time),
        fraction = ((time - wholeNumber).toFixed(2) * 100),
        hourInMilliseconds = (1000 * 60 * 60) * wholeNumber,
        minutesInMilliseconds = (1000 * 60) * (fraction);

    newDate.setTime(this.getTime());
    newDate.setTime(newDate.getTime() + hourInMilliseconds);
    newDate.setTime(newDate.getTime() + minutesInMilliseconds);

    return newDate;
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
Date.prototype.getMonthName = function (index, getAbbr) {
    "use strict";
    if (getAbbr) {
        return this.monthNames[index].abbr;
    } else {
        return this.monthNames[index].name;
    }
};

/**
 * <p>Static field for the list of month.</p>
 * @static
 * @field
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
Date.prototype.monthNames = [
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
