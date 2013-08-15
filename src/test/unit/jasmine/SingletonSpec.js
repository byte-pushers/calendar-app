/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 7/10/13
 * Time: 5:14 PM
 * To change this template use File | Settings | File Templates.
 */
describe("Singleton Test Suite", function () {
    it('can create date range', function () {
        // update prototype and create instance
        //CalendarApp.getInstance().prototype.nothing = true; // true
        var uni = CalendarApp.getInstance();
        expect(uni).toBeDefined();
        //CalendarApp.getInstance().prototype.everything = true; // true
        var uni2 = CalendarApp.getInstance();
        expect(uni2).toBeDefined();
        // it's the same single instance
        expect(uni).toBe(uni2); // true
        // all prototype properties work
        // no matter when they were defined
        //expect(uni.nothing && uni2.nothing).toBe(true); // true
        //expect(uni.everything && uni2.everything).toBe(true); // true
        // the normal properties work
        uni2.lastDraggedEnterElementId = 0;
        expect(uni.lastDraggedEnterElementId).toBe(0); // "Big"
        // the constructor points correctly
        //expect(uni.constructor).toBe(Universe);
    });
});