var NoesisCode = NoesisCode || {};
NoesisCode.NumberUtility = NoesisCode.namespace("com.noesiscode.utils.NumberUtility");
NoesisCode.NumberUtility.padLeft = function padLeft(number, length) {
	'use strict';
	return ((number+"").length >= length) ? number + "" : padLeft("0" + number, length);
};
NoesisCode.NumberUtility.padRight = function padRight(number, length) {
	'use strict';
	return ((number+"").length >= length) ? number + "" : padRight(number + "0", length);
};
NoesisCode.NumberUtility.isSingleDigit = function isSingleDigit(number){
	'use strict';
	return (0 < number && number <= 9)? true: false;
};
NoesisCode.NumberUtility.isNotANumber = function isNotANumber(d) {
	'use strict';
	return isNaN(new Number(d));
};
NoesisCode.NumberUtility.isANumber = function isANumber(d) {
	'use strict';
	return !isNaN(new Number(d));
};