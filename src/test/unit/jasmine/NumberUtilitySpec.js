/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 12/31/12
 * Time: 6:05 PM
 * To change this template use File | Settings | File Templates.
 */
describe("Number Utility Test Suite", function(){
    it('can pad left', function () {
        var day = 1;
        day = NoesisCode.NumberUtility.padLeft(day, 2);
        expect(day).toBeDefined();
        expect(day).toEqual("01");
    });
    it('can test not a number', function () {
        expect(NoesisCode.NumberUtility.isNotANumber("Oct302012".substring(3))).toBe(false);
    });
});