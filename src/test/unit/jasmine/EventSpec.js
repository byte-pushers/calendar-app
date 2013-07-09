/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 1/3/13
 * Time: 8:29 PM
 * To change this template use File | Settings | File Templates.
 */
describe("Event Test Suite", function(){
    it('can create date range', function () {
        var start = new Date(2012, 7, 16, 17, 0, 0); //6 o'clock PM
        var end = new Date(2012, 7, 16, 21, 0, 0); //10 o'clock PM
        var dateRange = new CalendarApp.models.DateRange(start, end);
        expect(dateRange).toBeDefined();
        expect(dateRange.getStartDate()).toBe(start);
        expect(dateRange.getEndDate()).toBe(end);
    });

    it('can not create improper date range', function () {
        var start = new Date(2012, 7, 16, 17, 0, 0); //10 o'clock PM
        var end = new Date(2012, 7, 16, 21, 0, 0); //6 o'clock PM
        try{
            new CalendarApp.models.DateRange(end, start);
        } catch (e){
            expect(e).toBeDefined();
            expect(e.name).toBeDefined();
            expect((e.name === "NoesisCode.exceptions.InvalidDateRangeException")).toBe(true);
        }
    });

    it('can create attendee', function () {
        var person = getTontePouncil();
        var expected = person.getFirstName() + " " + person.getLastName();
        var attendee = new CalendarApp.models.Attendee(person, true, false);
        expect(attendee).toBeDefined();
        expect(attendee.isOrganizer()).toBe(true);
        expect(attendee.isOptional()).toBe(false);
        expect(attendee.getDisplayName()).toEqual(expected);
    });

    it('can adding attendee guess associations one-by-one', function () {
        var walter = getWalterSturghill();
        var james = getJamesDean();
        var tonte = getTontePouncil();
        var guest1 = new CalendarApp.models.Attendee(walter, false, false);
        var guest2 = new CalendarApp.models.Attendee(james, false, false);
        var attendee = new CalendarApp.models.Attendee(tonte, false, true);
        expect(attendee.isOptional()).toBe(true);
        attendee.addAdditionalGuest(guest1);
        attendee.addAdditionalGuest(guest2);
        expect(attendee.getAdditionalGuests().length).toBe(2);
    });

    it('can adding attendee guess associations all-at-once', function () {
        var walter = getWalterSturghill();
        var james = getJamesDean();
        var tonte = getTontePouncil();
        var guest1 = new CalendarApp.models.Attendee(walter, false, false);
        var guest2 = new CalendarApp.models.Attendee(james, false, false);
        var additionalGuests = [guest1, guest2];
        var attendee = new CalendarApp.models.Attendee(tonte, false, true);
        expect(attendee.isOptional()).toBe(true);
        attendee.setAdditionalGuests(additionalGuests);
        expect(attendee.getAdditionalGuests().length).toBe(2);
    });

    it('can set attendee\'s response status', function () {
        var james = getJames();
        var attendee = new CalendarApp.models.Attendee(james, false, true);
        var responseStatus = "tentative";
        attendee.setResponseStatus(responseStatus);
        expect(attendee.getResponseStatus()).toBe(responseStatus);
    });

    it('can set attendee\'s email address', function () {
        var email = getJamesHomeEmailAddress();
        var james = getJames(email);
        var attendee = new CalendarApp.models.Attendee(james, false, true);
        var responseStatus = "tentative";
        attendee.setResponseStatus(responseStatus);
        expect(attendee.getEmail()).toBe(email);
    });

    it('can create an calendar event', function () {
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
        expect(event.canAnyoneAddSelf()).toBe(false);
        expect(event.canGuestInviteOthers()).toBe(false);
        expect(event.canGuestSeeOtherGuests()).toBe(true);
        expect(attendees).toBeDefined();
        expect(event.getAttendees()).toBe(attendees);
        expect(event.getColorId()).toBe(colorId);
        expect(event.getCreated()).toBe(created);
        expect(event.getCreator()).toBe(creator);
        expect(event.getDescription()).toBe(description);
        expect(event.getEnd()).toEqual(end);
        expect(event.getHtmlLink()).toBe(htmlLink);
        expect(event.getId()).toBe(id);
        expect(event.getLocation()).toBe(location);
        expect(event.getOrganizer()).toBe(organizer);
        expect(event.getStart()).toEqual(start);
        expect(event.getStatus()).toBe(status);
        expect(event.getSummary()).toBe(summary);
        expect(event.getUpdated()).toBe(updated);
        expect(event.getVisibility()).toBe(visibility);
    });

    it('can add calendar events to calendar month', function () {
        var event = new CalendarApp.models.Event();
        event.setSummary("Aisha's Graduation");
        event.setStart(new Date());
        event.setEnd(new Date());
        var month = new CalendarApp.models.Month();
        month.setEvents([event]);
        expect(month.getEvents().length).toBe(1);
        expect(month.getEvents()).toContain(event);
    });

    it('can find calendar events for a given day', function () {
        var todaysEvents = getTodaysEvents();
        var month = new CalendarApp.models.Month();
        month.setEvents(todaysEvents);
        var foundEventsForToday = month.findEventsByDate(new Date());
        expect(foundEventsForToday.length).toBe(1);
        expect(foundEventsForToday).toContain(todaysEvents[0]);
    });

    it('can use static compareStartTimes() method', function () {
        var someDate = new Date(),
            event1 = createEvent("Event1", someDate, 19, 0, 21, 30),
            event2 = createEvent("Event2", someDate, 8, 0, 9, 0);
        expect(CalendarApp.models.Event.compareStartTimes(event1, event2)).toBe(1);
    });
    it('can use array sort() method', function () {
        var someDate = new Date(),
            event1 = createEvent("Event1", someDate, 19, 0, 21, 30),
            event2 = createEvent("Event2", someDate, 8, 0, 9, 0),
            events = [event1, event2];
        events.sort(CalendarApp.models.Event.compareStartTimes);
        //expect(CalendarApp.models.Event.compareStartTimes(event1, event2)).toBe(1);
    });
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

function getTodaysEvents(){
    var event = new CalendarApp.models.Event();
    event.setSummary("Aisha's Graduation");
    event.setStart(new Date());
    event.setEnd(new Date());
    return [event];
}

function createEvent(description, eventDate, startTimeHour, startTimeMinute, endTimeHour, endTimeMinute){
    var event = new CalendarApp.models.Event();
    event.setSummary(description);
    event.setStart(eventDate);
    event.getStart().setHours(startTimeHour);
    event.getStart().setMinutes(startTimeMinute);
    event.setEnd(eventDate);
    event.getEnd().setHours(endTimeHour);
    event.getEnd().setMinutes(endTimeMinute);
    return event;
}
