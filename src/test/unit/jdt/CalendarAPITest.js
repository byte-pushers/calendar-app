function buildWeekdaysBeforeDate(){
	var date = new Date();
	var month = (new Tester()).getInstance(Month);
	var week = month._privates.getWeek(date);
	week;
}

buildWeekdaysBeforeDate();