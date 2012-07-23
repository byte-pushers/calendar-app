/*global Month, Event*/
function getTestEvents() {
	"use strict";
	var event = new Event(), month, event2 = new Event();
	event.setSummary("Aisha's Graduation");
	event.setStart(new Date());
	event.setEnd(new Date());
	event2.setSummary("Malayshia's Birthday Party!");
	event2.setStart(new Date());
	event2.getStart().setDate(26);
	event2.setEnd(new Date());
	event2.getEnd().setDate(26);
	month = new Month();
	month.setEvents([event, event2]);
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
		var cssClass;
		if (day.hasEvents()) {
			cssClass = "calendar-day-with-events";
		} else if (day.isCurrentDayOfWeek()) {
			cssClass = "calendar-day-selected";
		} else {
			cssClass = "calendar-day-with-no-events";
		}
		return cssClass;
	};
	$scope.selectNextDay = function () {
		var previouslySelectedDate = new Date($scope.month.getSelectedDate().getTime()), nextDay = new Date(previouslySelectedDate.getTime());
		nextDay.setDate(nextDay.getDate() + 1);
		if (previouslySelectedDate.getMonth() !== nextDay.getMonth()) {
			$scope.selectFirstDayOfNextMonth();
		} else {
			$scope.todaysEvents = $scope.month.selectNextDay().getEvents();
			$scope.month.highLightSelectedDay(previouslySelectedDate);
		}
	};
	$scope.selectPreviousDay = function () {
		var previouslySelectedDate = new Date($scope.month.getSelectedDate().getTime()), previousDay = new Date(previouslySelectedDate.getTime());
		previousDay.setDate(previousDay.getDate() - 1);
		if (previouslySelectedDate.getMonth() !== previousDay.getMonth()) {
			$scope.selectLastDayOfPreviousMonth();
		} else {
			$scope.todaysEvents = $scope.month.selectPreviousDay().getEvents();
			$scope.month.highLightSelectedDay(previouslySelectedDate);
		}
	};
	$scope.selectFirstDayOfNextMonth = function () {
		$scope.todaysEvents = $scope.month.selectFirstDayOfNextMonth().getEvents();
		$scope.weeks = $scope.month.weeks;
	};
	$scope.selectFirstDayOfPreviousMonth = function () {
		$scope.todaysEvents = $scope.month.selectFirstDayOfPreviousMonth().getEvents();
		$scope.weeks = $scope.month.weeks;
	};
	$scope.selectLastDayOfPreviousMonth = function () {
		$scope.todaysEvents = $scope.month.selectLastDayOfPreviousMonth().getEvents();
		$scope.weeks = $scope.month.weeks;
	};
}
