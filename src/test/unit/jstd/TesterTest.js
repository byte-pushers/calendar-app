NoesisCode.namespace("test");
test.TesterTest = TestCase("TesterTest");

test.TesterTest.prototype.testPrivateMethod = function() {
	test.tester = (new test.Tester()).getInstance(TestClass);
	assertEquals("doing test", test.tester._privates.doTest());
};

test.TesterTest.prototype.testNestedNameWithTraditionalClass1 = function() {
	test.person = TestClass;
	test.tester = (new test.Tester()).getInstance(test.person);
	tester;
};

test.TesterTest.prototype.testNestedNameWithTraditionalClass2 = function() {
	test.Person = function (name){
		this.name = name;
		var age = 16;
		this.getAge = function(){
			return age;
		};
	};
	
	test.testapp = {};
	test.testapp.person = (new Tester()).getInstance(test.Person);;
	test.testapp.person.name = "tonte";
	assertEquals("tonte", test.testapp.person.name);
	assertEquals(16, test.testapp.person.getAge());
	assertUndefined(test.testapp.person.age);
};

test.TesterTest.prototype.testNestedNameWithTraditionalClass3 = function() {
	test.Person = function(name){
		this.name = name;
		var age = 16;
		this.getAge = function(){
			return age;
		};
	};
	
	test.testapp = {};
	test.testapp.person =  (new Tester()).getInstance(test.Person);;
	test.testapp.person.name = "tonte";
	assertEquals("tonte", test.testapp.person.name);
	assertEquals(16, test.testapp.person.getAge());
	assertUndefined(test.testapp.person.age);
};
