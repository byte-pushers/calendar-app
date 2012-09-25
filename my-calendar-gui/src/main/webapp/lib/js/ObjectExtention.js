var objectApi = objectApi || {};
objectApi.extend  = function (ns, ns_string) {
	"use strict";
    var parts = ns_string.split('.'),
        parent = ns,
        pl,
        i;
    if (parts[0] === "myApp") {
        parts = parts.slice(1);
    }
    pl = parts.length;
    for (i = 0; i < pl; i = i + 1) {
        //create a property if it doesnt exist  
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};
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