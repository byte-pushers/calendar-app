/**
 * <p>Static function that is used to determine if two dates objects have the same date.</p>
 * @static
 * @function
 * @param {@link Date} The date to evaluate against this object.
 * @return {<a href="http://www.w3schools.com/jsref/jsref_obj_boolean.asp">Boolean</a>} True if the date passed in is equal the date object; otherwise return false.
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
*/
Date.prototype.isDateEqualTo = function (date) {
	"use strict";
	if (this.getFullYear() === date.getFullYear()) {
		if (this.getMonth() === date.getMonth()) {
			if (this.getDate() === date.getDate()) {
				return true;
			}
		}
	}
	return false;
};