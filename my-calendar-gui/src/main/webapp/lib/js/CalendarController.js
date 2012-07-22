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
		var previouslySelectedDate = new Date($scope.month.getSelectedDate().getTime());
		$scope.month.selectNextDay();
		//$scope.weeks = $scope.month.weeks;
		//TODO: if new month get a new set of weeks and make sure you can highlight current day.
		$scope.todaysEvents = $scope.month.findEventsByDate($scope.month.getSelectedDate());
		$scope.month.highLightSelectedDay(previouslySelectedDate);
	};
	$scope.selectPreviousDay = function () {
		var previouslySelectedDate = new Date($scope.month.getSelectedDate().getTime());
		$scope.month.selectPreviousDay();
		//$scope.weeks = $scope.month.weeks;
		//TODO: if new month get a new set of weeks and make sure you can highlight current day.
		$scope.todaysEvents = $scope.month.findEventsByDate($scope.month.getSelectedDate());
		$scope.month.highLightSelectedDay(previouslySelectedDate);
	};
	$scope.selectNextMonth = function () {
		var previouslySelectedDate = new Date($scope.month.getSelectedDate().getTime());
		$scope.month.selectNextMonth();
		$scope.weeks = $scope.month.weeks;
		//TODO: make sure you can highlight current day.
		$scope.todaysEvents = $scope.month.findEventsByDate($scope.month.getSelectedDate());
		$scope.month.highLightSelectedDay(previouslySelectedDate);
	};
	$scope.selectPreviousMonth = function () {
		var previouslySelectedDate = new Date($scope.month.getSelectedDate().getTime());
		$scope.month.selectPreviousMonth();
		$scope.weeks = $scope.month.weeks;
		//TODO: make sure you can highlight current day.
		$scope.todaysEvents = $scope.month.findEventsByDate($scope.month.getSelectedDate());
		$scope.month.highLightSelectedDay(previouslySelectedDate);
	};
}
