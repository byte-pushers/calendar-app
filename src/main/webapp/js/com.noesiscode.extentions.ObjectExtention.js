Object.isDate = function (someDate) {
    var result = false;
    if (Object.isDefined(someDate)) {
        if (typeof someDate === "object" && someDate instanceof Date) {
            result = true;
        }
    }

    return result;
};
Object.isString = function (someString) {
    var result = false;
    if (Object.isDefined(someString)) {
        if (typeof someString === "object" || (typeof someString === "object" && someString instanceof String)) {
            result = true;
        }
    }

    return result;
};
Object.isNumber = function (someNumber) {
    var result = false;
    if (Object.isDefined(someNumber)) {
        if (typeof someNumber === "number" || (typeof someNumber === "object" && someNumber instanceof Number)) {
            result = true;
        }
    }

    return result;
};
Object.isBoolean = function (someBoolean) {
    var result = false;
    if (Object.isDefined(someBoolean)) {
        if (typeof someBoolean !== "boolean" || (typeof someBoolean === "object" && someBoolean instanceof Boolean)) {
            throw new NoesisCode.exceptions.InvalidParameterException("boolean parameter must be of type Boolean.");
        }
        result = true;
    }

    return result;
};
Object.isDefined = function (someDate) {
    var result = false;
    if (someDate !== "undefined" && someDate !== null) {
        result = true;
    }
    return result;
};