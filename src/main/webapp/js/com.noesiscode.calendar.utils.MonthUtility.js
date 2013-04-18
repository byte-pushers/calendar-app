/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 2/27/13
 * Time: 12:42 PM
 * To change this template use File | Settings | File Templates.
 */
var CalendarApp = CalendarApp || {};
CalendarApp.utils = CalendarApp.utils || {};
CalendarApp.utils.MonthUtility = CalendarApp.utils || CalendarApp.namespace("com.noesiscode.calendar.utils.MonthUtility");
CalendarApp.utils.MonthUtility.isDateInMonthView = function (targetDate, monthView) {
    "use strict";
    var dateFoundInMonthView = false;
    monthView.every(function (week, index) {
        if (week.isWeekOf(targetDate)) {
            dateFoundInMonthView = true;
            return false;
        }
        return true;
    });
    return dateFoundInMonthView;
};
CalendarApp.utils.MonthUtility.isDateNotInMonthView = function (targetDate, monthView) {
    "use strict";
    var dateNotInMonthView = true;
    monthView.every(function (week, index) {
        if (week.isWeekOf(targetDate)) {
            dateNotInMonthView = false;
            return false;
        }
        return true;
    });
    return dateNotInMonthView;
};