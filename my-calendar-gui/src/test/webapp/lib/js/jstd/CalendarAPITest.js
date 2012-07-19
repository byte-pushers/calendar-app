TestCase("CalendarAPITestCases", {
	testGettingFirstWeekInMonth: function(){
		var date = new Date();
		date.setFullYear(2012, 3, 25);
		var month = (new Tester()).getInstance(Month);
		assertNotUndefined("monthTester should be defined.", month);
		var week = month._privates.getFirstWeekInMonth(month._privates.getWeek(date));
		assertNotUndefined("week should be defined.", week);
		assertEquals(7, week.weekdays.length);
		assertEquals("Sunday", week.weekdays[0].getWeekDay());
		assertEquals(1, week.weekdays[0].getWeekDate());
		assertEquals("Monday", week.weekdays[1].getWeekDay());
		assertEquals(2, week.weekdays[1].getWeekDate());
		assertEquals("Tuesday", week.weekdays[2].getWeekDay());
		assertEquals(3, week.weekdays[2].getWeekDate());
		assertEquals("Wednesday", week.weekdays[3].getWeekDay());
		assertEquals(4, week.weekdays[3].getWeekDate());
		assertEquals("Thursday", week.weekdays[4].getWeekDay());
		assertEquals(5, week.weekdays[4].getWeekDate());
		assertEquals("Friday", week.weekdays[5].getWeekDay());
		assertEquals(6, week.weekdays[5].getWeekDate());
		assertEquals("Saturday", week.weekdays[6].getWeekDay());
		assertEquals(7, week.weekdays[6].getWeekDate());
		
	},
	testGettingWeeksInMonth : function() {
		var date = new Date();
		date.setFullYear(2012, 3, 25);
		var month = (new Tester()).getInstance(Month);
		assertNotUndefined("monthTester should be defined.", month);
		var weeks = month._privates.getWeeksInMonth(date);
		assertNotUndefined("week should be defined.", weeks);
		assertEquals(7, weeks[0].weekdays.length);
		assertEquals("Sunday", weeks[0].weekdays[0].getWeekDay());
		assertEquals(1, weeks[0].weekdays[0].getWeekDate());
		assertEquals("Monday", weeks[0].weekdays[1].getWeekDay());
		assertEquals(2, weeks[0].weekdays[1].getWeekDate());
		assertEquals("Tuesday", weeks[0].weekdays[2].getWeekDay());
		assertEquals(3, weeks[0].weekdays[2].getWeekDate());
		assertEquals("Wednesday", weeks[0].weekdays[3].getWeekDay());
		assertEquals(4, weeks[0].weekdays[3].getWeekDate());
		assertEquals("Thursday", weeks[0].weekdays[4].getWeekDay());
		assertEquals(5, weeks[0].weekdays[4].getWeekDate());
		assertEquals("Friday", weeks[0].weekdays[5].getWeekDay());
		assertEquals(6, weeks[0].weekdays[5].getWeekDate());
		assertEquals("Saturday", weeks[0].weekdays[6].getWeekDay());
		assertEquals(7, weeks[0].weekdays[6].getWeekDate());
		assertEquals("Sunday", weeks[0].weekdays[0].getWeekDay());
		assertEquals(7, weeks[1].weekdays.length);
		assertEquals(8, weeks[1].weekdays[0].getWeekDate());
		assertEquals("Monday", weeks[0].weekdays[1].getWeekDay());
		assertEquals(9, weeks[1].weekdays[1].getWeekDate());
		assertEquals("Tuesday", weeks[0].weekdays[2].getWeekDay());
		assertEquals(10, weeks[1].weekdays[2].getWeekDate());
		assertEquals("Wednesday", weeks[0].weekdays[3].getWeekDay());
		assertEquals(11, weeks[1].weekdays[3].getWeekDate());
		assertEquals("Thursday", weeks[0].weekdays[4].getWeekDay());
		assertEquals(12, weeks[1].weekdays[4].getWeekDate());
		assertEquals("Friday", weeks[0].weekdays[5].getWeekDay());
		assertEquals(13, weeks[1].weekdays[5].getWeekDate());
		assertEquals("Saturday", weeks[0].weekdays[6].getWeekDay());
		assertEquals(14, weeks[1].weekdays[6].getWeekDate());
		assertEquals(7, weeks[2].weekdays.length);
		assertEquals(15, weeks[2].weekdays[0].getWeekDate());
		assertEquals("Monday", weeks[0].weekdays[1].getWeekDay());
		assertEquals(16, weeks[2].weekdays[1].getWeekDate());
		assertEquals("Tuesday", weeks[0].weekdays[2].getWeekDay());
		assertEquals(17, weeks[2].weekdays[2].getWeekDate());
		assertEquals("Wednesday", weeks[0].weekdays[3].getWeekDay());
		assertEquals(18, weeks[2].weekdays[3].getWeekDate());
		assertEquals("Thursday", weeks[0].weekdays[4].getWeekDay());
		assertEquals(19, weeks[2].weekdays[4].getWeekDate());
		assertEquals("Friday", weeks[0].weekdays[5].getWeekDay());
		assertEquals(20, weeks[2].weekdays[5].getWeekDate());
		assertEquals("Saturday", weeks[0].weekdays[6].getWeekDay());
		assertEquals(21, weeks[2].weekdays[6].getWeekDate());
		assertEquals(7, weeks[3].weekdays.length);
		assertEquals(22, weeks[3].weekdays[0].getWeekDate());
		assertEquals("Monday", weeks[0].weekdays[1].getWeekDay());
		assertEquals(23, weeks[3].weekdays[1].getWeekDate());
		assertEquals("Tuesday", weeks[0].weekdays[2].getWeekDay());
		assertEquals(24, weeks[3].weekdays[2].getWeekDate());
		assertEquals("Wednesday", weeks[0].weekdays[3].getWeekDay());
		assertEquals(25, weeks[3].weekdays[3].getWeekDate());
		assertEquals("Thursday", weeks[0].weekdays[4].getWeekDay());
		assertEquals(26, weeks[3].weekdays[4].getWeekDate());
		assertEquals("Friday", weeks[0].weekdays[5].getWeekDay());
		assertEquals(27, weeks[3].weekdays[5].getWeekDate());
		assertEquals("Saturday", weeks[0].weekdays[6].getWeekDay());
		assertEquals(28, weeks[3].weekdays[6].getWeekDate());
		assertEquals(7, weeks[4].weekdays.length);
		assertEquals(29, weeks[4].weekdays[0].getWeekDate());
		assertEquals("Monday", weeks[0].weekdays[1].getWeekDay());
		assertEquals(30, weeks[4].weekdays[1].getWeekDate());
		assertEquals("Tuesday", weeks[0].weekdays[2].getWeekDay());
		assertEquals(1, weeks[4].weekdays[2].getWeekDate());
		assertEquals("Wednesday", weeks[0].weekdays[3].getWeekDay());
		assertEquals(2, weeks[4].weekdays[3].getWeekDate());
		assertEquals("Thursday", weeks[0].weekdays[4].getWeekDay());
		assertEquals(3, weeks[4].weekdays[4].getWeekDate());
		assertEquals("Friday", weeks[0].weekdays[5].getWeekDay());
		assertEquals(4, weeks[4].weekdays[5].getWeekDate());
		assertEquals("Saturday", weeks[0].weekdays[6].getWeekDay());
		assertEquals(5, weeks[4].weekdays[6].getWeekDate());
	},
	testGettingWeekDaysRemainingInWeekBeforeFeb15_2012 : function() {
		var feb20120215 = new Date();
		feb20120215.setFullYear(2012, 1, 15);
		var month = (new Tester()).getInstance(Month);
		assertNotUndefined("monthTester should be defined.", month);
		var weekdays = month._privates.getRemainingWeekDaysBefore(feb20120215);
		assertNotUndefined("weekdays should be defined.", weekdays);
		assertEquals(3, weekdays.length);
		assertEquals("Sunday", weekdays[0].getWeekDay());
		assertEquals(12, weekdays[0].getWeekDate());
		assertEquals("Monday", weekdays[1].getWeekDay());
		assertEquals(13, weekdays[1].getWeekDate());
		assertEquals("Tuesday", weekdays[2].getWeekDay());
		assertEquals(14, weekdays[2].getWeekDate());
	},
	testGettingWeekDaysRemainingInWeekAfterFeb15_2012 : function(){
		var feb20120215 = new Date();
		feb20120215.setFullYear(2012, 1, 15);
		var month = (new Tester()).getInstance(Month);
		assertNotUndefined("month should be defined.", month);
		var weekdays = month._privates.getRemainingWeekDaysAfter(feb20120215);
		assertNotUndefined("weekdays should be defined.", weekdays);
		assertEquals(7, weekdays.length);
		assertEquals("Thursday", weekdays[4].getWeekDay());
		assertEquals(16, weekdays[4].getWeekDate());
		assertEquals("Friday", weekdays[5].getWeekDay());
		assertEquals(17, weekdays[5].getWeekDate());
		assertEquals("Saturday", weekdays[6].getWeekDay());
		assertEquals(18, weekdays[6].getWeekDate());
	},
	testGettingWeekBeforeFeb19_2012 : function(){
		var feb20120219 = new Date();
		feb20120219.setFullYear(2012, 1, 19);
		var month = (new Tester()).getInstance(Month);
		assertNotUndefined("month should be defined.", month);
		var week = month._privates.getWeekBefore(feb20120219);
		assertNotUndefined("week should be defined.", week);
		assertEquals(7, week.weekdays.length);
		assertEquals("Sunday", week.weekdays[0].getWeekDay());
		assertEquals(12, week.weekdays[0].getWeekDate());
		assertEquals("Monday", week.weekdays[1].getWeekDay());
		assertEquals(13, week.weekdays[1].getWeekDate());
		assertEquals("Tuesday", week.weekdays[2].getWeekDay());
		assertEquals(14, week.weekdays[2].getWeekDate());
		assertEquals("Wednesday", week.weekdays[3].getWeekDay());
		assertEquals(15, week.weekdays[3].getWeekDate());
		assertEquals("Thursday", week.weekdays[4].getWeekDay());
		assertEquals(16, week.weekdays[4].getWeekDate());
		assertEquals("Friday", week.weekdays[5].getWeekDay());
		assertEquals(17, week.weekdays[5].getWeekDate());
		assertEquals("Saturday", week.weekdays[6].getWeekDay());
		assertEquals(18, week.weekdays[6].getWeekDate());
	},
	testGettingWeekAfterFeb19_2012 : function(){
		var feb20120219 = new Date();
		feb20120219.setFullYear(2012, 1, 19);
		var month = (new Tester()).getInstance(Month);
		assertNotUndefined("month should be defined.", month);
		var week = month._privates.getWeekAfter(feb20120219);
		assertNotUndefined("week should be defined.", week);
		assertEquals(7, week.weekdays.length);
		assertEquals("Sunday", week.weekdays[0].getWeekDay());
		assertEquals(26, week.weekdays[0].getWeekDate());
		assertEquals("Monday", week.weekdays[1].getWeekDay());
		assertEquals(27, week.weekdays[1].getWeekDate());
		assertEquals("Tuesday", week.weekdays[2].getWeekDay());
		assertEquals(28, week.weekdays[2].getWeekDate());
		assertEquals("Wednesday", week.weekdays[3].getWeekDay());
		assertEquals(29, week.weekdays[3].getWeekDate());
		assertEquals("Thursday", week.weekdays[4].getWeekDay());
		assertEquals(1, week.weekdays[4].getWeekDate());
		assertEquals("Friday", week.weekdays[5].getWeekDay());
		assertEquals(2, week.weekdays[5].getWeekDate());
		assertEquals("Saturday", week.weekdays[6].getWeekDay());
		assertEquals(3, week.weekdays[6].getWeekDate());
	},
	testGettingWeekDaysRemainingInWeekAfterFeb27_2012 : function(){
		var feb20120227 = new Date();
		feb20120227.setFullYear(2012, 1, 27);
		var month = (new Tester()).getInstance(Month);
		assertNotUndefined("month should be defined.", month);
		var weekdays = month._privates.getRemainingWeekDaysAfter(feb20120227);
		assertNotUndefined("weekdays should be defined.", weekdays);
		assertEquals(7, weekdays.length);
		assertEquals("Tuesday", weekdays[2].getWeekDay());
		assertEquals(28, weekdays[2].getWeekDate());
		assertEquals("Wednesday", weekdays[3].getWeekDay());
		assertEquals(29, weekdays[3].getWeekDate());
		assertEquals("Thursday", weekdays[4].getWeekDay());
		assertEquals(1, weekdays[4].getWeekDate());
		assertEquals("Friday", weekdays[5].getWeekDay());
		assertEquals(2, weekdays[5].getWeekDate());
		assertEquals("Saturday", weekdays[6].getWeekDay());
		assertEquals(3, weekdays[6].getWeekDate());
	},
	testGettingWeekDaysRemainingInWeekBeforeFeb1_2012 : function(){
		var feb20120201 = new Date();
		feb20120201.setFullYear(2012, 1, 1);
		var month = (new Tester()).getInstance(Month);
		assertNotUndefined("month should be defined.", month);
		var weekdays = month._privates.getRemainingWeekDaysBefore(feb20120201);
		assertNotUndefined("weekdays should be defined.", weekdays);
		assertEquals("Sunday", weekdays[0].getWeekDay());
		assertEquals(29, weekdays[0].getWeekDate());
		assertEquals("Monday", weekdays[1].getWeekDay());
		assertEquals(30, weekdays[1].getWeekDate());
		assertEquals("Tuesday", weekdays[2].getWeekDay());
		assertEquals(31, weekdays[2].getWeekDate());
	},
	testGettingWeekBeforeFeb1_2012 : function(){
		var feb20120201 = new Date();
		feb20120201.setFullYear(2012, 1, 1);
		var month = (new Tester()).getInstance(Month);
		assertNotUndefined("month should be defined.", month);
		var week = month._privates.getWeekBefore(feb20120201);
		assertNotUndefined("week should be defined.", week);
		assertEquals(7, week.weekdays.length);
		assertEquals("Sunday", week.weekdays[0].getWeekDay());
		assertEquals(22, week.weekdays[0].getWeekDate());
		assertEquals("Monday", week.weekdays[1].getWeekDay());
		assertEquals(23, week.weekdays[1].getWeekDate());
		assertEquals("Tuesday", week.weekdays[2].getWeekDay());
		assertEquals(24, week.weekdays[2].getWeekDate());
		assertEquals("Wednesday", week.weekdays[3].getWeekDay());
		assertEquals(25, week.weekdays[3].getWeekDate());
		assertEquals("Thursday", week.weekdays[4].getWeekDay());
		assertEquals(26, week.weekdays[4].getWeekDate());
		assertEquals("Friday", week.weekdays[5].getWeekDay());
		assertEquals(27, week.weekdays[5].getWeekDate());
		assertEquals("Saturday", week.weekdays[6].getWeekDay());
		assertEquals(28, week.weekdays[6].getWeekDate());
	},
	testGettingWeekAfterFeb1_2012 : function(){
		var feb20120201 = new Date();
		feb20120201.setFullYear(2012, 1, 1);
		var month = (new Tester()).getInstance(Month);
		assertNotUndefined("month should be defined.", month);
		var week = month._privates.getWeekAfter(feb20120201);
		assertNotUndefined("week should be defined.", week);
		assertEquals(7, week.weekdays.length);
		assertEquals("Sunday", week.weekdays[0].getWeekDay());
		assertEquals(5, week.weekdays[0].getWeekDate());
		assertEquals("Monday", week.weekdays[1].getWeekDay());
		assertEquals(6, week.weekdays[1].getWeekDate());
		assertEquals("Tuesday", week.weekdays[2].getWeekDay());
		assertEquals(7, week.weekdays[2].getWeekDate());
		assertEquals("Wednesday", week.weekdays[3].getWeekDay());
		assertEquals(8, week.weekdays[3].getWeekDate());
		assertEquals("Thursday", week.weekdays[4].getWeekDay());
		assertEquals(9, week.weekdays[4].getWeekDate());
		assertEquals("Friday", week.weekdays[5].getWeekDay());
		assertEquals(10, week.weekdays[5].getWeekDate());
		assertEquals("Saturday", week.weekdays[6].getWeekDay());
		assertEquals(11, week.weekdays[6].getWeekDate());
	},
	testGettingWeekOfFeb1_2012: function(){
		var feb20120201 = new Date();
		feb20120201.setFullYear(2012, 1, 1);
		var month = (new Tester()).getInstance(Month);
		assertNotUndefined("month should be defined.", month);
		var week = month._privates.getWeek(feb20120201);
		assertNotUndefined("week should be defined.", week);
		assertEquals(7, week.weekdays.length);
		assertEquals("Sunday", week.sunday.getWeekDay());
		assertEquals(29, week.sunday.getWeekDate());
		assertEquals("Monday", week.monday.getWeekDay());
		assertEquals(30, week.monday.getWeekDate());
		assertEquals("Tuesday", week.tuesday.getWeekDay());
		assertEquals(31, week.tuesday.getWeekDate());
		assertEquals("Wednesday", week.wednesday.getWeekDay());
		assertEquals(1, week.wednesday.getWeekDate());
		assertEquals("Thursday", week.thursday.getWeekDay());
		assertEquals(2, week.thursday.getWeekDate());
		assertEquals("Friday", week.friday.getWeekDay());
		assertEquals(3, week.friday.getWeekDate());
		assertEquals("Saturday", week.saturday.getWeekDay());
		assertEquals(4, week.saturday.getWeekDate());
	},
	testGettingWeekOfFeb29_2012 : function(){
		var feb20120229 = new Date();
		feb20120229.setFullYear(2012, 1, 29);
		var month = (new Tester()).getInstance(Month);
		assertNotUndefined("month should be defined.", month);
		var week = month._privates.getWeek(feb20120229);
		assertNotUndefined("week should be defined.", week);
		assertEquals(7, week.weekdays.length);
		assertEquals("Sunday", week.sunday.getWeekDay());
		assertEquals(26, week.sunday.getWeekDate());
		assertEquals("Monday", week.monday.getWeekDay());
		assertEquals(27, week.monday.getWeekDate());
		assertEquals("Tuesday", week.tuesday.getWeekDay());
		assertEquals(28, week.tuesday.getWeekDate());
		assertEquals("Wednesday", week.wednesday.getWeekDay());
		assertEquals(29, week.wednesday.getWeekDate());
		assertEquals("Thursday", week.thursday.getWeekDay());
		assertEquals(1, week.thursday.getWeekDate());
		assertEquals("Friday", week.friday.getWeekDay());
		assertEquals(2, week.friday.getWeekDate());
		assertEquals("Saturday", week.saturday.getWeekDay());
		assertEquals(3, week.saturday.getWeekDate());
	},
	testGettingPreviousMonthsTotalDaysWhenCurrentMonthFeb2012: function(){
		var feb20120201 = new Date();
		feb20120201.setFullYear(2012, 1, 1);
		
		assertEquals(1, feb20120201.getMonth());
		var maxDay = (new Month()).getPreviousMonthTotalDays(feb20120201);
		assertNotUndefined("MaxDay should be defined.", maxDay);
		assertEquals(31, maxDay);
	},
	testGettingTotalDaysInFeb2012: function(){
		var month = new Month();
		assertNotUndefined("month should be defined.", month);
		var maxDay = (new Month()).monthNames[1].getTotalDays(2012);
		assertNotUndefined("MaxDay should be defined.", maxDay);
		assertEquals(29, maxDay);
	},
	testGettingPreviousMonthsTotalDaysWhenCurrentMonthIsMarch2012: function(){
		var mar20120301 = new Date();
		mar20120301.setFullYear(2012, 2, 1);
		assertEquals(2, mar20120301.getMonth());
		var maxDay = (new Month()).getPreviousMonthTotalDays(mar20120301);
		assertNotUndefined("MaxDay should be defined.", maxDay);
		assertEquals(29, maxDay);
	},
	testThatWhenSubtractingOneDayFromJan1_2012ResultsInDec31_2011: function(){
		var date = new Date();
		date.setFullYear(2012, 0, 1);
		date.setDate(date.getDate()-1);
		assertEquals(11, date.getMonth());
		assertEquals(31, date.getDate());
		
		assertEquals(2011, (date.getFullYear()));
	},
	testThatFirstWeekInJan2012IsFromSun1stToSat7th: function(){
		var date = new Date();
		date.setFullYear(2012, 0, 7);
		
		var month = (new Tester()).getInstance(Month);
		assertNotUndefined("month should be defined.", month);
		
		var week =  month._privates.getWeek(date);
		assertNotUndefined("week should be defined.", week);
		assertEquals("Sunday", week.sunday.getWeekDay());
		assertEquals(1, week.sunday.getWeekDate());
		assertEquals("Monday", week.monday.getWeekDay());
		assertEquals(2, week.monday.getWeekDate());
		assertEquals("Tuesday", week.tuesday.getWeekDay());
		assertEquals(3, week.tuesday.getWeekDate());
		assertEquals("Wednesday", week.wednesday.getWeekDay());
		assertEquals(4, week.wednesday.getWeekDate());
		assertEquals("Thursday", week.thursday.getWeekDay());
		assertEquals(5, week.thursday.getWeekDate());
		assertEquals("Friday", week.friday.getWeekDay());
		assertEquals(6, week.friday.getWeekDate());
		assertEquals("Saturday", week.saturday.getWeekDay());
		assertEquals(7, week.saturday.getWeekDate());
	},
	testThatLastWeekInJan2012IsFromSun29thToSat4th: function(){
		var date = new Date();
		date.setFullYear(2012, 1, 3);
		
		var month = (new Tester()).getInstance(Month);
		assertNotUndefined("month should be defined.", month);
		
		var week = month._privates.getWeek(date);
		assertNotUndefined("week should be defined.", week);
		assertEquals("Sunday", week.sunday.getWeekDay());
		assertEquals(29, week.sunday.getWeekDate());
		assertEquals("Monday", week.monday.getWeekDay());
		assertEquals(30, week.monday.getWeekDate());
		assertEquals("Tuesday", week.tuesday.getWeekDay());
		assertEquals(31, week.tuesday.getWeekDate());
		assertEquals("Wednesday", week.wednesday.getWeekDay());
		assertEquals(1, week.wednesday.getWeekDate());
		assertEquals("Thursday", week.thursday.getWeekDay());
		assertEquals(2, week.thursday.getWeekDate());
		assertEquals("Friday", week.friday.getWeekDay());
		assertEquals(3, week.friday.getWeekDate());
		assertEquals("Saturday", week.saturday.getWeekDay());
		assertEquals(4, week.saturday.getWeekDate());
	},
	testSettingEventToCalendar: function(){
		var event = new Event();
		event.setSummary("Aisha's Graduation");
		event.setStart(new Date());
		event.setEnd(new Date());
		
		var month = new Month();
		month.setEvents([event]);
		
		assertEquals(1, month.getEvents().length);
		assertEquals(event, month.getEvents()[0]);
	}
});