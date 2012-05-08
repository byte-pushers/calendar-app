function Tester(){
	this.getInstance = function(classRef){
		// get the functions as a string
		var classAsString = classRef.toString();

		// To expose the private functions, we create
		// a new function that goes trough the functions string
		// we could have done all string parsing in this class and
		// only associate the functions directly with string
		// manipulation here and not inside the new class,
		// but then we would have to expose the functions as string
		// in the code, which could lead to problems in the eval since
		// string might have semicolons, line breaks etc.
		var funcString = "";
		funcString += "new (";
		funcString += classAsString.substring(0, classAsString.length - 3) + ";\n";
		funcString += "\tthis._privates = {};\n";
		funcString += "\tthis._initPrivates = function(f){\n";
			funcString += "\t\tvar fs = f.toString();\n";
			funcString += "\t\tthis._privates = {};\n";
			funcString += "\t\tvar pf = fs.match(/function\\s*?(\\w.*?)\\(/g);\n";
			funcString += "\t\tif(pf != null){\n"
				funcString += "\t\t\tfor (var i = 0, ii = pf.length; i < ii; i++){\n";
				funcString += "\t\t\t\tvar fn = pf[i].replace(/function\\s+/, '').replace('(', '');\n";
				funcString += "\t\t\t\tif('"+classRef.name+"' != fn){\n";
				funcString += "\t\t\t\t\tthis._privates[fn] = eval(fn);\n";
				funcString += "\t\t\t\t}\n";
				funcString += "\t\t\t}\n";
			funcString += "\t\t}\n";
			funcString += "\t\tpf = fs.match(/var\\s*\\w.*?\\s+=\\s+function\\s*?\\(/g);\n";
			funcString += "\t\tif(pf != null){\n"
				funcString += "\t\t\tfor(var i = 0, ii = pf.length; i < ii; i++){\n";
				funcString += "\t\t\t\tvar fn = pf[i].replace(/var\\s*/, '').replace(' ', '').replace('=', '').replace(' ', '').replace('function', '').replace(' ', '').replace('(', '');\n";
				funcString += "\t\t\t\t\tthis._privates[fn] = eval(fn);\n";
				funcString += "\t\t\t}\n";
			funcString += "\t\t}\n";
		funcString += "\t};";
		funcString += "\n}";
		funcString +=")();";

		var instance = eval(funcString);
		instance._initPrivates(classAsString);

		// delete the initiation functions
		delete instance._initPrivates;

		return instance;
	};
}

function TestClass(){
	var someArray = new Array();
	var someProperty = "property";
	var someOtherProperty;
	
	this.someAttribute = "Some Attribute";
	this.someOtherAttribute;
	
	this.monthNames = [{"name": "January", "abbr": "Jan", "maxDays": "31"},
	                   {"name": "February", "abbr": "Feb", "maxDays": null},
	                   {"name": "March", "abbr": "Mar", "maxDays": "31"},
	                   {"name": "April", "abbr": "Apr", "maxDays": "30"},
	                   {"name": "May", "abbr": "May", "maxDays": "31"},
	                   {"name": "June", "abbr": "Jun", "maxDays": "30"},
	                   {"name": "July", "abbr": "Jul", "maxDays": "31"},
	                   {"name": "August", "abbr": "Aug", "maxDays": "31"},
	                   {"name": "September", "abbr": "Sept", "maxDays": "30"},
	                   {"name": "October", "abbr": "Oct", "maxDays": "31"},
	                   {"name": "November", "abbr": "Nov", "maxDays": "30"},
	                   {"name": "December", "abbr": "Dec", "maxDays": "31"}];
	
	this.getName = function(){
		return "TestClass";
	};
	
	this.getName2 = function(){
		return "TestClass";
	};
	
	var getType = function(){
		return "JavaScript";
	};
	
	function doTest(){
		return "doing test";
	};
}