/*global NoesisCodeExceptions*/
/**
 * Creates a Email object that represents an email address.
 * 
 * @class Represents an email address.
 * @param {<a href="http://www.w3schools.com/js/js_obj_string.asp">String</a>} emailAddress The email address of a person or group.
 * @param {<a href="http://www.w3schools.com/js/js_obj_boolean.asp">Boolean</a>} primaryEmail Indicates whether this email address is the primary email address for a person or group.
 * @param {<a href="http://www.w3schools.com/js/js_obj_string.asp">String</a>} type Indicates whether the email address if of type: Home, School, Work, or Other.
 * 
 * @returns An instance of the Email class.
 * 
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
*/
var NoesisCode = NoesisCode || {};
NoesisCode.models = NoesisCode.namespace("com.noesiscode.models");
NoesisCode.models.Email = function (emailAddress, primaryEmail, type) {
	"use strict";
	/**
	 * <p>Represents an email address.</p>
	 * @field
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.emailAddress = emailAddress;
	/**
	 * <p>Represents a boolean flag that indicates if this email address is the primary email address.</p>
	 * @field
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.primaryEmail = primaryEmail;
	// ToDo: need to re-factor this into an enum.
	if (type !== undefined || type !== null) {
		if (type !== "Home" && type !== "School" && type !== "Work" && type !== "Other") {
			throw new NoesisCode.exceptions.InvalidParameterException("Parameter type must be equal to: 'Home', 'School', 'Work', or 'Other'");
		}
	}
	/**
	 * <p>Indicates whether this email address is of type: Home, School, Work, or Other.</p>
	 * @field
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.type = type;
	/**
	 * <p>Gets the email type.</p> 
	 * <p>This method could return for example: Home, Work, School, or Other.</p>
	 *
	 * @returns {String} The defined type of the email address.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getType = function () {
		return this.type;
	};
	/**
	 * <p>Determines if the email address is the primary email address.</p>
	 *
	 * @returns {Boolean} True if email address is the primary email address.  Otherwise return false.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.isPrimaryEmail = function () {
		return this.primaryEmail;
	};
	/**
	 * <p>Gets the email address.</p>
	 *
	 * @returns {String} The email address defined for this person or group.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getEmail = function () {
		return this.emailAddress;
	};
};
NoesisCode.models.Email.isEmail = function (someEmail) {
    "use strict";
    var result = false;
    if (Object.isDefined(someEmail)) {
        if (typeof someEmail === "object" && someEmail instanceof NoesisCode.models.Email) {
            result = true;
        }
    }

    return result;
};
/**
 * Creates a Person object that represents an actual person.
 * 
 * @class Represents a Person.
 * @param {<a href="http://www.w3schools.com/js/js_obj_string.asp">String</a>} fisrtName The first name of a person.
 * @param {<a href="http://www.w3schools.com/js/js_obj_string.asp">String</a>} middleName The middle name of the person.
 * @param {<a href="http://www.w3schools.com/js/js_obj_string.asp">String</a>} lastName The last name of the person.
 * 
 * @returns An instance of the Person class.
 * 
 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
*/
NoesisCode.models.Person = function (firstName, middleName, lastName) {
	"use strict";
	if (firstName === "undefined" || firstName === null) {
		throw new NoesisCode.exceptions.NullPointerException("firstName can not be null.");
	}
	/**
	 * <p>Represents the first name of a person.</p>
	 * @field
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.firstName = firstName;
	/**
	 * <p>Represents the middle name of a person.</p>
	 * @field
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.middleName = middleName;
	/**
	 * <p>Represents the last name of a person.</p>
	 * @field
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.lastName = lastName;
	/**
	 * <p>Represents the nick name of a person.</p>
	 * @field
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.nickName = null;
	/**
	 * <p>Represents the associated email addresses of a person.</p>
	 * @field
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.emails = [];
	/**
	 * <p>Gets the display name of the person.</p>
	 *
	 * @returns {String} The display name for this person.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getDisplayName = function () {
		var displayName = firstName;
		if (this.nickName !== undefined && this.nickName !== null) {
			displayName = this.nickName;
		} else {
			if (this.lastName !== undefined && this.lastName !== null) {
				displayName = displayName + " " + this.lastName;
			}
		}
		return displayName;
	};
	/**
	 * <p>Gets the first name of the person.</p>
	 *
	 * @returns {String} The first name for this person.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getFirstName = function () {
		return this.firstName;
	};
	/**
	 * <p>Gets the middle name of the person.</p>
	 *
	 * @returns {String} The middle name for this person.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getMiddleName = function () {
		return this.middleName;
	};
	/**
	 * <p>Gets the last name of the person.</p>
	 *
	 * @returns {String} The last name for this person.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.getLastName = function () {
		return this.lastName;
	};
	/**
	 * <p>Sets the email addresses for the person.</p> 
	 *
	 * 
	 * @param {Array} emails An array of associated email addresses.
	 *
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.setEmails = function (emails) {
		if (!emails.isArray()) {
			throw new NoesisCode.exceptions.InvalidParameterException("emails must be an Arrary.");
		}
		this.emails = emails;
	};
	this.getEmails = function () {
		return this.emails;
	};
	/**
	 * <p>Adds an email address to the associated email addresses of the person.</p>
	 *
	 * @param {String} email An email address to be added to the associated email addresses.
	 *
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.addEmail = function (email) {
		if (!NoesisCode.models.Email.isEmail(email)) {
			throw new NoesisCode.exceptions.InvalidParameterException("email must be of class type Email.");
		}
		this.emails[this.emails.length] = email;
	};
	/**
	 * <p>A convenience method to find email address by type.</p>
	 *
	 * @param {String} type The type of email address to search for.
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.findEmailByType = function (type) {
		var emailResult = null;
        if (type === "undefined" || type === null) {
			throw new NoesisCode.exceptions.NullPointerException("type can not be null.");
		}
        this.emails.forEach(function (email, index) {
            if (email.getType() === type) {
                emailResult =  email;
            }
        });
		return emailResult;
	};
	/**
	 * <p>A convenience method to find the primary email address.</p>
	 *
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.findPrimaryEmail = function () {
		var emailResult = null;
        this.emails.forEach(function (email, index) {
            if (email.isPrimaryEmail()) {
                emailResult = email;
            }
        });
		return emailResult;
	};
	/**
	 * <p>Sets the nick name of the person.</p> 
	 *
	 * 
	 * @param {String} nickName The nick name of the person.
	 *
	 * @author <a href="mailto:pouncilt.developer@gmail.com">Tont&eacute; Pouncil</a>
	*/
	this.setNickName = function (nickName) {
		this.nickName = nickName;
	};
};
NoesisCode.models.Person.isPerson = function (somePerson) {
    "use strict";
    var result = false;
    if (Object.isDefined(somePerson)) {
        if (typeof somePerson === "object" && somePerson instanceof NoesisCode.models.Person) {
            result = true;
        }
    }

    return result;
};
