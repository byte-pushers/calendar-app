var monthNames = [{"name": "January", "abbr": "Jan", "getTotalDays": function(year){return 31;}},
                  {"name": "February", "abbr": "Feb", "getTotalDays": function(year){if(year){return (year%4 == 0)?29:28;}else{throw exception("Expected parameter(Year) is not defined.");}}},
                  {"name": "March", "abbr": "Mar", "getTotalDays": function(year){return 31;}},
                  {"name": "April", "abbr": "Apr", "getTotalDays": function(year){return 30;}},
                  {"name": "May", "abbr": "May", "getTotalDays": function(year){return 31;}},
                  {"name": "June", "abbr": "Jun", "getTotalDays": function(year){return 30;}},
                  {"name": "July", "abbr": "Jul", "getTotalDays": function(year){return 31;}},
                  {"name": "August", "abbr": "Aug", "getTotalDays": function(year){return 31;}},
                  {"name": "September", "abbr": "Sept", "getTotalDays": function(year){return 30;}},
                  {"name": "October", "abbr": "Oct", "getTotalDays": function(year){return 31;}},
                  {"name": "November", "abbr": "Nov", "getTotalDays": function(year){return 30;}},
                  {"name": "December", "abbr": "Dec", "getTotalDays": function(year){return 31;}}];

function Day(date, weekIndex){       
	this.date = date;
	this.weekIndex = (weekIndex === undefined)? -1: weekIndex;
	
	this.weekdayNames = [{"name": "Sunday", "abbr": "Sun"},
	                     {"name": "Monday", "abbr": "Mon"},
	                     {"name": "Tuesday", "abbr": "Tue"},
	                     {"name": "Wednesday", "abbr": "Wed"},
	                     {"name": "Thursday", "abbr": "Thu"},
	                     {"name": "Friday", "abbr": "Fri"},
	                     {"name": "Saturday", "abbr": "Sat"}];
	
	this.getWeekDay = function(){
		return this.weekdayNames[this.date.getDay()].name;
	};
	
	this.getWeekDate = function(){
		return this.date.getDate();
	};
	
	this.getDate = function(){
		return this.date;
	};
	
	/*this.toString = function(){
		alert("Day[weekday: " + this.weekday +", day: " + this.day + ", weekIndex: " + this.weekIndex + "]");
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
	this.sunday = (this.weekdays.length >= 1)? this.weekdays[0] : null;
	this.monday = (this.weekdays.length >= 2)? this.weekdays[1] : null;
	this.tuesday = (this.weekdays.length >= 3)? this.weekdays[2] : null;
	this.wednesday = (this.weekdays.length >= 4)? this.weekdays[3] : null;
	this.thursday = (this.weekdays.length >= 5)? this.weekdays[4] : null;
	this.friday = (this.weekdays.length >= 6)? this.weekdays[5] : null;
	this.saturday = (this.weekdays.length >= 7)? this.weekdays[6] : null;
	
	this.isFirstWeekInMonth = function(){
		for(var i = 0; i < this.weekdays.length; i++){
			if(this.weekdays[i].getWeekDate() == 1){
				return true;
			}
		}
		
		return false;
	};
	
	this.isLastWeekInMonth = function(){
		for(var i = 0; i < this.weekdays.length; i++){
			var monthIndex = this.weekdays[i].getDate().getMonth();
			var year = this.weekdays[i].getDate().getFullYear();
			var weekdate = this.weekdays[i].getWeekDate() ;
			var totalDaysInMonth = this.monthNames[monthIndex].getTotalDays(year);
			if(weekdate == totalDaysInMonth){
				return true;
			}
		}
		
		return false;
	};
}

Week.prototype.monthNames = monthNames;
function Month(){
	var that = this;
	this.TOTAL_WEEKDAYS = 7;
	this.weeks = getWeeksInMonth(new Date());
	this.name = getMonthName((new Date()).getMonth(), false);
	
	function getMonthName(monthIndex, getAbbr){
		if(getAbbr) return monthNames[monthIndex].abbr;
		else return monthNames[monthIndex].name;
	};
	
	function getWeek(date){
		var weekdays = new Array();
		
		var weekDaysBefore = getRemainingWeekDaysBefore(new Date(date.getTime()));
		for(var weekday in getRemainingWeekDaysBefore(new Date(date.getTime()))){
			if(weekday !== undefined) weekdays[weekdays.length] = weekDaysBefore[weekday];
		}
		
		weekdays[weekdays.length] = new Day(new Date(date.getTime()));
		
		var weekDaysAfter = getRemainingWeekDaysAfter(new Date(date.getTime()));
		for(var weekday in weekDaysAfter){
			if(weekday !== undefined) weekdays[weekdays.length] = weekDaysAfter[weekday];
		}

		return new Week(weekdays);
	};
	
	function getWeekBefore(date){
		var weekdays = new Array();
		var totalDays = that.TOTAL_WEEKDAYS+date.getDay();
		
		do{
			var d = new Date(date.setDate(date.getDate()-1));
			if(totalDays <= that.TOTAL_WEEKDAYS){
				var weekday = totalDays -1;
				weekdays[weekday] = new Day(d);
			}
		} while(totalDays-- >1);
		return new Week(weekdays);
	};
	
	function getWeekAfter(date){
		var weekdays = new Array();
		var totalDays = (that.TOTAL_WEEKDAYS-1 - date.getDay()) + that.TOTAL_WEEKDAYS;
		
		do{
			var d = new Date(date.setDate(date.getDate()+1));
			if(totalDays <= that.TOTAL_WEEKDAYS){
				var weekday = that.TOTAL_WEEKDAYS - totalDays;
				weekdays[weekday] = new Day(d);
			}
		} while(totalDays-- > 1);
		return new Week(weekdays);
	};
	
	function getRemainingWeekDaysBefore(date){
		var weekdays = new Array();
		var weekday = date.getDay() -1;
		
		do{
			weekdays[weekday] = new Day(new Date(date.setDate(date.getDate()-1)));
		} while(weekday-- >0);
		
		return weekdays;
	};
	
	function getRemainingWeekDaysAfter(date){
		var weekdays = new Array();
		var weekday = date.getDay()+1;
		
		do{
			weekdays[weekday] = new Day(new Date(date.setDate(date.getDate()+1)));
		} while(weekday++ < that.TOTAL_WEEKDAYS-1);
		
		return weekdays;
	};
	
	function getFirstWeekInMonth(someWeekInMonth){
		var firstWeekInMonth = null;
		
		do{
			if(someWeekInMonth.isFirstWeekInMonth()){
				firstWeekInMonth = someWeekInMonth;
			} else {
				someWeekInMonth = getWeekBefore(someWeekInMonth.sunday.getDate());
			}
		} while(firstWeekInMonth == null);
		
		return firstWeekInMonth;
	};
	
	function getWeeksInMonth(date){
		var weeksInMonth = new Array();
		var someWeekInMonth = getWeek(date);
		var firstWeekInMonth = getFirstWeekInMonth(someWeekInMonth);
		
		if(firstWeekInMonth != null){
			 weeksInMonth[0] = firstWeekInMonth;
			 weeksInMonth[1] = getWeekAfter(weeksInMonth[0].saturday.getDate());
			 weeksInMonth[2] = getWeekAfter(weeksInMonth[1].saturday.getDate());
			 weeksInMonth[3] = getWeekAfter(weeksInMonth[2].saturday.getDate());
			 
			 if(!weeksInMonth[3].isLastWeekInMonth()) weeksInMonth[4] = getWeekAfter(weeksInMonth[3].saturday.getDate());
			 if(!weeksInMonth[4].isLastWeekInMonth()) weeksInMonth[5] = getWeekAfter(weeksInMonth[4].saturday.getDate());
		}
		
		return weeksInMonth;
	};
}

Month.prototype.monthNames = monthNames;

Month.prototype.getPreviousMonthTotalDays = function(date){
	if(date.getMonth() == 0){
		return this.monthNames[11].getTotalDays(date.getFullYear());
	} else {
		return this.monthNames[date.getMonth()-1].getTotalDays(date.getFullYear());
	}
	
};

Month.prototype.getNextMonthTotalDays = function(date){
	if(date.getMonth() == 11){
		return this.monthNames[0].getTotalDays(date.getFullYear());
	} else {
		return this.monthNames[date.getMonth()+1].getTotalDays(date.getFullYear());
	}
};


