TestCase("ObjectExtentionTestCases", {
	testGettingCalendarApiObject: function(){
		var myapp = myapp || {};
		objectApi.extend(myapp, "utils");
		myapp.utils.name = "tonte";
		myapp.utils.getName = function (){
			return this.name;
		};
		assertNotUndefined("myapp.utils should be defined.", myapp.utils);
		assertEquals("myapp.utils.name should equal 'tonte'", "tonte", myapp.utils.name);
		assertEquals("myapp.utils.name should equal 'tonte'", "tonte", myapp.utils.getName());
		var model = objectApi.extend(myapp, "utils.model");
		assertNotUndefined("myapp.utils should be defined.", myapp.utils.model);
		assertNotUndefined("model should be defined.", model);
		myapp.utils.model.name = "tim";
		myapp.utils.model.getName = function(){
			return this.name;
		};
		assertEquals("myapp.utils.model.name should equal 'tim'", "tim", myapp.utils.model.name);
		assertEquals("myapp.utils.model.name should equal 'tim'", "tim", myapp.utils.model.getName());
		
	},
	testGettingCalendarApiUsingExtend: function(){
		assertNotUndefined("CalendarApp should be defined.", CalendarApp);
		assertNotUndefined("CalendarApi should be defined.", CalendarApi);
	}
});
