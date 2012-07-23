function InvalidParameterException(message) {
	"use strict";
	Error.call(this, message);
	InvalidParameterException.prototype = new Error();
	this.name = "InvalidParameterException";
	this.message = message;
}

function NullPointerException(message) {
	"use strict";
	Error.call(this, message);
	NullPointerException.prototype = new Error();
	this.name = "NullPointerException";
	this.message = message;
}

function ExpectedArrayIsEmptyException(message) {
	"use strict";
	Error.call(this, message);
	ExpectedArrayIsEmptyException.prototype = new Error();
	this.name = "ExpectedArrayIsEmptyException";
	this.message = message;
}

function InvalidDateRangeException(message) {
	"use strict";
	Error.call(this, message);
	InvalidDateRangeException.prototype = new Error();
	this.name = "InvalidDateRangeException";
	this.message = message;
}

function ExpectedToHaveCurrentDayOfMonthException(message) {
	"use strict";
	Error.call(this, message);
	ExpectedToHaveCurrentDayOfMonthException.prototype = new Error();
	this.name = "ExpectedToHaveCurrentDayOfMonthException";
	this.message = message;
}

function ExpectedToHaveCurrentDayOfWeekException(message) {
	"use strict";
	Error.call(this, message);
	ExpectedToHaveCurrentDayOfWeekException.prototype = new Error();
	this.name = "ExpectedToHaveCurrentDayOfWeekException";
	this.message = message;
}