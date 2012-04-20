/* App Controllers */
function CalendarCtrl($scope) {
	$scope.month = new Month();
	$scope.weeks = $scope.month.weeks;
}
