Object.isDate = function (someDate) {
    "use strict";
    var result = false;
    if (Object.isDefined(someDate)) {
        if (typeof someDate === "object" && someDate instanceof Date) {
            result = true;
        }
    }

    return result;
};
Object.isString = function (someString) {
    "use strict";
    var result = false;
    if (Object.isDefined(someString)) {
        if (typeof someString === "string" || (typeof someString === "object" && someString instanceof String)) {
            result = true;
        }
    }

    return result;
};
Object.isNumber = function (someNumber) {
    "use strict";
    var result = false;
    if (Object.isDefined(someNumber)) {
        if (typeof someNumber === "number" || (typeof someNumber === "object" && someNumber instanceof Number)) {
            result = true;
        }
    }

    return result;
};
Object.isBoolean = function (someBoolean) {
    "use strict";
    var result = false;
    if (Object.isDefined(someBoolean)) {
        if (typeof someBoolean === "boolean" || (typeof someBoolean === "object" && someBoolean instanceof Boolean)) {
            result = true;
        }
    }

    return result;
};
Object.isDefined = function (target) {
    "use strict";
    var result = false;
    if (target !== "undefined" && target !== null) {
        result = true;
    }
    return result;
};