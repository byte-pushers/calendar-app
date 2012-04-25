/**
 * <p>Static function that is used to trim the white spaces from the beginning and end of the string.</p>
 * @static
 * @function
 * @return {<a href="http://www.w3schools.com/jsref/jsref_obj_string.asp">String</a>} The value of the string after it has been trimmed.
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
*/
String.prototype.trim = function () {
	"use strict";
	return this.replace(/^\s+|\s+$/g, '');
};