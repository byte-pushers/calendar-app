/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 8/11/13
 * Time: 12:47 AM
 * To change this template use File | Settings | File Templates.
 */
describe("MonthUtility Test Suite", function(){
    it('can deterimine if date is in month', function () {
        var aug112013 = new Date(2013, 7, 3),
            july012013 = new Date(2013, 6, 1, 9, 48, 27, 0),
            monthOfJuly = new CalendarApp.models.Month(july012013);

        expect(CalendarApp.utils.MonthUtility.isDateNotInMonthView(aug112013, monthOfJuly.getWeeks())).toBe(false);

    });
});