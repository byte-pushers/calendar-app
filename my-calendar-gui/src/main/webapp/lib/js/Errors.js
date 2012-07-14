function InvalidParameterException(message) {
	"use strict";
	Error.call(this, message);
	InvalidParameterException.prototype = new Error();
	this.name = "InvalidParameterException";
}

function NullPointerException(message) {
	"use strict";
	Error.call(this, message);
	NullPointerException.prototype = new Error();
	this.name = "NullPointerException";
}

function ExpectedArrayIsEmptyException(message) {
	"use strict";
	Error.call(this, message);
	ExpectedArrayIsEmptyException.prototype = new Error();
	this.name = "ExpectedArrayIsEmptyException";
}