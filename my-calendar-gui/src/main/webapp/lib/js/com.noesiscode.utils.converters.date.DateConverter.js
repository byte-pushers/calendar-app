var NoesisCode = NoesisCode || {};
NoesisCode.converters = NoesisCode.namespace("com.noesiscode.utils.converters");
NoesisCode.converters.DateConverter = NoesisCode.namespace("com.noesiscode.utils.converters.DateConverter");
NoesisCode.converters.DateConverter.MMDDYYYY_DATE_FORMAT = 0;
NoesisCode.converters.DateConverter.MMMDDYYYY_DATE_FORMAT = 1;
NoesisCode.converters.DateConverter.convertToDate_MMDDYYYY = function (d) {
	'use strict';
	var month, day, year, date = new Date();
	if(d.length !== 8) {
		throw new NoesisCode.exceptions.InvalidParameterException("Date String: " + d + " should be in format MMDDYYYY.");
	}
	if(NoesisCode.NumberUtility.isNotANumber(d)) {
		throw new NoesisCode.exceptions.InvalidParameterException("Date String: " + d + " must be numeric.");
	}
	
	month = new Number(d.substring(0, 2));
	day = new Number(d.substring(2, 4));
	year = new Number(d.substring(4));
	date.setFullYear(year, month, day);
	return date;
};
NoesisCode.converters.DateConverter.convertToDate_MMMDDYYYY = function (d) {
	var month, day, year, date = new Date();
	if(d.length !== 9) {
		throw new NoesisCode.exceptions.InvalidParameterException("Date String: " + d + " should be in format MMMDDYYYY.");
	}
	if(NoesisCode.NumberUtility.isNotANumber(d.substring(3))) {
		throw new NoesisCode.exceptions.InvalidParameterException("Date String: " + d + " must be numeric.");
	}
	
	month = new Number(CalendarApp.models.Month.getMonthIndex(d.substring(0, 2)));
	day = new Number(d.substring(2, 4));
	year = new Number(d.substring(4));
	date.setFullYear(year, month, day);
	return date;
};
NoesisCode.converters.DateConverter.convertToDate = function (d, dateFormat){
	'use strict';
	switch(dateFormat){
		case NoesisCode.converters.DateConverter.MMDDYYYY_DATE_FORMAT:
			NoesisCode.converters.DateConverter.convertToDate_MMDDYYYY(d);
			break;
		case NoesisCode.converters.DateConverter.MMMDDYYYY_DATE_FORMAT:
			NoesisCode.converters.DateConverter.convertToDate_MMMDDYYYY(d);
			break;

	};
};