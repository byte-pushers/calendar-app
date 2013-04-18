TestCase("EventTestCases", { 
	testCreatingDateRange: function() {
		var start = new Date(2012, 7, 16, 17, 0, 0); //6 o'clock PM
		var end = new Date(2012, 7, 16, 21, 0, 0); //10 o'clock PM
		var dateRange = new CalendarApp.models.DateRange(start, end);
		assertNotUndefined("dateRange should be defined.", dateRange);
		assertEquals(start, dateRange.getStartDate());
		assertEquals(end, dateRange.getEndDate());
	}, testCreatingImproperDateRange: function() {
		var start = new Date(2012, 7, 16, 17, 0, 0); //10 o'clock PM
		var end = new Date(2012, 7, 16, 21, 0, 0); //6 o'clock PM
		try{
			new CalendarApp.models.DateRange(end, start);
		} catch (e){
			assertTrue(e.name === "NoesisCodeExceptions.InvalidDateRangeException");
		}
	}, testAttendeeCreation: function(){
		var person = getTontePouncil();
		var expected = person.getFirstName() + " " + person.getLastName();
		var attendee = new CalendarApp.models.Attendee(person, true, false);
		assertNotUndefined("attendee should be defined.", attendee);
		assertTrue("Attendee should be the organizer", attendee.isOrganizer());
		assertFalse("Attendee should be optional", attendee.isOptional());
		assertEquals("Attendee's display name it not displaying correctly.", expected, attendee.getDisplayName());
	}, testAttendeeGuestAssociation: function(){
		var walter = getWalterStrughill();
		var james = getJamesDean();
		var tonte = getTontePouncil();
		var guest1 = new CalendarApp.models.Person(walter, walter, false);
		var guest2 = new CalendarApp.models.Person(james, james, true);
		var attendee = new CalendarApp.models.Person(tonte, tonte, true);
		assertTrue("Attendee should not be optional", attendee.isOptional());
		attendee.addAdditionalGuest(guest1);
		attendee.addAdditionalGuest(guest2);
		assertEquals("Attendee's additional guests list has the wrong size.", 2, attendee.getAdditionalGuests().length);
	}, testAttendeeGuestAssociation: function(){
		var walter = getWalterSturghill();
		var james = getJamesDean();
		var tonte = getTontePouncil();
		var guest1 = new CalendarApp.models.Attendee(walter, walter, false);
		var guest2 = new CalendarApp.models.Attendee(james, james, true);
		var additionalGuests = [guest1, guest2];
		var attendee = new CalendarApp.models.Attendee(tonte, true, false);
		attendee.setAdditionalGuests(additionalGuests);
		assertEquals("Attendee's additional guests list has the wrong size.", 2, attendee.getAdditionalGuests().length);
	}, testAttendeeComments: function(){
		var james = getJames();
		var attendee = new CalendarApp.models.Attendee(james, false, true);
		var comment = "I may not be able to attend because of prior engagement.";
		attendee.setComment(comment);
		assertTrue("Attendee should be optional", attendee.isOptional());
		assertEquals("Attendee comment was not set properly.", comment, attendee.getComment());
	}, testAttendeeResponseStatus: function(){
		var james = getJames();
		var attendee = new CalendarApp.models.Attendee(james, false, true);
		var responseStatus = "tentative";
		attendee.setResponseStatus(responseStatus);
		assertEquals("Attendee response status was not set properly.", responseStatus, attendee.getResponseStatus());
	}, testAttendeeEmail: function(){
		var email = getJamesHomeEmailAddress();
		var james = getJames(email);
		var attendee = new CalendarApp.models.Attendee(james, false, true);
		var responseStatus = "tentative";
		attendee.setResponseStatus(responseStatus);
		assertEquals("Attendee email was not set properly.", email, attendee.getEmail());
	}, testEventCreation: function(){
		var id = 1;
		var status = "confirmed";
		var htmlLink = "http://myevent.com";
		var created = new Date();
		var updated = created;
		var summary = "Aisha's Collage Graduation Party";
		var description = "Lets get together and celebrate Aisha as she has just graduated from UNT."; //optional;
		var location = "435 Bell Street, Denton TX 76227"; //optional;
		var colorId = "#FF00FF";
		var creator = getTontePouncil(getTonteHomeEmailAddress()); //Person Object with email and displayName
		var organizer = getTontePouncil(getTonteHomeEmailAddress());; //Person Object with email and displayName
		var start = new Date(2012, 7, 16, 17, 0, 0); //6 o'clock PM;	// Start date, dateTime, timeZone
		var end = new Date(2012, 7, 16, 21, 0, 0); //10 o'clock PM; // End date, dateTime, timeZone
		var visibility = "public";
		var attendees = getAishaGraduationAttendees();
		var anyOneCanAddSelfFlag = false;
		var guestCanInviteOthersFlag = false;
		var guestCanSeeOtherGuestsFlag = true;
		var event = new CalendarApp.models.Event();
		event.anyOneCanAddSelf(anyOneCanAddSelfFlag);
		event.guestCanInviteOthers(guestCanInviteOthersFlag);
		event.guestCanSeeOtherGuests(guestCanSeeOtherGuestsFlag);
		event.setAttendees(attendees);
		event.setColorId(colorId);
		event.setCreated(created);
		event.setCreator(creator);
		event.setDescription(description);
		event.setEnd(end);
		event.setHtmlLink(htmlLink);
		event.setId(id);
		event.setLocation(location);
		event.setOrganizer(organizer);
		event.setStart(start);
		event.setStatus(status);
		event.setSummary(summary);
		event.setUpdated(updated);
		event.setVisibility(visibility);
		assertFalse("The general public can not add themselves to this event.", event.canAnyoneAddSelf());
		assertFalse("The attendees of this event can not invite other guests to this event.", event.canGuestInviteOthers());
		assertTrue("The attendees of this event can see other guests of this event.", event.canGuestSeeOtherGuests());
		assertArray("The attendees of this event must be an array of attendess.", attendees);
		assertEquals("The attendees of this event does not match the expected value.", attendees, event.getAttendees());
		assertEquals("The event's color does not match the expected value.", colorId, event.getColorId());
		assertEquals("The event's created date does not match the expected value.", created, event.getCreated());
		assertEquals("The event's creator does not match the expected value.", creator, event.getCreator());
		assertEquals("The event's description does not match the expected value.", description, event.getDescription());
		assertEquals("The event's end time does not match the expected value.", end, event.getEnd());
		assertEquals("The event's html link does not match the expected value.", htmlLink, event.getHtmlLink());
		assertEquals("The event's id does not match the expected value.", id, event.getId());
		assertEquals("The event's location does not match the expected value.", location, event.getLocation());
		assertEquals("The event's organizer does not match the expected value.", organizer, event.getOrganizer());
		assertEquals("The event's start time does not match the expected value.", start, event.getStart());
		assertEquals("The event's status does not match the expected value.", status, event.getStatus());
		assertEquals("The event's summary does not match the expected value.", summary, event.getSummary());
		assertEquals("The event's updated does not match the expected value.", updated, event.getUpdated());
		assertEquals("The event's visibility does not match the expected value.", visibility, event.getVisibility());
		
	}
});

function getJamesDean(email){
	var person = new NoesisCode.models.Person("James", null, "Dean");
	if(email !== undefined && email !== null){
		person.addEmail(email);
	}
	return person;
}

function getWalterSturghill(email){
	var person = new NoesisCode.models.Person("Walter", null, "Sturghill");
	if(email !== undefined && email !== null){
		person.addEmail(email);
	}
	return person;
}

function getTontePouncil(email){
	var person = new NoesisCode.models.Person("Tonte", "Torrance", "Pouncil");
	if(email !== undefined && email !== null){
		person.addEmail(email);
	}
	return person;
}

function getJames(email){
	var person = new NoesisCode.models.Person("James", null, null);
	if(email !== undefined && email !== null){
		person.addEmail(email);
	}
	return person;
}

function getJamesHomeEmailAddress(){
	return new NoesisCode.models.Email("james@james.com", true, "Home");
}

function getTonteHomeEmailAddress(){
	return new NoesisCode.models.Email("tonte.pouncil@gmail.com", true, "Home");
}

function getWalterHomeEmailAddress(){
	return new NoesisCode.models.Email("wsj@wsjmedia.com", true, "Home");
}

function getAishaGraduationAttendees(){
	var attendees = [new CalendarApp.models.Attendee(getTontePouncil(getTonteHomeEmailAddress()), true, false),
	                 new CalendarApp.models.Attendee(getWalterSturghill(getWalterHomeEmailAddress()), false, false),
	                 new CalendarApp.models.Attendee(getJamesDean(getJamesHomeEmailAddress()), false, true)];
	return attendees;
}