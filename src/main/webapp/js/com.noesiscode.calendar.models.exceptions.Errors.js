var CalendarApp = CalendarApp || {};
CalendarApp.exceptions = CalendarApp.namespace("com.noesiscode.calendar.models.exceptions");
CalendarApp.exceptions.ExpectedToHaveCurrentDayOfMonthException = function (message) {
	"use strict";
	Error.call(this, message);
	CalendarApp.exceptions.ExpectedToHaveCurrentDayOfMonthException.prototype = new Error();
	this.name = "CalendarApp.exceptions.ExpectedToHaveCurrentDayOfMonthException";
	this.message = message;
    this.toString(this.name + ": " + message);
};

CalendarApp.exceptions.ExpectedToHaveCurrentDayOfWeekException = function (message) {
	"use strict";
	Error.call(this, message);
	CalendarApp.exceptions.ExpectedToHaveCurrentDayOfWeekExceptionpi.prototype = new Error();
	this.name = CalendarApp.exceptions.ExpectedToHaveCurrentDayOfWeekException;
	this.message = message;
};