describe("Tester", function(){
	it('should be able to call private methods', function () {
		var tester = (new Tester()).getInstance(TestClass);
		expect(tester).toBeDefined();
		expect(tester._privates).toBeDefined();
		expect(tester._privates["doTest"]).toBeDefined();
		expect(tester._privates.doTest()).toEqual("doing test");
		expect(tester._privates["getType"]).toBeDefined();
		expect(tester._privates.getType()).toEqual("JavaScript");
	});
});