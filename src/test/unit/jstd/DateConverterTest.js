TestCase("DateConverterTestCases", {
	test_MMMDDYYYY_DATEConversion: function(){
		var expectedDate = new Date();
		expectedDate.setFullYear(2012, 9, 30);
		var dateConversionFormat = NoesisCode.converters.DateConverter.MMMDDYYYY_DATE_FORMAT;
		var actualDate = NoesisCode.converters.DateConverter.convertToDate("Oct302012", dateConversionFormat);
		assertEquals(expectedDate.getDate(), actualDate.getDate());
		assertEquals(expectedDate.getMonth(), actualDate.getMonth());
		assertEquals(expectedDate.getFullYear(), actualDate.getFullYear());
	}, 
	testGettingMonthIndexUseAbbreivatedMonth: function(){
		var actualMonthIndex = new Number(CalendarApp.models.Month.getMonthIndex("Oct302012".substring(0, 3)));
		assertEquals(9, actualMonthIndex);
	}, 
	testGettingDayIndexUseAbbreivatedMonth: function(){
		var actualDayIndex = new Number("Oct302012".substring(3, 5));
		assertEquals(30, actualDayIndex);
	}, 
	testGettingYearIndexUseAbbreivatedMonth: function(){
		var actualYear = new Number("Oct302012".substring(5));
		assertEquals(2012, actualYear);
	},
	testCreateDateWithNumbers: function(){
		var actualDate = new Date();
		actualDate.setFullYear(new Number("2012"), new Number("9"), new Number("30"));
		assertEquals(30, actualDate.getDate());
		assertEquals(9, actualDate.getMonth());
		assertEquals(2012, actualDate.getFullYear());
	}
	
	
});