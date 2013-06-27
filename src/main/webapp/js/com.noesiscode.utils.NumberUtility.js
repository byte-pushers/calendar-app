var NoesisCode = NoesisCode || {};
NoesisCode.NumberUtility = NoesisCode.namespace("com.noesiscode.utils.NumberUtility");
NoesisCode.NumberUtility.padLeft = function padLeft(number, length) {
	'use strict';
    number = (number === undefined || number === null) ? "" : number;
	return (number.length >= length) ? number : padLeft("0" + number, length);
};
NoesisCode.NumberUtility.padRight = function padRight(number, length) {
	'use strict';
    number = (number === undefined || number === null) ? "" : number;
	return (number.length >= length) ? number : padRight(number + "0", length);
};
NoesisCode.NumberUtility.isSingleDigit = function isSingleDigit(number) {
	'use strict';
	return (0 < number && number <= 9) ? true : false;
};
NoesisCode.NumberUtility.isNotANumber = function isNotANumber(d) {
	'use strict';
	return isNaN(d);
};
NoesisCode.NumberUtility.isANumber = function isANumber(d) {
	'use strict';
    if (d === "") {
        return false;
    }
	return !isNaN(d);
};