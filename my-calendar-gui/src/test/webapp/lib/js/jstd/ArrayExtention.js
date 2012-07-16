if (typeof Array.isArray === "undefined") {
	Array.isArray = function (arg) {
		"use strict";
		return Object.prototype.toString.call(arg) === "[object Array]";
	};
}