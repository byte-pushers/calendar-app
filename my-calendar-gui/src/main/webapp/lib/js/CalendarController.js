/*global Month*/
/* App Controllers */
function CalendarCtrl($scope) {
	"use strict";
	$scope.month = new Month();
	$scope.weeks = $scope.month.weeks;
}
