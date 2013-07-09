/*global CalendarApp */
var NoesisCode = NoesisCode || {};
NoesisCode.converters = NoesisCode.namespace("com.noesiscode.utils.converters");
NoesisCode.converters.DateConverter = NoesisCode.namespace("com.noesiscode.utils.converters.DateConverter");
NoesisCode.converters.DateConverter.MMDDYYYY_DATE_FORMAT = 0;
NoesisCode.converters.DateConverter.MMMDDYYYY_DATE_FORMAT = 1;
NoesisCode.converters.DateConverter.YYYYMMDDThhmmsssTZD_DATE_FORMAT = 2;
NoesisCode.converters.DateConverter.MDDYYYY_DATE_FORMAT = 3;
NoesisCode.converters.DateConverter.convertToDate_MDDYYYY = function (d) {
    'use strict';
    var month, day, year, date = new Date();
    if (d.length !== 7) {
        throw new NoesisCode.exceptions.InvalidParameterException("Date String: " + d + " should be in format MDDYYYY.");
    }
    if (NoesisCode.NumberUtility.isNotANumber(d)) {
        throw new NoesisCode.exceptions.InvalidParameterException("Date String: " + d + " must be numeric.");
    }
    month = Number(d.substring(0, 2));
    day = Number(d.substring(2, 4));
    year = Number(d.substring(4));
    date.setFullYear(year, month, day);
    date.setHours(0, 0, 0, 0);
    return date;
};
NoesisCode.converters.DateConverter.convertToDate_MMDDYYYY = function (d) {
	'use strict';
	var month, day, year, date = new Date();
	if (d.length !== 8) {
		throw new NoesisCode.exceptions.InvalidParameterException("Date String: " + d + " should be in format MMDDYYYY.");
	}
	if (NoesisCode.NumberUtility.isNotANumber(d)) {
		throw new NoesisCode.exceptions.InvalidParameterException("Date String: " + d + " must be numeric.");
	}
	month = Number(d.substring(0, 1));
	day = Number(d.substring(1, 3));
	year = Number(d.substring(3));
	date.setFullYear(year, month, day);
    date.setHours(0, 0, 0, 0);
	return date;
};
NoesisCode.converters.DateConverter.convertToDate_MMMDDYYYY = function (d) {
    "use strict";
	var month, day, year, date = new Date();
	if (d.length !== 9) {
		throw new NoesisCode.exceptions.InvalidParameterException("Date String: " + d + " should be in format MMMDDYYYY.");
	}
	if (NoesisCode.NumberUtility.isNotANumber(d.substring(3))) {
		throw new NoesisCode.exceptions.InvalidParameterException("Date String: " + d + " must be numeric.");
	}
	month = Number(CalendarApp.models.Month.getMonthIndex(d.substring(0, 3)));
	day = Number(d.substring(3, 5));
	year = Number(d.substring(5));
	date.setFullYear(year, month, day);
    date.setHours(0, 0, 0, 0);
	return date;
};
NoesisCode.converters.DateConverter.convertToDate_YYYYMMDDThhmmsssTZD = function (iso8601DateString) {
    "use strict";
    return NoesisCode.converters.DateConverter.convertToISO8601Date(iso8601DateString);
};
NoesisCode.converters.DateConverter.convertToISO8601Date = function (iso8601DateString) {
    "use strict";
    var regexp = new RegExp("([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\\.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?"),
        d = iso8601DateString.match(new RegExp(regexp)),
        offset = 0,
        date,
        time;

    if (d === null) {
        throw new NoesisCode.exceptions.InvalidParameterException("ISO 8601 Date String: " + d + " should be in ISO 8601 format YYYY-MM-DDThh:mm:ss:sTZD.");
    }


    date = new Date(d[1], 0, 1);

    if (d[3]) { date.setMonth(d[3] - 1); }
    if (d[5]) { date.setDate(d[5]); }
    if (d[7]) { date.setHours(d[7]); }
    if (d[8]) { date.setMinutes(d[8]); }
    if (d[10]) { date.setSeconds(d[10]); }
    if (d[12]) { date.setMilliseconds(Number("0." + d[12]) * 1000); }
    if (d[14]) {
        offset = (Number(d[16]) * 60) + Number(d[17]);
        offset *= ((d[15] === '-') ? 1 : -1);
    }

    //offset -= date.getTimezoneOffset();
    //time = (date.getTime() + (offset * 60 * 1000));
    //date.setTime(time);
    return date;
};
NoesisCode.converters.DateConverter.convertToDate = function (d, dateFormat) {
	'use strict';
	var date = null;
	switch (dateFormat) {
    case NoesisCode.converters.DateConverter.MDDYYYY_DATE_FORMAT:
        date = NoesisCode.converters.DateConverter.convertToDate_MDDYYYY(d);
        break;
    case NoesisCode.converters.DateConverter.MMDDYYYY_DATE_FORMAT:
        date = NoesisCode.converters.DateConverter.convertToDate_MMDDYYYY(d);
        break;
    case NoesisCode.converters.DateConverter.MMMDDYYYY_DATE_FORMAT:
        date = NoesisCode.converters.DateConverter.convertToDate_MMMDDYYYY(d);
        break;
    case NoesisCode.converters.DateConverter.YYYYMMDDThhmmsssTZD_DATE_FORMAT:
        date = NoesisCode.converters.DateConverter.convertToDate_YYYYMMDDThhmmsssTZD(d);
        break;
	}
	return date;
};