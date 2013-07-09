/*global NoesisCode*/
/**
 * Creates a CalendarApp.models.DateRange object that represents a date range.
 * 
 * @class Represents a date range.
 * @param {<a href="http://www.w3schools.com/js/jsref_obj_date.asp">Date</a>} start The start date of the date range.
 * @param {<a href="http://www.w3schools.com/js/jsref_obj_date.asp">Date</a>} end The end date of the date range.
 * 
 * @returns An instance of the CalendarApp.models.DateRange class.
 * 
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
*/
var CalendarApp = CalendarApp || {};
CalendarApp.models = CalendarApp.namespace("com.noesiscode.calendar.models");
CalendarApp.models.DateRange = function (start, end) {
	"use strict";
	if (start === "undefined" || start === null) {
		throw new NoesisCode.exceptions.NullPointerException("start can not be null.");
	}

    if (start.getClassType() !== "[class Date]") {
		throw new NoesisCode.exceptions.InvalidParameterException("start must be an Date object.");
	}
	if (end !== undefined && end !== null) {
		if (end.getClassType() !== "[class Date]") {
			throw new NoesisCode.exceptions.InvalidParameterException("end must be an Date object.");
		}
		if (end.getTime() < start.getTime()) {
			throw new NoesisCode.exceptions.InvalidDateRangeException("end date can not come before start date.");
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
	this.isDateBetweenRange = function (date) {
		if (start.getFullYear() <= date.getFullYear() && end.getFullYear() >= date.getFullYear()) {
			if (start.getMonth() <= date.getMonth() && end.getMonth() >= date.getMonth()) {
				if (start.getDate() <= date.getDate() && end.getDate() >= date.getDate()) {
					return true;
				}
			}
		}
		return false;
	};
    this.isDateAndTimeBetweenRange = function (date) {
        if (start.getFullYear() <= date.getFullYear() && end.getFullYear() >= date.getFullYear()) {
            if (start.getMonth() <= date.getMonth() && end.getMonth() >= date.getMonth()) {
                if (start.getDate() <= date.getDate() && end.getDate() >= date.getDate()) {
                    if (start.getHours() <= date.getHours() && end.getHours() >= date.getHours()) {
                        if (start.getHours() === date.getHours()) {
                            if (start.getMinutes() <= date.getMinutes()) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                        if (end.getHours() === date.getHours()) {
                            if (end.getMinutes() >= date.getMinutes()) {
                                return true;
                            } else {
                                return false;
                            }
                        }

                        return true;
                    }
                }
            }
        }
        return false;
    };
    this.calculateDuration = function () {
        var duration,
            durationInHours,
            durationInHoursAndMinutes,
            durationInMinutes,
            msg;

        if (this.start > this.end) {
            msg = "EndDate(" + this.end.toString() + ") can be before StartDate(" + this.start.toString() + ").";
            throw new NoesisCode.exceptions.InvalidDateRangeException(msg);
        }

        if (this.start.isDateEqualToDateAndTime(this.end)) {
            msg = "StartDate(" + this.start.toString() + ") and EndDate(" + this.end.toString() + ") can not equal each other.";
            throw new NoesisCode.exceptions.InvalidDateRangeException(msg);
        }

        duration = this.end.getTime() - this.start.getTime();
        durationInHoursAndMinutes = (duration / (1000 * 60 * 60)).toFixed(2);
        durationInHours = Math.floor(durationInHoursAndMinutes);
        durationInMinutes = CalendarApp.models.DateRange.roundToNearestQuarterHour(Math.abs(durationInHours - durationInHoursAndMinutes).toFixed(2));


        return durationInHours + (durationInMinutes / 100);
    };
};
CalendarApp.models.DateRange.roundToNearestQuarterHour = function (hourFraction) {
    "use strict";
    if (hourFraction < 0.25) {
        return 0;
    } else if (hourFraction >= 0.25 && hourFraction < 0.50) {
        return 15;
    } else if (hourFraction >= 0.50 && hourFraction < 0.75) {
        return 30;
    } else if (hourFraction >= 0.75 && hourFraction < 1) {
        return 45;
    }
};
CalendarApp.models.DateRange.convertQuarterHourToDecimalEquivalent  = function (quarterHour) {
    "use strict";
    if (quarterHour < 15) {
        return 0.00;
    } else if (quarterHour >= 15 && quarterHour < 30) {
        return 0.25;
    } else if (quarterHour >= 30 && quarterHour < 45) {
        return 0.50;
    } else if (quarterHour >= 45 && quarterHour < 60) {
        return 0.75;
    }
};
/**
 * Creates a CalendarApp.models.Attendee object that represents an attendee of an event.
 * 
 * @class Represents an attendee of an event.
 * @param {@link NoesisCodeModels.Person} person The person that will be attending the event.
 * @param {<a href="http://www.w3schools.com/js/jsref_obj_boolean.asp">Boolean</a>} organizer Indicates if this attendee is the organizer of the event.
 * @param {<a href="http://www.w3schools.com/js/jsref_obj_boolean.asp">Boolean</a>} optional Indicates if this is an optional attendee.
 * 
 * @returns An instance of the CalendarApp.models.DateRange class.
 * 
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
*/
CalendarApp.models.Attendee = function (person, organizer, /* self, resource,*/ optional) {
	"use strict";
    this.getClassName = function () {
        return "CalendarApp.models.Attendee";
    };
	if (person === "undefined" || person === null) {
		throw new NoesisCode.exceptions.NullPointerException("person can not be null.");
	}
	if (person.getClassType() !== "[class Person]") {
		throw new NoesisCode.exceptions.InvalidParameterException("person must be of class type NoesisCode.models.Person.");
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
		this.organizer = organizer;
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
        if (additionalGuests !== undefined && additionalGuests !== null && additionalGuests.isArray()) {
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
	 * @param {CalendarApp.models.Attendee} attendee An additional guest of the attendee.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.addAdditionalGuest = function (attendee) {
        if (attendee === undefined || attendee === null || attendee.getClassType() !== "[class CalendarApp.models.Attendee]") {
			throw new NoesisCode.exceptions.InvalidParameterException("attendee must be of class type CalendarApp.models.Attendee.");
		}
		this.additionalGuests[this.additionalGuests.length] = attendee;
	};
};

CalendarApp.models.Event = function (jsonObject) {
	"use strict";
    this.getClassName = function () {
        return "CalendarApp.models.Event";
    };
	this.id = (jsonObject !== undefined && jsonObject.id !== undefined) ? jsonObject.id : null;
	this.status = (jsonObject !== undefined && jsonObject.status !== undefined) ? jsonObject.status : null;
	this.htmlLink = (jsonObject !== undefined && jsonObject.htmlLink !== undefined) ? jsonObject.htmlLink : null;
	this.created = (jsonObject !== undefined && jsonObject.created !== undefined) ? jsonObject.created : null;
	this.updated = (jsonObject !== undefined && jsonObject.updated !== undefined) ? jsonObject.updated : null;
	this.summary = (jsonObject !== undefined && jsonObject.summary !== undefined) ? jsonObject.summary : null;
	this.description = (jsonObject !== undefined && jsonObject.description !== undefined) ? jsonObject.description : null; //optional;
	this.location = (jsonObject !== undefined && jsonObject.location !== undefined) ? jsonObject.location : null; //optional;
	this.colorId = (jsonObject !== undefined && jsonObject.colorId !== undefined) ? jsonObject.colorId : null;
	this.creator = (jsonObject !== undefined && jsonObject.creator !== undefined) ? jsonObject.creator : null; //Person Object with email and displayName
	this.organizer = (jsonObject !== undefined && jsonObject.organizer !== undefined) ? jsonObject.organizer : null; //Person Object with email and displayName
	this.start = (jsonObject !== undefined && jsonObject.start !== undefined) ? NoesisCode.converters.DateConverter.convertToISO8601Date(jsonObject.start) : null;	// Start date, dateTime, timeZone
	this.end = (jsonObject !== undefined && jsonObject.end !== undefined) ? NoesisCode.converters.DateConverter.convertToISO8601Date(jsonObject.end) : null; // End date, dateTime, timeZone
	this.visibility = (jsonObject !== undefined && jsonObject.visibility !== undefined) ? jsonObject.visibility : null;
	this.attendees = (jsonObject !== undefined && jsonObject.attendees !== undefined) ? jsonObject.attendees : null; // list of attendees of the event attendee.email
					// attendee.displayName, attendee.organizer, attendee.resource, 
					// attendee.optional, attendee.responseStatus, attendee.comment, 
					// attendee.additionalGuests
	this.anyOneCanAddSelfFlag = (jsonObject !== undefined && jsonObject.anyOneCanAddSelfFlag !== undefined) ? jsonObject.anyOneCanAddSelfFlag : null;
	this.guestCanInviteOthersFlag = (jsonObject !== undefined && jsonObject.guestCanInviteOthersFlag !== undefined) ? jsonObject.guestCanInviteOthersFlag : null;
	this.guestCanSeeOtherGuestsFlag = (jsonObject !== undefined && jsonObject.guestCanSeeOtherGuestsFlag !== undefined) ? jsonObject.guestCanSeeOtherGuestsFlag : null;
	//this.reminders;
	// reminders.useDefault, reminders.overrides[],
    // reminder.overrides[].method, reminder.overrides[].minutes
    this.zIndex = CalendarApp.models.Event.defaultZIndex;
    this.indentWidth = 5;
    this.indentWidthIncreasedStatus = false;
    this.eventsWithSameStartTime = [];
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
		if (id === undefined || id === null || id.getObjectType() !== "[object Number]") {
			throw new NoesisCode.exceptions.InvalidParameterException("id must be of type Number.");
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
		if (status === undefined || status === null || status.getObjectType() !== "[object String]") {
			throw new NoesisCode.exceptions.InvalidParameterException("status must be of type String.");
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
		if (htmlLink === undefined || htmlLink === null || htmlLink.getObjectType() !== "[object String]") {
			throw new NoesisCode.exceptions.InvalidParameterException("htmlLink must be of type String.");
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
		if (created === undefined || created === null || created.getObjectType() !== "[object Date]") {
			throw new NoesisCode.exceptions.InvalidParameterException("created must be of type Date.");
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
		if (updated === undefined || updated === null || updated.getObjectType() !== "[object Date]") {
			throw new NoesisCode.exceptions.InvalidParameterException("updated must be of type Date.");
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
		if (summary === undefined || summary === null || summary.getObjectType() !== "[object String]") {
			throw new NoesisCode.exceptions.InvalidParameterException("summary must be of type String.");
		}
		this.summary = summary;
	};
	/**
	 * <p>Gets the description of event.</p>
	 *
	 * @returns {String} The description of the event.
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
		if (description === undefined || description === null || description.getObjectType() !== "[object String]") {
			throw new NoesisCode.exceptions.InvalidParameterException("summary must be of type String.");
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
		if (location === undefined || location === null || location.getObjectType() !== "[object String]") {
			throw new NoesisCode.exceptions.InvalidParameterException("location must be of type String.");
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
		if (colorId === undefined || colorId === null || colorId.getObjectType() !== "[object String]") {
			throw new NoesisCode.exceptions.InvalidParameterException("colorId must be of type String.");
		}
		this.colorId = colorId;
	};
	/**
	 * <p>Gets the creator of this event.</p>
	 *
	 * @returns {NoesisCodeModels.Person} The creator of the event.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getCreator = function () {
		return this.creator;
	};
	/**
	 * <p>Sets the event's creator.</p>
	 *
	 * @param {NoesisCodeModels.Person} location The event's creator.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.setCreator = function (creator) {
		if (creator === undefined || creator === null || creator.getClassType() !== "[class Person]") {
			throw new NoesisCode.exceptions.InvalidParameterException("creator must be of class type NoesisCodeModels.Person.");
		}
		this.creator = creator;
	};
	/**
	 * <p>Gets the organizer of event.</p>
	 *
	 * @returns {NoesisCodeModels.Person} The organizer of the event.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getOrganizer = function () {
		return this.organizer;
	};
	/**
	 * <p>Sets the event's organizer.</p>
	 *
	 * @param {NoesisCodeModels.Person} organizer The event's organizer.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.setOrganizer = function (organizer) {
		if (organizer === undefined || organizer === null || organizer.getClassType() !== "[class Person]") {
			throw new NoesisCode.exceptions.InvalidParameterException("organizer must be of class type NoesisCodeModels.Person.");
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
		this.start = new Date(start.getTime());
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
		this.end = new Date(end.getTime());
	};
	/**
	 * <p>Gets the visibility of the event.</p>
	 *
	 * @returns {Boolean} The visibility of the event.
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
		if (visibility === undefined || visibility === null || visibility.getObjectType() !== "[object String]") {
			throw new NoesisCode.exceptions.InvalidParameterException("visibility must be of type String.");
		}
		if (visibility !== "default" && visibility !== "public" && visibility !== "private" && visibility !== "confidential") {
			throw new NoesisCode.exceptions.InvalidParameterException("Acceptable value for the visibility parameter are: default, public, private, or confidential.");
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
		if (attendees === undefined || attendees === null || !attendees.isArray()) {
			throw new NoesisCode.exceptions.InvalidParameterException("attendees must be of type Array.");
		}
		this.attendees = attendees;
	};
	/**
	 * <p>Adds an attendee to the the event's attendees list.</p>
	 *
	 * @param {CalendarApp.models.Attendee} attendee Specifies an attendee of the event.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.addAttendee = function (attendee) {
		if (attendee === undefined || attendee === null || attendee.getClassType() !== "[class CalendarApp.models.Attendee]") {
			throw new NoesisCode.exceptions.InvalidParameterException("attendees must be of class type Array.");
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
		if ((anyOneCanAddSelfFlag === undefined || anyOneCanAddSelfFlag === null) && (anyOneCanAddSelfFlag.getObjectType() !== "[object Boolean]")) {
			throw new NoesisCode.exceptions.InvalidParameterException("anyOneCanAddSelfFlag must be of type Boolean.");
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
		if (guestCanInviteOthersFlag === undefined || guestCanInviteOthersFlag === null || guestCanInviteOthersFlag.getObjectType() !== "[object Boolean]") {
			throw new NoesisCode.exceptions.InvalidParameterException("guestCanInviteOthersFlag must be of type Boolean.");
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
		if (guestCanSeeOtherGuestsFlag === undefined || guestCanSeeOtherGuestsFlag === null || guestCanSeeOtherGuestsFlag.getObjectType() !== "[object Boolean]") {
			throw new NoesisCode.exceptions.InvalidParameterException("guestCanSeeOtherGuestsFlag must be of type Boolean.");
		}
		this.guestCanSeeOtherGuestsFlag = guestCanSeeOtherGuestsFlag;
	};
	this.reschedule = function (newStartDate, newEndDate) {
		if (newStartDate !== undefined && newStartDate !== null) {
            this.start.setFullYear(newStartDate.getFullYear(), newStartDate.getMonth(), newStartDate.getDate());
            this.start.setHours(newStartDate.getHours(), newStartDate.getMinutes());
        }
        if (newEndDate !== undefined && newEndDate !== null) {
		    this.end.setFullYear(newEndDate.getFullYear(), newEndDate.getMonth(), newEndDate.getDate());
            this.end.setHours(newEndDate.getHours(), newEndDate.getMinutes());
        }
	};
    this.resetDisplay = function () {
        this.zIndex = CalendarApp.models.Event.defaultZIndex;
        this.indentWidth = 5;
        this.indentWidthIncreasedStatus = false;
        this.eventsWithSameStartTime = [];
    };
    this.getTotalNumberOfEventsWithSameStartTime = function () {
        return this.eventsWithSameStartTime.length + 1;
    };
    this.setZIndex = function (zIndex) {
        this.zIndex = zIndex;
    };
    this.getZIndex = function () {
        return this.zIndex;
    };
    /**
     * <p>Returns the default zIndex value..</p>
     *
     * Note: IE8 has problems finding CalendarApp.models.Event.defaultZIndex
     * from with inside deep nested Array.forEach Methods.  When this occurs,
     * use this method instead.
     *
     * @returns {Integer} of the default zIndex value.
     * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
     */
    this.getDefaultZIndex = function () {
        return CalendarApp.models.Event.defaultZIndex;
    }
    this.setIndentWidth = function (indentWidth) {
        this.indentWidth = indentWidth;
    };
    this.getIndentWidth = function () {
        return this.indentWidth;
    };
    this.setEventsWithSameStartTime = function (eventsWithSameStartTime) {
        this.eventsWithSameStartTime = eventsWithSameStartTime;
    };
    this.getEventsWithSameStartTime = function () {
        return this.eventsWithSameStartTime;
    };
    this.compareStartTimes = function (someEvent) {
        if (this.getStart() < someEvent.getStart()) {
            return -1;
        } else if (this.getStart() > someEvent.getStart()) {
            return 1;
        } else {
            return 0;
        }
    };
    this.compareEndTimes = function (someEvent) {
        if (this.getEnd() < someEvent.getEnd()) {
            return -1;
        } else if (this.getEnd() > someEvent.getEnd()) {
            return 1;
        } else {
            return 0;
        }
    };
    this.indentWidthWasIncreased = function (indentWidthIncreased) {
        this.indentWidthIncreasedStatus = (indentWidthIncreased !== undefined && indentWidthIncreased !== null) ? indentWidthIncreased : this.indentWidthIncreasedStatus;
        return this.indentWidthIncreasedStatus;
    };
    this.hasConflictingStartTimes = function (someEvent) {
        var dateRange = new CalendarApp.models.DateRange(this.start, this.end),
            startTimeConflict = dateRange.isDateAndTimeBetweenRange(someEvent.getStart()),
            endTimeConflict = dateRange.isDateAndTimeBetweenRange(someEvent.getEnd());

        if (!startTimeConflict && !endTimeConflict) {
            return 0;
        } else if (startTimeConflict && !endTimeConflict) {
            return 1;
        } else if (startTimeConflict && endTimeConflict) {
            return 2;
        } else if (!startTimeConflict && endTimeConflict) {
            return 3;
        }
    };
    this.hasDifferentStartTime = function (someEvent) {
        if (this.getStart().isDateEqualToDateAndTime(someEvent.getStart())) {
            return false;
        }
        return true;
    };
};
/**
 * <p>Static Method that compares the start times of two events.</p>
 *
 * Note: Take care in calling static methods deep inside nested Array looping function.
 * IE8 has problems finding CalendarApp.models.Event
 * @static
 * @Method
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
CalendarApp.models.Event.compareStartTimes = function (event1, event2) {
    return event1.compareStartTimes(event2);
};
/**
 * <p>Static Method that compares the end times of two events.</p>
 *
 * Note: Take care in calling static methods deep inside nested Array looping function.
 * IE8 has problems finding CalendarApp.models.Event
 * @static
 * @Method
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
CalendarApp.models.Event.compareEndTimes = function (event1, event2) {
    "use strict";
    return event1.compareEndTimes(event2);
};
/**
 * <p>Static Method that compares the start times of two events.</p>
 *
 * Note: Take care in using static fields deep inside nested Array looping function.
 * Instead of calling this static field directly use the event.getDefaultZIndex() method.
 * IE8 has problems finding CalendarApp.models.Event
 *
 *
 * @static
 * @Field
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
 */
CalendarApp.models.Event.defaultZIndex = 1;
