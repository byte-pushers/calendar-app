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
	$scope.todaysEvents = $scope.month.findEventsByDate(new Date());
	$scope.getCalendarDayClass = function (day) {
		return (day.hasEvents()) ? "calendar-day-with-events" : "calendar-day-with-no-events";
	};
	$scope.selectNextDay = function () {
		$scope.month.selectNextDay();
		$scope.weeks = $scope.month.weeks;
		$scope.todaysEvents = $scope.month.findEventsByDate($scope.month.getSelectedDate());
	};
	$scope.selectPreviousDay = function () {
		$scope.month.selectPreviousDay();
		$scope.weeks = $scope.month.weeks;
		$scope.todaysEvents = $scope.month.findEventsByDate($scope.month.getSelectedDate());
	};
	$scope.selectNextMonth = function () {
		$scope.month.selectNextMonth();
		$scope.weeks = $scope.month.weeks;
		$scope.todaysEvents = $scope.month.findEventsByDate($scope.month.getSelectedDate());
	};
	$scope.selectPreviousMonth = function () {
		$scope.month.selectPreviousMonth();
		$scope.weeks = $scope.month.weeks;
		$scope.todaysEvents = $scope.month.findEventsByDate($scope.month.getSelectedDate());
	};
}
