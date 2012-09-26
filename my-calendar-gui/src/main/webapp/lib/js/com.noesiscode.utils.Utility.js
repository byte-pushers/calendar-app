// the interface 
var NoesisCode = NoesisCode || {};
var utils = NoesisCode.namespace("com.noesiscode.utils");
utils.addListener = null;
utils.removeListener = null;
utils.querySelector = null;
utils.querySelectorAll = null;
// the implementation
if (typeof window.addEventListener === 'function') {
	utils.addListener = function (el, type, fn) {
		"use strict";
		el.addEventListener(type, fn, false);
	};
	utils.removeListener = function (el, type, fn) {
		"use strict";
		el.removeEventListener(type, fn, false);
	};
} else if (typeof document.attachEvent === 'function') { // IE
	utils.addListener = function (el, type, fn) {
		"use strict";
		el.attachEvent('on' + type, fn);
	};
	utils.removeListener = function (el, type, fn) {
		"use strict";
		el.detachEvent('on' + type, fn);
	};
} else { // older browsers
	utils.addListener = function (el, type, fn) {
		"use strict";
		el['on' + type] = fn;
	};
	utils.removeListener = function (el, type, fn) {
		"use strict";
		el['on' + type] = null;
	};
}

if (typeof document.querySelector === 'function') {
	utils.querySelector = function (selector) {
		"use strict";
		return document.querySelector(selector);
	};
} else if (typeof document.getElementsByClassName === 'function') {
	utils.querySelector = function (selector) {
		"use strict";
		return document.getElementsByClassName(selector);
	};
} else {
	throw ("document.querySelector() method is not supported by your browser.  Please contact the administrator for this app.");
}

if (typeof document.querySelectorAll === 'function') {
	utils.querySelectorAll = function (selector) {
		"use strict";
		return document.querySelectorAll(selector);
	};
} else if (typeof document.getElementsByClassName === 'function') {
	utils.querySelectorAll = function (selector) {
		"use strict";
		return document.getElementsByClassName(selector);
	};
} else {
	throw ("document.querySelectorAll() method is not supported by your browser.  Please contact the administrator for this app.");
}