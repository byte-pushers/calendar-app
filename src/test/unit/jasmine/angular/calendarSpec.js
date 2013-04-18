describe("MyCalendar API", function(){
	// load the application relevant modules
	beforeEach(module('calendar', function($provide) {
	    
	}));
	
	// The inject() will create the injector and inject the a and
	// into the tests. The test need not concern itself with
	// wiring of the application, only with testing it.
	it("should be 123", inject(function(a){
		expect(a).toBeDefined();
	    expect(a).toEqual(123);
	}));
});