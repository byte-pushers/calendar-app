TestCase("NamespaceTestCases", {
	testNamespaceCreation: function(){
		NoesisCode.namespace("utils");
		NoesisCode.utils.name = "tonte";
		NoesisCode.utils.getName = function(){
			return this.name;
		};
		assertNotUndefined("NoesisCode.utils should be defined.", NoesisCode.utils);
		assertEquals("NoesisCode.utils.name should equal 'tonte'", "tonte", NoesisCode.utils.name);
		assertEquals("NoesisCode.utils.name should equal 'tonte'", "tonte", NoesisCode.utils.getName());
		var model = NoesisCode.namespace("utils.model");
		assertNotUndefined("NoesisCode.utils should be defined.", NoesisCode.utils.model);
		assertNotUndefined("model should be defined.", model);
		NoesisCode.utils.model.name = "tim";
		NoesisCode.utils.model.getName = function(){
			return this.name;
		};
		assertEquals("NoesisCode.utils.model.name should equal 'tim'", "tim", NoesisCode.utils.model.name);
		assertEquals("NoesisCode.utils.model.name should equal 'tim'", "tim", NoesisCode.utils.model.getName());
		
	},
	testNestedNamespace: function(){
		NoesisCode.namespace("com.noesiscode.utils.NumberUtility1");
		assertNotUndefined(NoesisCode.com.noesiscode.utils.NumberUtility1);
		NoesisCode.NumberUtility2 = NoesisCode.namespace("com.noesiscode.utils.NumberUtility2");
		assertNotUndefined(NoesisCode.com.noesiscode.utils.NumberUtility2);
		assertNotUndefined(NoesisCode.NumberUtility2);
		assertEquals(NoesisCode.com.noesiscode.utils.NumberUtility2, NoesisCode.NumberUtility2);
		NoesisCode.NumberUtility2.process = "Hi";
		assertEquals("Hi", NoesisCode.NumberUtility2.process);
	}
});
