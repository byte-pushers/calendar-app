
Object.prototype.getClassType = function () {
	"use strict";
	var className = null;
	if (this !== undefined) {
		try {
			className = this.constructor.name;
		} catch (e) {
		}
	}
    className = (className === "") ? this.getClassName() : className;
	return "[class " + className + "]";
};
Object.prototype.getObjectType = function () {
	"use strict";
    var className = null;
	if (this !== undefined) {
		try {
            className = this.constructor.name;
		} catch (e) {
		}
	}
    className = (className === "") ? this.getClassName() : className;
	return "[object " + className + "]";
};