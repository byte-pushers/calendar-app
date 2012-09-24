TesterTest = TestCase("TesterTest");

TesterTest.prototype.testPrivateMethod = function() {
	var tester = (new Tester()).getInstance(TestClass);
	assertEquals("doing test", tester._privates.doTest());
};

TesterTest.prototype.testNestedNameWithTraditionalClass1 = function() {
	var myApp = myApp || {};
	myApp.person = TestClass;
	var tester = (new Tester()).getInstance(myApp.person);
};

TesterTest.prototype.testNestedNameWithTraditionalClass2 = function() {
	var myApp = myApp || {};
	myApp.Person = function (name){
		this.name = name;
		var age = 16;
		this.getAge = function(){
			return age;
		}
	};
	
	var person = (new Tester()).getInstance(myApp.Person);
	myApp.person = person;
	myApp.person.name = "tonte";
	assertEquals("tonte", myApp.person.name);
	assertEquals(16, myApp.person.getAge());
	assertUndefined(myApp.person.age);
};

TesterTest.prototype.testNestedNameWithTraditionalClass3 = function() {
	function Person(name){
		this.name = name;
		var age = 16;
		this.getAge = function(){
			return age;
		}
	}
	
	var person = (new Tester()).getInstance(Person);
	var myApp = myApp || {};
	myApp.person = person;
	myApp.person.name = "tonte";
	assertEquals("tonte", myApp.person.name);
	assertEquals(16, myApp.person.getAge());
	assertUndefined(myApp.person.age);
};
