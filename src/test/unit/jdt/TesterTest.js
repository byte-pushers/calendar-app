//var tester = new Tester();
//var methods = tester.getMethods(TestClass);

var t = (new Tester()).getInstance(TestClass);
var type = t._privates.doTest();
t._privates["doTest"];

