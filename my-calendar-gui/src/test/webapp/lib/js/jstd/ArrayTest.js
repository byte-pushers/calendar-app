TestCase("ArrayTestCases", {
	testArrayObjectReference: function(){
		var a = [{name: "Tonte"}];
		var obj = a[0];
		assertEquals("Tonte", obj.name);
		obj.name = "James";
		assertEquals("James", a[0].name);
	},
});