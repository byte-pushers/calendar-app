var NoesisCode = NoesisCode || {};
NoesisCode.exceptions = NoesisCode.namespace("com.noesiscode.exceptions");
NoesisCode.exceptions.InvalidParameterException = function (message) {
	"use strict";
	Error.call(this, message);
	NoesisCode.exceptions.InvalidParameterException.prototype = new Error();
	this.name = "NoesisCode.exceptions.InvalidParameterException";
	this.message = message;
};

NoesisCode.exceptions.NullPointerException = function (message) {
	"use strict";
	Error.call(this, message);
	NoesisCode.exceptions.NullPointerException.prototype = new Error();
	this.name = "NoesisCode.exceptions.NullPointerException";
	this.message = message;
};

NoesisCode.exceptions.ExpectedArrayIsEmptyException = function (message) {
	"use strict";
	Error.call(this, message);
	NoesisCode.exceptions.ExpectedArrayIsEmptyException.prototype = new Error();
	this.name = "NoesisCode.exceptions.ExpectedArrayIsEmptyException";
	this.message = message;
};

NoesisCode.exceptions.InvalidDateRangeException = function (message) {
	"use strict";
	Error.call(this, message);
	NoesisCode.exceptions.InvalidDateRangeException.prototype = new Error();
	this.name = "NoesisCode.exceptions.InvalidDateRangeException";
	this.message = message;
};