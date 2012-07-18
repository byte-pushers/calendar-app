Object.prototype.getClassType = function () {
	"use strict";
	var className;
	if (this !== undefined) {
		try {
			className = this.constructor.name;
		} catch (e) {
		}
	}
	return "[class " + className + "]";
};
Object.prototype.getObjectType = function () {
	"use strict";
	if (this !== undefined) {
		try {
			return "[object " + this.constructor.name + "]";
		} catch (e) {
		}
	}
	return "[object Undefined]";
};