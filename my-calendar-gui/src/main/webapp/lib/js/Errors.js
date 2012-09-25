var NoesisCode = NoesisCode || {};

NoesisCode.InvalidParameterException = function (message) {
	"use strict";
	Error.call(this, message);
	NoesisCode.InvalidParameterException.prototype = new Error();
	this.name = "NoesisCode.InvalidParameterException";
	this.message = message;
}

NoesisCode.NullPointerException = function (message) {
	"use strict";
	Error.call(this, message);
	NoesisCode.NullPointerException.prototype = new Error();
	this.name = "NoesisCode.NullPointerException";
	this.message = message;
}

NoesisCode.ExpectedArrayIsEmptyException = function (message) {
	"use strict";
	Error.call(this, message);
	NoesisCode.ExpectedArrayIsEmptyException.prototype = new Error();
	this.name = "NoesisCode.ExpectedArrayIsEmptyException";
	this.message = message;
}

NoesisCode.InvalidDateRangeException = function (message) {
	"use strict";
	Error.call(this, message);
	NoesisCode.InvalidDateRangeException.prototype = new Error();
	this.name = "NoesisCode.InvalidDateRangeException";
	this.message = message;
}

var CalendarApp = CalendarApp || {};
var CalendarApi = objectApi.extend(CalendarApp, "com.noesiscode.calendar.api"); 
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