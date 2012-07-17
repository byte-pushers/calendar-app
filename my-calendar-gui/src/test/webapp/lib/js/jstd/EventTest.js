TestCase("EventTestCases", { 
	testCreatingDateRange: function() {
		var start = new Date(2012, 7, 16, 17, 0, 0); //6 o'clock PM
		var end = new Date(2012, 7, 16, 21, 0, 0); //10 o'clock PM
		var dateRange = new DateRange(start, end);
		assertNotUndefined("dateRange should be defined.", dateRange);
		assertEquals(start, dateRange.getStartDate());
		assertEquals(end, dateRange.getEndDate());
	}, testCreatingImproperDateRange: function() {
		var start = new Date(2012, 7, 16, 17, 0, 0); //10 o'clock PM
		var end = new Date(2012, 7, 16, 21, 0, 0); //6 o'clock PM
		try{
			var dateRange = new DateRange(end, start);
		} catch (e){
			assertTrue(e.name === "InvalidDateRangeException");
		}
	}, testCreatingAttendee: function(){
		var person = new Person("Tonte", "Torrance", "Pouncil");
		var attendee = new Attendee(person, person, false);
		assertNotUndefined("attendee should be defined.", attendee);
		assertTrue("Attendee should be the organizer", attendee.isOrganizer());
		assertEquals("Attendee's display name it not displaying correctly.", "Tonte Pouncil", attendee.getDisplayName());
	}, testAttendeeGuestAssociation: function(){
		var walter = new Person("Walter", null, "Sturghill");
		var james = new Person("James", null, "Dean");
		var tonte = new Person("Tonte", "Torrance", "Pouncil");
		var guest1 = new Attendee(walter, walter, false);
		var guest2 = new Attendee(james, james, true);
		var attendee = new Attendee(tonte, tonte, false);
		attendee.addAdditionalGuest(guest1);
		attendee.addAdditionalGuest(guest2);
		assertEquals("Attendee's additional guests list has the wrong size.", 2, attendee.getAdditionalGuests().length);
	}, testAttendeeGuestAssociation: function(){
		var walter = new Person("Walter", null, "Sturghill");
		var james = new Person("James", null, "Dean");
		var tonte = new Person("Tonte", "Torrance", "Pouncil");
		var guest1 = new Attendee(walter, walter, false);
		var guest2 = new Attendee(james, james, true);
		var additionalGuests = [guest1, guest2];
		var attendee = new Attendee(tonte, tonte, false);
		attendee.setAdditionalGuests(additionalGuests);
		assertEquals("Attendee's additional guests list has the wrong size.", 2, attendee.getAdditionalGuests().length);
	}
});