describe("MyCalendar API", function(){
	it("Get days remaining in the week before Feb. 15, 2012.", function(){
		var feb20120215 = new Date();
		feb20120215.setFullYear(2012, 1, 15);
		var monthTester = (new Tester()).getInstance(Month);
		expect(monthTester).toBeDefined();
		var remainingWeekDays = monthTester._privates.getRemainingWeekDaysBefore(feb20120215);
		expect(remainingWeekDays).toBeDefined();
		expect(remainingWeekDays.length).toEqual(3);
		expect(remainingWeekDays[0].getWeekDay()).toEqual("Sunday");
		expect(remainingWeekDays[0].getWeekDate()).toEqual(12);
		expect(remainingWeekDays[1].getWeekDay()).toEqual("Monday");
		expect(remainingWeekDays[1].getWeekDate()).toEqual(13);
		expect(remainingWeekDays[2].getWeekDay()).toEqual("Tuesday");
		expect(remainingWeekDays[2].getWeekDate()).toEqual(14);
	});
	
	it("Get days remaining in the week after Feb. 15, 2012.", function(){
		var feb20120215 = new Date();
		feb20120215.setFullYear(2012, 1, 15);
		var monthTester = (new Tester()).getInstance(Month);
		expect(monthTester).toBeDefined();
		var remainingWeekDays = monthTester._privates.getRemainingWeekDaysAfter(feb20120215);
		expect(remainingWeekDays).toBeDefined();
		expect(remainingWeekDays.length).toEqual(7);
		expect(remainingWeekDays[4].getWeekDay()).toEqual("Thursday");
		expect(remainingWeekDays[4].getWeekDate()).toEqual(16);
		expect(remainingWeekDays[5].getWeekDay()).toEqual("Friday");
		expect(remainingWeekDays[5].getWeekDate()).toEqual(17);
		expect(remainingWeekDays[6].getWeekDay()).toEqual("Saturday");
		expect(remainingWeekDays[6].getWeekDate()).toEqual(18);
	});

	it("Get week before Feb. 19, 2012.", function(){
		var feb20120219 = new Date();
		feb20120219.setFullYear(2012, 1, 19);
		var monthTester = (new Tester()).getInstance(Month);
		expect(monthTester).toBeDefined();
		var week = monthTester._privates.getWeekBefore(feb20120219);
		expect(week).toBeDefined();
		expect(week.weekdays.length).toEqual(7);
		expect(week.weekdays[0].getWeekDay()).toEqual("Sunday");
		expect(week.weekdays[0].getWeekDate()).toEqual(12);
		expect(week.weekdays[1].getWeekDay()).toEqual("Monday");
		expect(week.weekdays[1].getWeekDate()).toEqual(13);
		expect(week.weekdays[2].getWeekDay()).toEqual("Tuesday");
		expect(week.weekdays[2].getWeekDate()).toEqual(14);
		expect(week.weekdays[3].getWeekDay()).toEqual("Wednesday");
		expect(week.weekdays[3].getWeekDate()).toEqual(15);
		expect(week.weekdays[4].getWeekDay()).toEqual("Thursday");
		expect(week.weekdays[4].getWeekDate()).toEqual(16);
		expect(week.weekdays[5].getWeekDay()).toEqual("Friday");
		expect(week.weekdays[5].getWeekDate()).toEqual(17);
		expect(week.weekdays[6].getWeekDay()).toEqual("Saturday");
		expect(week.weekdays[6].getWeekDate()).toEqual(18);
	});
	
	it("Get week after Feb. 19, 2012.", function(){
		var feb20120219 = new Date();
		feb20120219.setFullYear(2012, 1, 19);
		var monthTester = (new Tester()).getInstance(Month);
		expect(monthTester).toBeDefined();
		var week = monthTester._privates.getWeekAfter(feb20120219);
		expect(week).toBeDefined();
		expect(week.weekdays.length).toEqual(7);
		expect(week.weekdays[0].getWeekDay()).toEqual("Sunday");
		expect(week.weekdays[0].getWeekDate()).toEqual(26);
		expect(week.weekdays[1].getWeekDay()).toEqual("Monday");
		expect(week.weekdays[1].getWeekDate()).toEqual(27);
		expect(week.weekdays[2].getWeekDay()).toEqual("Tuesday");
		expect(week.weekdays[2].getWeekDate()).toEqual(28);
		expect(week.weekdays[3].getWeekDay()).toEqual("Wednesday");
		expect(week.weekdays[3].getWeekDate()).toEqual(29);
		expect(week.weekdays[4].getWeekDay()).toEqual("Thursday");
		expect(week.weekdays[4].getWeekDate()).toEqual(1);
		expect(week.weekdays[5].getWeekDay()).toEqual("Friday");
		expect(week.weekdays[5].getWeekDate()).toEqual(2);
		expect(week.weekdays[6].getWeekDay()).toEqual("Saturday");
		expect(week.weekdays[6].getWeekDate()).toEqual(3);
	});
	
	it("Get days remaining in the week after Feb. 27, 2012.", function(){
		var feb20120227 = new Date();
		feb20120227.setFullYear(2012, 1, 27);
		var monthTester = (new Tester()).getInstance(Month);
		expect(monthTester).toBeDefined();
		var remainingWeekDays = monthTester._privates.getRemainingWeekDaysAfter(feb20120227);
		expect(remainingWeekDays).toBeDefined();
		expect(remainingWeekDays.length).toEqual(7);
		expect(remainingWeekDays[2].getWeekDay()).toEqual("Tuesday");
		expect(remainingWeekDays[2].getWeekDate()).toEqual(28);
		expect(remainingWeekDays[3].getWeekDay()).toEqual("Wednesday");
		expect(remainingWeekDays[3].getWeekDate()).toEqual(29);
		expect(remainingWeekDays[4].getWeekDay()).toEqual("Thursday");
		expect(remainingWeekDays[4].getWeekDate()).toEqual(1);
		expect(remainingWeekDays[5].getWeekDay()).toEqual("Friday");
		expect(remainingWeekDays[5].getWeekDate()).toEqual(2);
		expect(remainingWeekDays[6].getWeekDay()).toEqual("Saturday");
		expect(remainingWeekDays[6].getWeekDate()).toEqual(3);
	});
	
	it("Get days remaining in the week before Feb. 1, 2012.", function(){
		var feb20120201 = new Date();
		feb20120201.setFullYear(2012, 1, 1);
		var monthTester = (new Tester()).getInstance(Month);
		expect(monthTester).toBeDefined();
		var remainingWeekDays = monthTester._privates.getRemainingWeekDaysBefore(feb20120201);
		expect(remainingWeekDays).toBeDefined();
		expect(remainingWeekDays.length).toEqual(3);
		expect(remainingWeekDays[0].getWeekDay()).toEqual("Sunday");
		expect(remainingWeekDays[0].getWeekDate()).toEqual(29);
		expect(remainingWeekDays[1].getWeekDay()).toEqual("Monday");
		expect(remainingWeekDays[1].getWeekDate()).toEqual(30);
		expect(remainingWeekDays[2].getWeekDay()).toEqual("Tuesday");
		expect(remainingWeekDays[2].getWeekDate()).toEqual(31);
	});
	
	it("Get week before Feb. 1, 2012.", function(){
		var feb20120201 = new Date();
		feb20120201.setFullYear(2012, 1, 1);
		var monthTester = (new Tester()).getInstance(Month);
		expect(monthTester).toBeDefined();
		var week = monthTester._privates.getWeekBefore(feb20120201);
		expect(week).toBeDefined();
		expect(week.weekdays.length).toEqual(7);
		expect(week.weekdays[0].getWeekDay()).toEqual("Sunday");
		expect(week.weekdays[0].getWeekDate()).toEqual(22);
		expect(week.weekdays[1].getWeekDay()).toEqual("Monday");
		expect(week.weekdays[1].getWeekDate()).toEqual(23);
		expect(week.weekdays[2].getWeekDay()).toEqual("Tuesday");
		expect(week.weekdays[2].getWeekDate()).toEqual(24);
		expect(week.weekdays[3].getWeekDay()).toEqual("Wednesday");
		expect(week.weekdays[3].getWeekDate()).toEqual(25);
		expect(week.weekdays[4].getWeekDay()).toEqual("Thursday");
		expect(week.weekdays[4].getWeekDate()).toEqual(26);
		expect(week.weekdays[5].getWeekDay()).toEqual("Friday");
		expect(week.weekdays[5].getWeekDate()).toEqual(27);
		expect(week.weekdays[6].getWeekDay()).toEqual("Saturday");
		expect(week.weekdays[6].getWeekDate()).toEqual(28);
	});
	
	it("Get week after Feb. 1, 2012.", function(){
		var feb20120201 = new Date();
		feb20120201.setFullYear(2012, 1, 1);
		var monthTester = (new Tester()).getInstance(Month);
		expect(monthTester).toBeDefined();
		var week = monthTester._privates.getWeekAfter(feb20120201);
		expect(week).toBeDefined();
		expect(week.weekdays.length).toEqual(7);
		expect(week.weekdays[0].getWeekDay()).toEqual("Sunday");
		expect(week.weekdays[0].getWeekDate()).toEqual(5);
		expect(week.weekdays[1].getWeekDay()).toEqual("Monday");
		expect(week.weekdays[1].getWeekDate()).toEqual(6);
		expect(week.weekdays[2].getWeekDay()).toEqual("Tuesday");
		expect(week.weekdays[2].getWeekDate()).toEqual(7);
		expect(week.weekdays[3].getWeekDay()).toEqual("Wednesday");
		expect(week.weekdays[3].getWeekDate()).toEqual(8);
		expect(week.weekdays[4].getWeekDay()).toEqual("Thursday");
		expect(week.weekdays[4].getWeekDate()).toEqual(9);
		expect(week.weekdays[5].getWeekDay()).toEqual("Friday");
		expect(week.weekdays[5].getWeekDate()).toEqual(10);
		expect(week.weekdays[6].getWeekDay()).toEqual("Saturday");
		expect(week.weekdays[6].getWeekDate()).toEqual(11);
	});
	
	it("Get week of Feb. 1, 2012.", function(){
		var feb20120201 = new Date();
		feb20120201.setFullYear(2012, 1, 1);
		var monthTester = (new Tester()).getInstance(Month);
		expect(monthTester).toBeDefined();
		var week = monthTester._privates.getWeek(feb20120201);
		expect(week).toBeDefined();
		expect(week.sunday.getWeekDay()).toEqual("Sunday");
		expect(week.sunday.getWeekDate()).toEqual(29);
		expect(week.monday.getWeekDay()).toEqual("Monday");
		expect(week.monday.getWeekDate()).toEqual(30);
		expect(week.tuesday.getWeekDay()).toEqual("Tuesday");
		expect(week.tuesday.getWeekDate()).toEqual(31);
		expect(week.wednesday.getWeekDay()).toEqual("Wednesday");
		expect(week.wednesday.getWeekDate()).toEqual(1);
		expect(week.thursday.getWeekDay()).toEqual("Thursday");
		expect(week.thursday.getWeekDate()).toEqual(2);
		expect(week.friday.getWeekDay()).toEqual("Friday");
		expect(week.friday.getWeekDate()).toEqual(3);
		expect(week.saturday.getWeekDay()).toEqual("Saturday");
		expect(week.saturday.getWeekDate()).toEqual(4);
	});
	
	it("Get week of Feb. 29, 2012.", function(){
		var feb20120229 = new Date();
		feb20120229.setFullYear(2012, 1, 29);
		var monthTester = (new Tester()).getInstance(Month);
		expect(monthTester).toBeDefined();
		var week = monthTester._privates.getWeek(feb20120229);
		expect(week).toBeDefined();
		expect(week.sunday.getWeekDay()).toEqual("Sunday");
		expect(week.sunday.getWeekDate()).toEqual(26);
		expect(week.monday.getWeekDay()).toEqual("Monday");
		expect(week.monday.getWeekDate()).toEqual(27);
		expect(week.tuesday.getWeekDay()).toEqual("Tuesday");
		expect(week.tuesday.getWeekDate()).toEqual(28);
		expect(week.wednesday.getWeekDay()).toEqual("Wednesday");
		expect(week.wednesday.getWeekDate()).toEqual(29);
		expect(week.thursday.getWeekDay()).toEqual("Thursday");
		expect(week.thursday.getWeekDate()).toEqual(1);
		expect(week.friday.getWeekDay()).toEqual("Friday");
		expect(week.friday.getWeekDate()).toEqual(2);
		expect(week.saturday.getWeekDay()).toEqual("Saturday");
		expect(week.saturday.getWeekDate()).toEqual(3);
	});
	
	it("Get previous months total days, when current month is February 2012.", function(){
		var feb20120201 = new Date();
		feb20120201.setFullYear(2012, 1, 1);
		
		expect(feb20120201.getMonth()).toEqual(1);
		var maxDay = (new Month()).getPreviousMonthTotalDays(feb20120201);
		expect(maxDay).toBeDefined();
		expect(maxDay).toEqual(31);
	});
	
	it("Get total days in February 2012.", function(){
		var month = new Month();
		expect(month).toBeDefined();
		var maxDay = (new Month()).monthNames[1].getTotalDays(2012);
		expect(maxDay).toBeDefined();
		expect(maxDay).toEqual(29);
	});
	
	it("Get previous months total days, when current month is March 2012.", function(){
		var mar20120301 = new Date();
		mar20120301.setFullYear(2012, 2, 1);
		expect(mar20120301.getMonth()).toEqual(2);
		var maxDay = (new Month()).getPreviousMonthTotalDays(mar20120301);
		expect(maxDay).toBeDefined();
		expect(maxDay).toEqual(29);
	});
	
	it("Verify that subtracting one day from Jan 1, 2011 results in Dec 31, 2010.", function(){
		//var oneDayInMillisonds = 1000 * 60 *60 * 24;
		var date = new Date();
		date.setFullYear(2012, 0, 1);
		date.setDate(date.getDate()-1);
		expect(date.getMonth()).toEqual(11);
		expect(date.getDate()).toEqual(31);
		
		expect(date.getFullYear()).toEqual(2011);
	});
	
	it("Verify that the first week in Jan 2012 is from Sun. 1st to Sat. 7th.", function(){
		var date = new Date();
		date.setFullYear(2012, 0, 7);
		
		var monthTester = (new Tester()).getInstance(Month);
		expect(monthTester).toBeDefined();
		
		var week = monthTester._privates.getWeek(date);
		expect(week).toBeDefined();
		expect(week.sunday.getWeekDay()).toEqual("Sunday");
		expect(week.sunday.getWeekDate()).toEqual(1);
		expect(week.monday.getWeekDay()).toEqual("Monday");
		expect(week.monday.getWeekDate()).toEqual(2);
		expect(week.tuesday.getWeekDay()).toEqual("Tuesday");
		expect(week.tuesday.getWeekDate()).toEqual(3);
		expect(week.wednesday.getWeekDay()).toEqual("Wednesday");
		expect(week.wednesday.getWeekDate()).toEqual(4);
		expect(week.thursday.getWeekDay()).toEqual("Thursday");
		expect(week.thursday.getWeekDate()).toEqual(5);
		expect(week.friday.getWeekDay()).toEqual("Friday");
		expect(week.friday.getWeekDate()).toEqual(6);
		expect(week.saturday.getWeekDay()).toEqual("Saturday");
		expect(week.saturday.getWeekDate()).toEqual(7);
	});
	
	it("Verify that the last week in Jan 2012 is from Sun. 29th to Sat. 4th.", function(){
		var date = new Date();
		date.setFullYear(2012, 1, 3);
		
		var monthTester = (new Tester()).getInstance(Month);
		expect(monthTester).toBeDefined();
		
		var week = monthTester._privates.getWeek(date);
		expect(week).toBeDefined();
		expect(week.sunday.getWeekDay()).toEqual("Sunday");
		expect(week.sunday.getWeekDate()).toEqual(29);
		expect(week.monday.getWeekDay()).toEqual("Monday");
		expect(week.monday.getWeekDate()).toEqual(30);
		expect(week.tuesday.getWeekDay()).toEqual("Tuesday");
		expect(week.tuesday.getWeekDate()).toEqual(31);
		expect(week.wednesday.getWeekDay()).toEqual("Wednesday");
		expect(week.wednesday.getWeekDate()).toEqual(1);
		expect(week.thursday.getWeekDay()).toEqual("Thursday");
		expect(week.thursday.getWeekDate()).toEqual(2);
		expect(week.friday.getWeekDay()).toEqual("Friday");
		expect(week.friday.getWeekDate()).toEqual(3);
		expect(week.saturday.getWeekDay()).toEqual("Saturday");
		expect(week.saturday.getWeekDate()).toEqual(4);
	});
});