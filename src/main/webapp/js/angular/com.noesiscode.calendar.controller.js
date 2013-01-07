/*global CalendarApp */
/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 12/19/12
 * Time: 12:02 AM
 * To change this template use File | Settings | File Templates.
 */
function CalendarController($scope, CalendarEventService) {
    "use strict";
    $scope.month = new CalendarApp.models.Month();
    $scope.events = CalendarApp.models.EventTransformer.transformJSONEvents(CalendarEventService.query());
    $scope.month.setEvents($scope.events);
    $scope.todaysEvents = $scope.month.findEventsByDate(new Date());
}