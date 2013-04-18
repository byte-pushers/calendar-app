TestCase("PersonTestCases", { 
	testCreatingEmail: function() {
		var email = new NoesisCode.models.Email("tonte.pouncil@gmail.com", true, "Home");
		assertNotUndefined("email should be defined.", email);
		assertEquals("tonte.pouncil@gmail.com", email.getEmail());
		assertEquals(true, email.isPrimaryEmail());
		assertEquals("Home", email.getType());
	},
	testCreatingPerson: function() {
		var person = new NoesisCode.models.Person("Tonte", "Torrance", "Pouncil");
		assertNotUndefined("person should be defined.", person);
		assertEquals("Tonte", person.getFirstName());
		assertEquals("Torrance", person.getMiddleName());
		assertEquals("Pouncil", person.getLastName());
		assertEquals(0, person.emails.length);
	}, testPersonEmailAssociation: function() {
		var person = new NoesisCode.models.Person("Tonte", "Torrance", "Pouncil");
		assertNotUndefined("person should be defined.", person);
		var email = new NoesisCode.models.Email("tonte.pouncil@gmail.com", true, "Home");
		assertNotUndefined("email should be defined.", email);
		person.addEmail(email);
		assertEquals(1, person.emails.length);
	}, testPersonEmailAssociations: function() {
		var person = new NoesisCode.models.Person("Tonte", "Torrance", "Pouncil");
		assertNotUndefined("person should be defined.", person);
		var email1 = new NoesisCode.models.Email("tonte.pouncil@gmail.com", true, "Home");
		var email2 = new NoesisCode.models.Email("pouncilt.developer@gmail.com", true, "Work");
		assertNotUndefined("email should be defined.", email1);
		assertNotUndefined("email should be defined.", email2);
		person.addEmail(email1);
		person.addEmail(email2);
		assertEquals(2, person.emails.length);
	}, testFindingPersonEmailByHomeType: function() {
		var person = new NoesisCode.models.Person("Tonte", "Torrance", "Pouncil");
		assertNotUndefined("person should be defined.", person);
		var email1 = new NoesisCode.models.Email("tonte.pouncil@gmail.com", true, "Home");
		var email2 = new NoesisCode.models.Email("pouncilt.developer@gmail.com", true, "Work");
		assertNotUndefined("email should be defined.", email1);
		assertNotUndefined("email should be defined.", email2);
		person.addEmail(email1);
		person.addEmail(email2);
		assertEquals(2, person.emails.length);
		var existingEmail = person.findEmailByType("Home");
		assertNotNull("person should be able to find email with type of 'Home'.", existingEmail);
		assertEquals("person should be able to find email with type of 'Home'.", "Home", existingEmail.getType());
	}, testPersonEmailAssociations: function() {
		var person = new NoesisCode.models.Person("Tonte", "Torrance", "Pouncil");
		assertNotUndefined("person should be defined.", person);
		var email1 = new NoesisCode.models.Email("tonte.pouncil@gmail.com", true, "Home");
		var email2 = new NoesisCode.models.Email("pouncilt.developer@gmail.com", true, "Work");
		assertNotUndefined("email should be defined.", email1);
		assertNotUndefined("email should be defined.", email2);
		var emails = [email1, email2];
		person.setEmails(emails);
		assertEquals(2, person.emails.length);
	}
});