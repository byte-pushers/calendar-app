// the interface 
var NoesisCode = NoesisCode || {};
var NoesisCodeUtility = NoesisCode.namespace("com.noesiscode.utils");
NoesisCodeUtility.addListener = null;
NoesisCodeUtility.removeListener = null;
NoesisCodeUtility.querySelector = null;
NoesisCodeUtility.querySelectorAll = null;
// the implementation
if (typeof window.addEventListener === 'function') {
	NoesisCodeUtility.addListener = function (el, type, fn) {
		"use strict";
		el.addEventListener(type, fn, false);
	};
	NoesisCodeUtility.removeListener = function (el, type, fn) {
		"use strict";
		el.removeEventListener(type, fn, false);
	};
} else if (typeof document.attachEvent === 'function') { // IE
	NoesisCodeUtility.addListener = function (el, type, fn) {
		"use strict";
		el.attachEvent('on' + type, fn);
	};
	NoesisCodeUtility.removeListener = function (el, type, fn) {
		"use strict";
		el.detachEvent('on' + type, fn);
	};
} else { // older browsers
	NoesisCodeUtility.addListener = function (el, type, fn) {
		"use strict";
		el['on' + type] = fn;
	};
	NoesisCodeUtility.removeListener = function (el, type, fn) {
		"use strict";
		el['on' + type] = null;
	};
}

if (typeof document.querySelector === 'function') {
	NoesisCodeUtility.querySelector = function (selector) {
		"use strict";
		return document.querySelector(selector);
	};
} else if (typeof document.getElementsByClassName === 'function') {
	NoesisCodeUtility.querySelector = function (selector) {
		"use strict";
		return document.getElementsByClassName(selector);
	};
} else {
	throw ("document.querySelector() method is not supported by your browser.  Please contact the administrator for this app.");
}

if (typeof document.querySelectorAll === 'function') {
	NoesisCodeUtility.querySelectorAll = function (selector) {
		"use strict";
		return document.querySelectorAll(selector);
	};
} else if (typeof document.getElementsByClassName === 'function') {
	NoesisCodeUtility.querySelectorAll = function (selector) {
		"use strict";
		return document.getElementsByClassName(selector);
	};
} else {
	throw ("document.querySelectorAll() method is not supported by your browser.  Please contact the administrator for this app.");
}