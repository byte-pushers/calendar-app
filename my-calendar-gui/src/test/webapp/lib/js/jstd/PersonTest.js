TestCase("PersonTestCases", {
	testCreatingPerson: function() {
		var person = new Person("Tonte", "Torrance", "Pouncil");
		assertNotUndefined("person should be defined.", person);
		assertEquals("Tonte", person.getFirstName());
		assertEquals("Torrance", person.getMiddleName());
		assertEquals("Pouncil", person.getLastName());
	}
});