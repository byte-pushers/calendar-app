var NoesisCode = NoesisCode || {};
var NoesisCodeExceptions = NoesisCode.namespace("com.noesiscode.exceptions");
NoesisCodeExceptions.InvalidParameterException = function (message) {
	"use strict";
	Error.call(this, message);
	NoesisCodeExceptions.InvalidParameterException.prototype = new Error();
	this.name = "NoesisCodeExceptions.InvalidParameterException";
	this.message = message;
};

NoesisCodeExceptions.NullPointerException = function (message) {
	"use strict";
	Error.call(this, message);
	NoesisCodeExceptions.NullPointerException.prototype = new Error();
	this.name = "NoesisCodeExceptions.NullPointerException";
	this.message = message;
};

NoesisCodeExceptions.ExpectedArrayIsEmptyException = function (message) {
	"use strict";
	Error.call(this, message);
	NoesisCodeExceptions.ExpectedArrayIsEmptyException.prototype = new Error();
	this.name = "NoesisCodeExceptions.ExpectedArrayIsEmptyException";
	this.message = message;
};

NoesisCodeExceptions.InvalidDateRangeException = function (message) {
	"use strict";
	Error.call(this, message);
	NoesisCodeExceptions.InvalidDateRangeException.prototype = new Error();
	this.name = "NoesisCodeExceptions.InvalidDateRangeException";
	this.message = message;
};

var CalendarApp = CalendarApp || {};
var CalendarApi = objectApi.extend(CalendarApp, "com.noesiscode.calendar.api.exceptions"); 
CalendarApi.ExpectedToHaveCurrentDayOfMonthException = function (message) {
	"use strict";
	Error.call(this, message);
	CalendarApi.ExpectedToHaveCurrentDayOfMonthException.prototype = new Error();
	this.name = "CalendarApi.ExpectedToHaveCurrentDayOfMonthException";
	this.message = message;
}

CalendarApi.ExpectedToHaveCurrentDayOfWeekException = function (message) {
	"use strict";
	Error.call(this, message);
	ExpectedToHaveCurrentDayOfWeekException.prototype = new Error();
	this.name = CalendarApi.ExpectedToHaveCurrentDayOfWeekException;
	this.message = message;
}