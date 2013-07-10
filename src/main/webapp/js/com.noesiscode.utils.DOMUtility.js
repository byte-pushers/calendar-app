/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 3/24/13
 * Time: 3:31 PM
 * To change this template use File | Settings | File Templates.
 */
var NoesisCode = NoesisCode || {};
NoesisCode.DOMUtility = NoesisCode.namespace("com.noesiscode.utils.DOMUtility");
NoesisCode.DOMUtility.addListener = null;
NoesisCode.DOMUtility.removeListener = null;
NoesisCode.DOMUtility.querySelector = null;
NoesisCode.DOMUtility.querySelectorAll = null;
NoesisCode.DOMUtility.filterMetaData = function (data) {
    "use strict";
    data = data.replace(/<meta\s[\w\W]*>/gi, "");
    return data;
};

// the implementation
if (typeof window.addEventListener === 'function') {
    NoesisCode.DOMUtility.addListener = function (el, type, fn) {
        "use strict";
        el.addEventListener(type, fn, false);
    };
    NoesisCode.DOMUtility.removeListener = function (el, type, fn) {
        "use strict";
        el.removeEventListener(type, fn, false);
    };
} else if (typeof document.attachEvent === 'function') { // IE
    NoesisCode.DOMUtility.addListener = function (el, type, fn) {
        "use strict";
        el.attachEvent('on' + type, fn);
    };
    NoesisCode.DOMUtility.removeListener = function (el, type, fn) {
        "use strict";
        el.detachEvent('on' + type, fn);
    };
} else { // older browsers
    NoesisCode.DOMUtility.addListener = function (el, type, fn) {
        "use strict";
        el['on' + type] = fn;
    };
    NoesisCode.DOMUtility.removeListener = function (el, type, fn) {
        "use strict";
        el['on' + type] = null;
    };
}

if (typeof document.querySelector === "function") {
    NoesisCode.DOMUtility.querySelector = function (selector) {
        "use strict";
        return document.querySelector(selector);
    };
} else if (typeof document.getElementsByClassName === "function") {
    NoesisCode.DOMUtility.querySelector = function (selector) {
        "use strict";
        return document.getElementsByClassName(selector);
    };
} else if (typeof $ === "function") {
    NoesisCode.DOMUtility.querySelector = function (selector) {
        "use strict";
        return $(selector);
    };
} else {
    throw ("document.querySelector() method is not supported by your browser.  Please contact the administrator for this app.");
}

if (typeof document.querySelectorAll === "function") {
    NoesisCode.DOMUtility.querySelectorAll = function (selector) {
        "use strict";
        return document.querySelectorAll(selector);
    };
} else if (typeof document.getElementsByClassName === "function") {
    NoesisCode.DOMUtility.querySelectorAll = function (selector) {
        "use strict";
        return document.getElementsByClassName(selector);
    };
} else if (typeof $ === "function") {
    NoesisCode.DOMUtility.querySelector = function (selector) {
        "use strict";
        return $(selector);
    };
} else {
    throw ("document.querySelectorAll() method is not supported by your browser.  Please contact the administrator for this app.");
}