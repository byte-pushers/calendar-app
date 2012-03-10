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

function Month(){
	this.name = null;
	this.weeks = new Array();
	this.monthNames = [{"name": "January", "abbr": "Jan"},
	                   {"name": "February", "abbr": "Feb"},
	                   {"name": "March", "abbr": "Mar"},
	                   {"name": "April", "abbr": "Apr"},
	                   {"name": "May", "abbr": "May"},
	                   {"name": "June", "abbr": "Jun"},
	                   {"name": "July", "abbr": "Jul"},
	                   {"name": "August", "abbr": "Aug"},
	                   {"name": "September", "abbr": "Sept"},
	                   {"name": "October", "abbr": "Oct"},
	                   {"name": "November", "abbr": "Nov"},
	                   {"name": "December", "abbr": "Dec"}];
	
	this.getMonthName = function(monthIndex, getAbbr){
		if(getAbbr) return this.monthNames[monthIndex].abbr;
		else return this.monthNames[monthIndex].name;
	};
	
	
	
	this.name = this.getMonthName((new Date()).getMonth(), false);
	
}


function getWeeksForCurrentMonth(){
	var currentMonth = new Month();
	return currentMonth.getWeeks();
}