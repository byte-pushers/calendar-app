'use strict';

/* jasmine specs for services go here */

describe('Service: LoginService', function () {
    // Load the service module
    beforeEach(module('NoesisCodeCalendarApp.services'));

    var service, mockBackend;

    // Initialize the service
    beforeEach(inject(function (_$httpBackend_, LoginService) {
        mockBackend = _$httpBackend_;
        service = LoginService;
    }))

    describe('validateSession() method.', function () {
        it('can validate session.', function (version) {
            var url = null,
                response = null,
                userId = "123456789",
                clientId = "1085080338310.apps.googleusercontent.com",
                scope = "https://www.googleapis.com/auth/userinfo.profile",
                expiresIn = 436,
                oAuthStrategy = CalendarApp.getInstance().findRegisteredOAuthStrategy(CalendarApp.OAuth2Strategies.GOOGLE);
            expect(oAuthStrategy).toBeDefined();
            expect(oAuthStrategy.getAccessTokenValidationUrl()).toBeDefined();
            url = oAuthStrategy.getAccessTokenValidationUrl()+"?access_token=1/fFBGRNJru1FQd44AzqT3Zg&callback=JSON_CALLBACK";
            mockBackend.expectJSONP(url).respond([
                {
                    "audience":clientId,
                    "user_id":userId,
                    "scope":scope,
                    "expires_in":expiresIn
                }
            ]);
            response = service.validateSession().then(function (accessTokenValidationResponse) {
                expect(accessTokenValidationResponse.getAudience()).toEqual(clientId);
                expect(accessTokenValidationResponse.getUserId()).toEqual(userId);
                expect(accessTokenValidationResponse.getScopes()).toEqual([scope]);
                expect(accessTokenValidationResponse.getExpiresIn()).toEqual(expiresIn);
            });
        });
    });
});