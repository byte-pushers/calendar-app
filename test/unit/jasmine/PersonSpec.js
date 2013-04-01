/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 1/3/13
 * Time: 11:05 PM
 * To change this template use File | Settings | File Templates.
 */
describe("Person Test Suite", function(){
    it('can create an Email object', function () {
        var email = new NoesisCode.models.Email("tonte.pouncil@gmail.com", true, "Home");
        expect(email).toBeDefined();
        expect(email.getEmail()).toBe("tonte.pouncil@gmail.com");
        expect(email.isPrimaryEmail()).toBe(true);
        expect(email.getType()).toBe("Home");
    });

    it('can create a Person object', function () {
        var person = new NoesisCode.models.Person("Tonte", "Torrance", "Pouncil");
        expect(person).toBeDefined();
        expect(person.getFirstName()).toBe("Tonte");
        expect(person.getMiddleName()).toBe("Torrance");
        expect(person.getLastName()).toBe("Pouncil");
        expect(person.emails.length).toBe(0);
    });

    it('can assign an email address to a person object', function () {
        var person = new NoesisCode.models.Person("Tonte", "Torrance", "Pouncil");
        expect(person).toBeDefined();
        var email = new NoesisCode.models.Email("tonte.pouncil@gmail.com", true, "Home");
        expect(email).toBeDefined();
        person.addEmail(email);
        expect(person.emails.length).toBe(1);
    });

    it('can assign an email addresses to a person one-by-one', function () {
        var person = new NoesisCode.models.Person("Tonte", "Torrance", "Pouncil");
        expect(person).toBeDefined();
        var email1 = new NoesisCode.models.Email("tonte.pouncil@gmail.com", true, "Home");
        var email2 = new NoesisCode.models.Email("pouncilt.developer@gmail.com", true, "Work");
        expect(email1).toBeDefined();
        expect(email2).toBeDefined();
        person.addEmail(email1);
        person.addEmail(email2);
        expect(person.emails.length).toBe(2);
    });

    it('can find email address of type "Home"', function () {
        var person = new NoesisCode.models.Person("Tonte", "Torrance", "Pouncil");
        expect(person).toBeDefined();
        var email1 = new NoesisCode.models.Email("tonte.pouncil@gmail.com", true, "Home");
        var email2 = new NoesisCode.models.Email("pouncilt.developer@gmail.com", true, "Work");
        expect(email1).toBeDefined();
        expect(email2).toBeDefined();
        person.addEmail(email1);
        person.addEmail(email2);
        expect(person.emails.length).toBe(2);
        var existingEmail = person.findEmailByType("Home");
        expect(existingEmail).not.toBeNull();
        expect(existingEmail.getType()).toBe("Home");
    });

    it('can assign an email addresses to a person all at once', function () {
        var person = new NoesisCode.models.Person("Tonte", "Torrance", "Pouncil");
        expect(person).toBeDefined();
        var email1 = new NoesisCode.models.Email("tonte.pouncil@gmail.com", true, "Home");
        var email2 = new NoesisCode.models.Email("pouncilt.developer@gmail.com", true, "Work");
        expect(email1).toBeDefined();
        expect(email2).toBeDefined();
        var emails = [email1, email2];
        person.setEmails(emails);
        expect(person.emails.length).toBe(2);
    });
});