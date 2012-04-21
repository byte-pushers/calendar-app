TestCase("CalendarAPITestCase", {
	getWeekDaysRemainingInWeekBefore20120215Test : function() {
		var feb20120215 = new Date();
		feb20120215.setFullYear(2012, 1, 15);
		var monthTester = (new Tester()).getInstance(Month);
		assertNotUndefined("monthTester should be defined.", monthTester);
		var remainingWeekDays = monthTester._privates.getRemainingWeekDaysBefore(feb20120215);
		assertNotUndefined("remainingWeekDays should be defined.", remainingWeekDays);
		expect(remainingWeekDays.length).toEqual(3);
		assertEquals(remainingWeekDays[0].getWeekDay(), "Sunday");
		assertEquals(remainingWeekDays[0].getWeekDate(), 12);
		assertEquals(remainingWeekDays[1].getWeekDay(), "Monday");
		assertEquals(remainingWeekDays[1].getWeekDate(), 13);
		assertEquals(remainingWeekDays[2].getWeekDay(), "Tuesday");
		assertEquals(remainingWeekDays[2].getWeekDate(), 14);
	}
});