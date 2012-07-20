/*global Month, Event*/
function getTestEvents() {
	"use strict";
	var event = new Event(), month;
	event.setSummary("Aisha's Graduation");
	event.setStart(new Date());
	event.setEnd(new Date());
	month = new Month();
	month.setEvents([event]);
	return month.getEvents();
}
/* App Controllers */
function CalendarCtrl($scope) {
	"use strict";
	$scope.month = new Month();
	$scope.month.setEvents(getTestEvents());
	$scope.weeks = $scope.month.weeks;
	$scope.getCalendarDayClass = function (day) {
		return (day.hasEvents()) ? "calendar-day-with-events" : "calendar-day-with-no-events";
	};
}
