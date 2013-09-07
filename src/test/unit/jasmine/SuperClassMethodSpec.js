/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 8/26/13
 * Time: 2:54 PM
 * To change this template use File | Settings | File Templates.
 */
describe("JS Inheritance Test Suite", function () {
    it('Super class method returns wrong id.  Should return sub class id; but returns super class id.', function () {
        var BaseClass = function BaseClass() {}
        BaseClass.prototype.getName = function () {
            return "BaseClass("+this.getId()+")";
        };
        BaseClass.prototype.getId = function () {
            return 1;
        };
        var SubClass = function SubClass() {}
        SubClass.prototype = new BaseClass();
        SubClass.prototype.getName = function() {
            return "SubClass("+this.getId()+") extends " + BaseClass.prototype.getName();
        };
        SubClass.prototype.getId = function () {
            return 2;
        };
        expect((new SubClass()).getName()).toBe("SubClass(2) extends BaseClass(1)");
    });
    it('Super class method returns right id after explicitly referencing super class id.', function () {
        var BaseClass = function BaseClass() {}
        BaseClass.prototype.getName = function () {
            return "BaseClass("+this.getId()+")";
        };
        BaseClass.prototype.getId = function () {
            return 1;
        };
        var SubClass = function SubClass() {}
        SubClass.prototype = new BaseClass();
        SubClass.prototype.getName = function() {
            return "SubClass("+this.getId()+") extends " + BaseClass.prototype.getName.call(this);
        };
        SubClass.prototype.getId = function () {
            return 2;
        };
        expect((new SubClass()).getName()).toBe("SubClass(2) extends BaseClass(2)");
    });
    it('Super class method returns right id by using the inherit(Child, Parent) method.', function () {
        var Class = function Class() { }
        Class.prototype.construct = function() {};
        Class.extend = function(def) {
            var classDef = function() {
                if (arguments[0] !== Class) { this.construct.apply(this, arguments); }
            };

            var proto = new this(Class);
            var superClass = this.prototype;

            for (var n in def) {
                var item = def[n];
                if (item instanceof Function) item.$ = superClass;
                proto[n] = item;
            }

            classDef.prototype = proto;

            //Give this new class the same static extend method
            classDef.extend = this.extend;
            return classDef;
        };
        var BaseClass = Class.extend({
            construct: function() { /* optional constructor method */ },

            getName: function() {
                return "BaseClass(" + this.getId() + ")";
            },

            getId: function() {
                return 1;
            }
        });

        var SubClass = BaseClass.extend({
            getName: function() {
                //Calls the getName() method of BaseClass
                return "SubClass(" + this.getId() + ") extends " +
                    arguments.callee.$.getName.call(this);
            },

            getId: function() {
                return 2;
            }
        });

        var TopClass = SubClass.extend({
            getName: function() {
                //Calls the getName() method of SubClass
                return "TopClass(" + this.getId() + ") extends " +
                    arguments.callee.$.getName.call(this);
            },

            getId: function() {
                //Just like the last example, this.getId()
                //always returns the proper value of 2.
                return arguments.callee.$.getId.call(this);
            }
        });

        expect(new TopClass().getName(), "TopClass(2) extends SubClass(2) extends BaseClass(2)");
    });
    it('Super class method returns right id by using the defineClass method.', function () {
        var BaseClass = NoesisCode.defineClass({
            name: "BaseClass",
            methods: {
                getName: function() {
                    return "BaseClass(" + this.getId() + ")";
                },
                getId: function() {
                    return 1;
                }
            }
        });

        var SubClass = NoesisCode.defineClass({
            name: "SubClass",
            extend: BaseClass,
            methods: {
                getName: function() {
                    //Calls the getName() method of BaseClass
                    return "SubClass(" + this.getId() + ") extends " + BaseClass.prototype.getName.apply(this);
                },
                getId: function() {
                    return 2;
                }
            }
        });

        var TopClass = NoesisCode.defineClass({
            name: "TopClass",
            extend: SubClass,
            methods: {
                getName: function() {
                    //Calls the getName() method of SubClass
                    return "TopClass(" + this.getId() + ") extends " + this.superclass.prototype.getName.apply(this);
                }
            }
        });

        expect((new TopClass()).getName(), "TopClass(2) extends SubClass(2) extends BaseClass(2)");
    });
});
