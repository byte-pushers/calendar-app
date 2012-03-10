


function createStaticWeekForFebruary(){
	var weeks = Array();
	
	weeks[0] = createFebWeek1();
	weeks[1] = createFebWeek2();
	weeks[2] = createFebWeek3();
	weeks[3] = createFebWeek4();
	weeks[4] = createFebWeek5();
	
	return weeks;
}

function createFebWeek1(){
	var week = new Week();
	week.addDay(new Day("Sunday", 29, 1));
	week.addDay(new Day("Monday", 30, 1));
	week.addDay(new Day("Tuesday", 31, 1));
	week.addDay(new Day("Wednesday", 1, 1));
	week.addDay(new Day("Thursday", 2, 1));
	week.addDay(new Day("Friday", 3, 1));
	week.addDay(new Day("Saturday", 4, 1));
	
	return week;
}

function createFebWeek2(){
	var week = new Week();
	week.addDay(new Day("Sunday", 5, 2));
	week.addDay(new Day("Monday", 6, 2));
	week.addDay(new Day("Tuesday", 7, 2));
	week.addDay(new Day("Wednesday", 8, 2));
	week.addDay(new Day("Thursday", 9, 2));
	week.addDay(new Day("Friday", 10, 2));
	week.addDay(new Day("Saturday", 11, 2));
	
	return week;
}

function createFebWeek3(){
	var week = new Week();
	week.addDay(new Day("Sunday", 12, 3));
	week.addDay(new Day("Monday", 13, 3));
	week.addDay(new Day("Tuesday", 14, 3));
	week.addDay(new Day("Wednesday", 15, 3));
	week.addDay(new Day("Thursday", 16, 3));
	week.addDay(new Day("Friday", 17, 3));
	week.addDay(new Day("Saturday", 18, 3));
	
	return week;
}

function createFebWeek4(){
	var week = new Week();
	week.addDay(new Day("Sunday", 19, 4));
	week.addDay(new Day("Monday", 20, 4));
	week.addDay(new Day("Tuesday", 21, 4));
	week.addDay(new Day("Wednesday", 22, 4));
	week.addDay(new Day("Thursday", 23, 4));
	week.addDay(new Day("Friday", 24, 4));
	week.addDay(new Day("Saturday", 25, 4));
	
	return week;
}

function createFebWeek5(){
	var week = new Week();
	week.addDay(new Day("Sunday", 26, 5));
	week.addDay(new Day("Monday", 27, 5));
	week.addDay(new Day("Tuesday", 28, 5));
	week.addDay(new Day("Wednesday", 29, 5));
	week.addDay(new Day("Thursday", 1, 5));
	week.addDay(new Day("Friday", 2, 5));
	week.addDay(new Day("Saturday", 3, 5));
	
	return week;
}