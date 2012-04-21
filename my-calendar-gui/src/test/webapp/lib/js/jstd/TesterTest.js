TesterTest = TestCase("TesterTest");

TesterTest.prototype.testPrivateMethod = function() {
	var tester = (new Tester()).getInstance(TestClass);
	assertEquals("doing test", tester._privates.doTest());
};