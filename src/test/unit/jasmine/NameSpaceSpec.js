/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 12/31/12
 * Time: 6:39 PM
 * To change this template use File | Settings | File Templates.
 */
describe("Namespace Test Suite", function(){
    it('can create namespace', function () {
        NoesisCode.namespace("utils");
        NoesisCode.utils.name = "tonte";
        NoesisCode.utils.getName = function(){
            return this.name;
        };
        expect(NoesisCode.utils).toBeDefined("NoesisCode.utils should be defined.");
        expect(NoesisCode.utils.name).toBe("tonte");
        expect(NoesisCode.utils.getName()).toBe("tonte");
        var model = NoesisCode.namespace("utils.model");
        expect(NoesisCode.utils.model).toBeDefined();
        expect(model).toBeDefined();
        NoesisCode.utils.model.name = "tim";
        NoesisCode.utils.model.getName = function(){
            return this.name;
        };
        expect(NoesisCode.utils.model.name).toBe("tim");
        expect(NoesisCode.utils.model.getName()).toBe("tim");
    });
    it('can create nested namespace', function () {
        NoesisCode.namespace("com.noesiscode.utils.NumberUtility1");
        expect(NoesisCode.com.noesiscode.utils.NumberUtility1).toBeDefined();
        NoesisCode.NumberUtility2 = NoesisCode.namespace("com.noesiscode.utils.NumberUtility2");
        expect(NoesisCode.com.noesiscode.utils.NumberUtility2).toBeDefined();
        expect(NoesisCode.NumberUtility2).toBeDefined();
        expect(NoesisCode.com.noesiscode.utils.NumberUtility2).toBe(NoesisCode.NumberUtility2);
        NoesisCode.NumberUtility2.process = "Hi";
        expect("Hi").toBe(NoesisCode.NumberUtility2.process);
    });
});