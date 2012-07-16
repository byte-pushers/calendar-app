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
	var type = "Undefined";
	if (this !== undefined) {
		try {
			type = this.constructor;
		} catch (e) {
		}
	}
	return "[object " + type + "]";
};