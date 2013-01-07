/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 1/2/13
 * Time: 9:45 PM
 * To change this template use File | Settings | File Templates.
 */
describe("Array Test Suite", function(){
    it('can reference objects in Array', function () {
        var a = [{name: "Tonte"}];
        var obj = a[0];
        expect(obj.name).toBe("Tonte");
        obj.name = "James";
        expect(a[0].name).toBe("James");
    });
});