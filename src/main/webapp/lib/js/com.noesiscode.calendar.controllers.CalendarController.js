getTestEvents = function () {
	var event = new CalendarApp.models.Event(), event2 = new CalendarApp.models.Event();
	event.setId(1);
	event.setSummary("Aisha's Graduation");
	event.setStart(new Date());
	event.setEnd(new Date());
	event2.setId(2);
	event2.setSummary("Malayshia's Birthday Party!");
	event2.setStart(new Date());
	event2.getStart().setDate(26);
	event2.setEnd(new Date());
	event2.getEnd().setDate(26);
	return [event, event2];
};
/* App Controllers */
function CalendarController ($scope, $rootScope) {
	$scope.month = new CalendarApp.models.Month();
	$scope.month.setEvents(getTestEvents());
	$scope.weeks = $scope.month.weeks;
	CalendarApp.todaysEvents = $scope.todaysEvents = $scope.month.findEventsForToday();
	$rootScope.$on('handleDrop', function(event){
		$scope.rescheduleEvent(event, null);
	});
	$scope.getCalendarDayClass = function (day) {
		var cssClass;
		if (day.hasEvents() && day.isCurrentDayOfWeek()) {
			cssClass = "calendar-day-selected-with-events calendar-date";
		} else if (day.hasEvents()) {
			cssClass = "calendar-day-with-events calendar-date";
		} else if (day.isCurrentDayOfWeek()) {
			cssClass = "calendar-day-selected calendar-date";
		} else {
			cssClass = "calendar-day-with-no-events calendar-date";
		}
		return cssClass;
	};
	$scope.selectDay = function (selectedDate) {
		var previouslySelectedDate = new Date($scope.month.getSelectedDate().getTime());
		$scope.month.highLightSelectedDay(previouslySelectedDate);
	};
	$scope.selectNextDay = function () {
		var previouslySelectedDate = new Date($scope.month.getSelectedDate().getTime()), nextDay = new Date(previouslySelectedDate.getTime());
		nextDay.setDate(nextDay.getDate() + 1);
		if (previouslySelectedDate.getMonth() !== nextDay.getMonth()) {
			$scope.selectFirstDayOfNextMonth();
		} else {
			CalendarApp.todaysEvents = $scope.todaysEvents = $scope.month.selectNextDay().getEvents();
			$scope.month.highLightSelectedDay(previouslySelectedDate);
		}
	};
	$scope.selectPreviousDay = function () {
		var previouslySelectedDate = new Date($scope.month.getSelectedDate().getTime()), previousDay = new Date(previouslySelectedDate.getTime());
		previousDay.setDate(previousDay.getDate() - 1);
		if (previouslySelectedDate.getMonth() !== previousDay.getMonth()) {
			$scope.selectLastDayOfPreviousMonth();
		} else {
			CalendarApp.todaysEvents = $scope.todaysEvents = $scope.month.selectPreviousDay().getEvents();
			$scope.month.highLightSelectedDay(previouslySelectedDate);
		}
	};
	$scope.selectFirstDayOfNextMonth = function () {
		CalendarApp.todaysEvents = $scope.todaysEvents = $scope.month.selectFirstDayOfNextMonth().getEvents();
		$scope.weeks = $scope.month.weeks;
	};
	$scope.selectFirstDayOfPreviousMonth = function () {
		CalendarApp.todaysEvents = $scope.todaysEvents = $scope.month.selectFirstDayOfPreviousMonth().getEvents();
		$scope.weeks = $scope.month.weeks;
	};
	$scope.selectLastDayOfPreviousMonth = function () {
		CalendarApp.todaysEvents = $scope.todaysEvents = $scope.month.selectLastDayOfPreviousMonth().getEvents();
		$scope.weeks = $scope.month.weeks;
	};
	$scope.rescheduleEvent = function (event, targetDate) {
		var events = CalendarApp.rescheduleEvent(event, targetDate, $scope.month.getEvents());
		$scope.month.setEvents(events);
		$scope.todaysEvents = $scope.month.findEventsForToday();
	};
};
