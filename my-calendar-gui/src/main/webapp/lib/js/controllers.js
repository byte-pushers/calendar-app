/* App Controllers */
function Day(day, value, weekIndex){
	this.name = day;
	this.weekday = value;
	this.weekIndex = weekIndex;
	
	/*this.toString = function(){
		alert("Day[name: " + this.name +", day: " + this.day + ", weekIndex: " + this.weekIndex + "]");
	};*/
}


function print(obj){
	var str = "";
	for(prop in obj){
		
		str+=prop +" value :"+ obj[prop]+"\n";//Concate prop and its value from object
	}
	return str;
}

function Week(weekdays){
	this.weekdays = (weekdays === undefined)? new Array(): weekdays;

	this.sunday = null;
	this.monday = null;
	this.tuesday = null;
	this.wednesday = null;
	this.thursday = null;
	this.friday = null;
	this.saturday = null;
	
	this.addDay = function (day){
		this.weekdays[this.weekdays.length] = day;
		
		if(day.name == "Sunday"){
			this.sunday = day;
		} else if(day.name == "Monday"){
			this.monday = day;
		} else if(day.name == "Tuesday"){
			this.tuesday = day;
		} else if(day.name == "Wednesday"){
			this.wednesday = day;
		} else if(day.name == "Thursday"){
			this.thursday = day;
		} else if(day.name == "Friday"){
			this.friday = day;
		} else if(day.name == "Saturday"){
			this.saturday = day;
		}
	};
	
	this.getDate = function(day){
		for(var i = 0; i < this.weekdays.length; i++){
			if(this.weekdays[i].name == day){
				return this.weekdays[i].weekday;
			};
		};
	};
}

function CalendarCtrl() {
	this.weeks = createStaticWeekForFebruary();
	//this.weeks = [{"sunday": "29", "monday": "30", "tuesday": "31", "wednesday": "1", "thursday": "2", "friday": "3", "saturday":"4"}];
}



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