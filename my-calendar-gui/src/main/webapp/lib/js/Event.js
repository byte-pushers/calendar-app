/*global InvalidParameterException, NullPointerException, InvalidDateRangeException*/
/**
 * Creates a DateRange object that represents a date range.
 * 
 * @class Represents a date range.
 * @param {<a href="http://www.w3schools.com/js/jsref_obj_date.asp">Date</a>} start The start date of the date range.
 * @param {<a href="http://www.w3schools.com/js/jsref_obj_date.asp">Date</a>} end The end date of the date range.
 * 
 * @returns An instance of the DateRange class.
 * 
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
*/
function DateRange(start, end) {
	"use strict";
	if (start === undefined || start === null) {
		throw new NullPointerException("start can not be null.");
	}
	if (start.getClassType() !== "[class Date]") {
		throw new InvalidParameterException("start must be an Person object.");
	}
	if (end !== undefined && end !== null) {
		if (end.getClassType() !== "[class Date]") {
			throw new InvalidParameterException("end must be an Person object.");
		}
		if (end.getTime() < start.getTime()) {
			var idre = new InvalidDateRangeException("end date can not come before start date.");
			throw idre;
		}
	}
	this.start = start;
	this.end = end;
	this.getStartDate = function () {
		return this.start;
	};
	this.getEndDate = function () {
		return this.end;
	};
}
/**
 * Creates a Attendee object that represents an attendee of an event.
 * 
 * @class Represents an attendee of an event.
 * @param {@link Person} person The person that will be attending the event.
 * @param {<a href="http://www.w3schools.com/js/jsref_obj_boolean.asp">Boolean</a>} organizer Indicates if this attendee is the organizer of the event.
 * @param {<a href="http://www.w3schools.com/js/jsref_obj_boolean.asp">Boolean</a>} optional Indicates if this is an optional attendee.
 * 
 * @returns An instance of the DateRange class.
 * 
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
*/
function Attendee(person, organizer, /* self, resource,*/ optional) {
	"use strict";
	if (person === undefined || person === null) {
		throw new NullPointerException("person can not be null.");
	}
	if (person.getClassType() !== "[class Person]") {
		throw new InvalidParameterException("person must be of class type Person.");
	}
	this.person = person;
	this.organizer = false;
	//this.resource = false;
	//this.self = false;
	this.optional = false;
	this.responseStatus = null;
	this.comment = null;
	this.additionalGuests = [];
	if (organizer !== undefined || organizer !== null || organizer.getObjectType() === "[object Boolean]") {
		this.organizer = true;
	}
	/*if (resource !== undefined || resource !== null || resource.getObjectType === "[object Boolean]") {
		this.resource = true;
	};
	if (self !== undefined || self !== null || self.getObjectType() === "[object Boolean]") {
		this.self = true;
	};*/
	if (optional !== undefined || optional !== null || optional.getObjectType() === "[object Boolean]") {
		this.optional = optional;
	}
	/**
	 * <p>Determines if this attendee is the organizer of the event.</p>
	 *
	 * @returns {Boolean} The status of whether this attendee is the event organizer.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.isOrganizer = function () {
		return this.organizer;
	};
	///**
	// * <p>Determines if this attendee is a resource instead of a person.</p>
	// *
	// * @returns {Boolean} The status of whether this attendee is an event resource.
	// * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	//*/
	//this.isResource = function () {
	//	return this.resource;
	//};
	/**
	 * <p>Determines if this attendee is optional for this event.</p>
	 *
	 * @returns {Boolean} The status of whether this attendee optional for this event.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.isOptional = function () {
		return this.optional;
	};
	/**
	 * <p>Gets the display name of the attendee.</p>
	 *
	 * @returns {String} The display name of the attendee.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getDisplayName = function () {
		return this.person.getDisplayName();
	};
	/**
	 * <p>Gets the email address of the attendee.</p>
	 *
	 * @returns {String} The email address of the attendee.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getEmail = function () {
		return this.person.findPrimaryEmail();
	};
	/**
	 * <p>Sets the response status for the attendee.</p> 
	 *
	 * 
	 * @param {String} responseStatus The attendee's response to the event invite.
	 *
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.setResponseStatus = function (responseStatus) {
		if (responseStatus !== undefined && responseStatus !== null && responseStatus.getObjectType() === "[object String]") {
			this.responseStatus = responseStatus;
		}
	};
	/**
	 * <p>Gets the response status of the attendee.</p>
	 *
	 * @returns {String} The response status of the attendee.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getResponseStatus = function () {
		return this.responseStatus;
	};
	/**
	 * <p>Sets the comments of the attendee.</p> 
	 *
	 * 
	 * @param {String} responseStatus The attendee's response to the event invite.
	 *
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.setComment = function (comment) {
		if (comment !== undefined && comment !== null && comment.getObjectType() === "[object String]") {
			this.comment = comment;
		}
	};
	/**
	 * <p>Gets the comments of the attendee.</p>
	 *
	 * @returns {String} The comments of the attendee.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getComment = function () {
		return this.comment;
	};
	/**
	 * <p>Sets the guest list for this attendee.</p>
	 *
	 * @param {Array} additionalGuests The attendee's additional guests to the event.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.setAdditionalGuests = function (additionalGuests) {
		if (additionalGuests !== undefined && additionalGuests !== null && Array.isArray(additionalGuests)) {
			this.additionalGuests = additionalGuests;
		}
	};
	/**
	 * <p>Gets the guest of this attendee.</p>
	 *
	 * @returns {Array} The guest list of the attendee.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getAdditionalGuests = function () {
		return this.additionalGuests;
	};
	/**
	 * <p>Adds the an additional guest to the attendee's list.</p>
	 *
	 * @param {Attendee} attendee An additional guest of the attendee.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.addAdditionalGuest = function (attendee) {
		if (attendee !== undefined && attendee !== null && attendee.getClassType() !== "[class Attendee]") {
			throw new InvalidParameterException("attendee must be of class type Attendee.");
		}
		this.additionalGuests[this.additionalGuests.length] = attendee;
	};
}

function Event() {
	"use strict";
	this.id = null;
	this.status = null;
	this.htmlLink = null;
	this.created = null;
	this.updated = null;
	this.summary = null;
	this.description = null; //optional;
	this.location = null; //optional;
	this.colorId = null;
	this.creator = null; //Person Object with email and displayName
	this.organizer = null; //Person Object with email and displayName
	this.start = null;	// Start date, dateTime, timeZone
	this.end = null; // End date, dateTime, timeZone
	this.visibility = null;
	this.attendees = null; // list of attendees of the event attendee.email
					// attendee.displayName, attendee.organizer, attendee.resource, 
					// attendee.optional, attendee.responseStatus, attendee.comment, 
					// attendee.additionalGuests
	this.anyOneCanAddSelfFlag = null;
	this.guestCanInviteOthersFlag = null;
	this.guestCanSeeOtherGuestsFlag = null;
	//this.reminders; // reminders.useDefault, reminders.overrides[], 
					// reminder.overrides[].method, reminder.overrides[].minutes
	/**
	 * <p>Gets the event id.</p>
	 *
	 * @returns {String} The event id.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getId = function () {
		return this.id;
	};
	/**
	 * <p>Sets the event's id.</p>
	 *
	 * @param {String} id The event id.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.setId = function (id) {
		if (id !== undefined && id !== null && id.getObjectType() !== "[object Number]") {
			throw new InvalidParameterException("id must be of type Number.");
		}
		this.id = id;
	};
	/**
	 * <p>Gets the event confirmation status.</p>
	 *
	 * @returns {String} The event confirmation status.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getStatus = function () {
		return this.status;
	};
	/**
	 * <p>Sets the event confirmation status.</p>
	 *
	 * @param {String} status The event's confirmation status.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.setStatus = function (status) {
		if (status !== undefined && status !== null && status.getObjectType() !== "[object String]") {
			throw new InvalidParameterException("status must be of type String.");
		}
		this.status = status;
	};
	/**
	 * <p>Gets the event URL.</p>
	 *
	 * @returns {String} The event URL.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getHtmlLink = function () {
		return this.htmlLink;
	};
	/**
	 * <p>Sets the event's URL.</p>
	 *
	 * @param {String} htmlLink The events's URL.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.setHtmlLink = function (htmlLink) {
		if (htmlLink !== undefined && htmlLink !== null && htmlLink.getObjectType() !== "[object String]") {
			throw new InvalidParameterException("htmlLink must be of type String.");
		}
		this.htmlLink = htmlLink;
	};
	/**
	 * <p>Gets the created date and time stamp of the event.</p>
	 *
	 * @returns {Date} The event created date and time stamp.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getCreated = function () {
		return this.created;
	};
	/**
	 * <p>Sets the created date and timestamp of the event.</p>
	 *
	 * @param {Date} created The event's created date and time stamp.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.setCreated = function (created) {
		if (created !== undefined && created !== null && created.getObjectType() !== "[object Date]") {
			throw new InvalidParameterException("created must be of type Date.");
		}
		this.created = created;
	};
	/**
	 * <p>Gets the last modified date and time stamp of event.</p>
	 *
	 * @returns {Date} The last modified date and time stamp of the event.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getUpdated = function () {
		return this.updated;
	};
	/**
	 * <p>Sets the guest list for this attendee.</p>
	 *
	 * @param {Date} updated The event's last modified date and time stamp.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.setUpdated = function (updated) {
		if (updated !== undefined && updated !== null && updated.getObjectType() !== "[object Date]") {
			throw new InvalidParameterException("updated must be of type Date.");
		}
		this.updated = updated;
	};
	/**
	 * <p>Gets the event's title.</p>
	 *
	 * @returns {String} The event title.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getSummary = function () {
		return this.summary;
	};
	/**
	 * <p>Sets the event's title.</p>
	 *
	 * @param {String} summary The event's title.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.setSummary = function (summary) {
		if (summary !== undefined && summary !== null && summary.getObjectType() !== "[object String]") {
			throw new InvalidParameterException("summary must be of type String.");
		}
		this.summary = summary;
	};
	/**
	 * <p>Gets the description of event.</p>
	 *
	 * @returns {Date} The description of the event.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getDescription = function () {
		return this.description;
	};
	/**
	 * <p>Sets the event's description.</p>
	 *
	 * @param {String} description The event's description.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.setDescription = function (description) {
		if (description !== undefined && description !== null && description.getObjectType() !== "[object String]") {
			throw new InvalidParameterException("summary must be of type String.");
		}
		this.description = description;
	};
	/**
	 * <p>Gets the location of event.</p>
	 *
	 * @returns {String} The location of the event.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getLocation = function () {
		return this.location;
	};
	/**
	 * <p>Sets the event's location.</p>
	 *
	 * @param {String} location The event's location.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.setLocation = function (location) {
		if (location !== undefined && location !== null && location.getObjectType() !== "[object String]") {
			throw new InvalidParameterException("location must be of type String.");
		}
		this.location = location;
	};
	/**
	 * <p>Gets the event color.</p>
	 *
	 * @returns {String} The event color.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getColorId = function () {
		return this.colorId;
	};
	/**
	 * <p>Sets the event's color.</p>
	 *
	 * @param {String} colorId The event's color.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.setColorId = function (colorId) {
		if (colorId !== undefined && colorId !== null && colorId.getObjectType() !== "[object String]") {
			throw new InvalidParameterException("colorId must be of type String.");
		}
		this.colorId = colorId;
	};
	/**
	 * <p>Gets the creator of this event.</p>
	 *
	 * @returns {Person} The creator of the event.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getCreator = function () {
		return this.creator;
	};
	/**
	 * <p>Sets the event's creator.</p>
	 *
	 * @param {Person} location The event's creator.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.setCreator = function (creator) {
		if (creator !== undefined && creator !== null && creator.getClassType() !== "[class Person]") {
			throw new InvalidParameterException("creator must be of class type Person.");
		}
		this.creator = creator;
	};
	/**
	 * <p>Gets the organizer of event.</p>
	 *
	 * @returns {Person} The organizer of the event.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getOrganizer = function () {
		return this.organizer;
	};
	/**
	 * <p>Sets the event's organizer.</p>
	 *
	 * @param {Person} organizer The event's organizer.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.setOrganizer = function (organizer) {
		if (organizer !== undefined && organizer !== null && organizer.getClassType() !== "[class Person]") {
			throw new InvalidParameterException("organizer must be of class type Person.");
		}
		this.organizer = organizer;
	};
	/**
	 * <p>Gets the start time of event.</p>
	 *
	 * @returns {Time} The start time of the event.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getStart = function () {
		return this.start;
	};
	/**
	 * <p>Sets the event's start time.</p>
	 *
	 * @param {Time} start The event's start time.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.setStart = function (start) {
		this.start = start;
	};
	/**
	 * <p>Gets the end time of event.</p>
	 *
	 * @returns {Time} The end time of the event.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getEnd = function () {
		return this.end;
	};
	/**
	 * <p>Sets the event's end time.</p>
	 *
	 * @param {Time} location The event's end time.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.setEnd = function (end) {
		this.end = end;
	};
	/**
	 * <p>Gets the visibility of the event.</p>
	 *
	 * @returns {String} The visibility of the event.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getVisibility = function () {
		return this.visibility;
	};
	/**
	 * <p>Sets the event's visibility.  Acceptable values are:<ul>
	 *  <li>default - Uses the default visibility for events on the calendar. This is the default value.</li>
"	 *  <li>public" - The event is public and event details are visible to all readers of the calendar.</li>
"	 *  <li>private" - The event is private and only event attendees may view event details.</li>
"	 *  <li>confidential" - The event is private. This value is provided for compatibility reasons.</li></ul></p>
	 *
	 * @param {Boolean} visibility The event's visibility.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.setVisibility = function (visibility) {
		if (visibility !== undefined && visibility !== null && visibility.getObjectType() !== "[object String]") {
			throw new InvalidParameterException("visibility must be of type String.");
		}
		if (visibility !== "default" && visibility !== "public" && visibility !== "private" && visibility !== "confidential") {
			throw new InvalidParameterException("Acceptable value for the visibility parameter are: default, public, private, or confidential.");
		}
		this.visibility = visibility;
	};
	/**
	 * <p>Gets the attendees of this event.</p>
	 *
	 * @returns {Array} The attendees of this event.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getAttendees = function () {
		return this.attendees;
	};
	/**
	 * <p>Sets the event's attendees.</p>
	 *
	 * @param {Array} attendees The event's attendees.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.setAttendees = function (attendees) {
		if (attendees !== undefined && attendees !== null && !Array.isArray(attendees)) {
			throw new InvalidParameterException("attendees must be of type Array.");
		}
		this.attendees = attendees;
	};
	/**
	 * <p>Adds an attendee to the the event's attendees list.</p>
	 *
	 * @param {Attendee} attendee Specifies an attendee of the event.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.addAttendee = function (attendee) {
		if (attendee !== undefined && attendee !== null && attendee.getClassType() !== "[class Attendee]") {
			throw new InvalidParameterException("attendees must be of class type Array.");
		}
		this.attendees[this.attendees.length] = attendee;
	};
	/**
	 * <p>Indicates if the general public can add themselves to the event.</p>
	 *
	 * @returns {Boolean} Determines if the general public can add themselves to the event.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.canAnyoneAddSelf = function () {
		return this.anyOneCanAddSelfFlag;
	};
	/**
	 * <p>Determines if anyone can add themselves to the event.</p>
	 *
	 * @param {Boolean} anyOneCanAddSelfFlag The boolean flag that indicates if anyone can add themselves to the event.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.anyOneCanAddSelf = function (anyOneCanAddSelfFlag) {
		if (anyOneCanAddSelfFlag !== undefined && anyOneCanAddSelfFlag !== null && anyOneCanAddSelfFlag.getObjectType() !== "[object Boolean]") {
			throw new InvalidParameterException("anyOneCanAddSelfFlag must be of type Boolean.");
		}
		this.anyOneCanAddSelfFlag = anyOneCanAddSelfFlag;
	};
	/**
	 * <p>Indicates if guests of this event can invite their own guest to this event.</p>
	 *
	 * @returns {Boolean} Determines if guests can invite others to this event.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.canGuestInviteOthers = function () {
		return this.guestCanInviteOthersFlag;
	};
	/**
	 * <p>Determines if guests can event other guests to the event.</p>
	 *
	 * @param {Boolean} guestCanInviteOthersFlag The boolean flag that indicates if guests can event other guests to the event.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.guestCanInviteOthers = function (guestCanInviteOthersFlag) {
		if (guestCanInviteOthersFlag !== undefined && guestCanInviteOthersFlag !== null && guestCanInviteOthersFlag.getObjectType() !== "[object Boolean]") {
			throw new InvalidParameterException("guestCanInviteOthersFlag must be of type Boolean.");
		}
		this.guestCanInviteOthersFlag = guestCanInviteOthersFlag;
	};
	/**
	 * <p>Indicates whether if guest of this event can see other guest of this event.</p>
	 *
	 * @returns {Boolean} Determines if guest of this even can see guest of this event.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.canGuestSeeOtherGuests = function () {
		return this.guestCanSeeOtherGuestsFlag;
	};
	/**
	 * <p>Determines if guests of the event can see other attendee's guests..</p>
	 *
	 * @param {Boolean} guestCanSeeOtherGuestsFlag The boolean flag that indicates if guests of the event can see other attendee's guests.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.guestCanSeeOtherGuests = function (guestCanSeeOtherGuestsFlag) {
		if (guestCanSeeOtherGuestsFlag !== undefined && guestCanSeeOtherGuestsFlag !== null && guestCanSeeOtherGuestsFlag.getObjectType() !== "[object Boolean]") {
			throw new InvalidParameterException("guestCanSeeOtherGuestsFlag must be of type Boolean.");
		}
		this.guestCanSeeOtherGuestsFlag = guestCanSeeOtherGuestsFlag;
	};
}