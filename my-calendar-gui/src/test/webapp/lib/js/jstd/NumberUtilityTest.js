TestCase("NumberUtilityTestCases", {
	testPadLeft: function(){
		var day = 1;
		day = NoesisCode.NumberUtility.padLeft(day, 2);
		assertEquals("01", day);
	}
});