Object.prototype.getName = function () {
    'use strict';
    var funcNameRegex = /function (\w{1,})\(/,
        results = (funcNameRegex).exec((this).constructor.toString());
    return (results && results.length > 1) ? results[1] : "";
};

Object.prototype.getClassType = function () {
	"use strict";
	var className = null;
	if (this !== undefined) {
		try {
			className = this.constructor.name;
		} catch (e) {
		}
	}

    className = (this.getName() === undefined || this.getName() === null || this.getName() === "") ? this.getClassName() : this.getName(); //(className === "") ? this.getClassName() : className;
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
    className = (this.getName() === undefined || this.getName() === null || this.getName() === "") ? this.getClassName() : this.getName(); //(className === "") ? this.getClassName() : className;
	return "[object " + className + "]";
};