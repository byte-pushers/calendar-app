if (typeof Array.isArray === "undefined") {
	Array.prototype.isArray = function (arg) {
		"use strict";
		return Object.prototype.toString.call(arg) === "[object Array]";
	};
}