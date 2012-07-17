TestCase("EventTestCases", { 
	testCreatingDateRange: function() {
		var start = new Date(2012, 7, 16, 17, 0, 0); //6 o'clock PM
		var end = new Date(2012, 7, 16, 21, 0, 0); //10 o'clock PM
		var dateRange = new DateRange(start, end);
		assertNotUndefined("dateRange should be defined.", dateRange);
		assertEquals(start, dateRange.getStartDate());
		assertEquals(end, dateRange.getEndDate());
	}, testCreatingImproperDateRange: function() {
		var start = new Date(2012, 7, 16, 17, 0, 0); //10 o'clock PM
		var end = new Date(2012, 7, 16, 21, 0, 0); //6 o'clock PM
		try{
			var dateRange = new DateRange(end, start);
		} catch (e){
			assertTrue(e.name === "InvalidDateRangeException");
		}
	}
});