/*global CalendarApp,NoesisCode*/
/*jslint regexp: true*/
/**
 * Created with JetBrains WebStorm.
 * User: pouncilt
 * Date: 11/10/12
 * Time: 7:40 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('NoesisCodeCalendarApp.services', ['ngResource', 'ng']).
    run(function ($window, $location, $log, $http, $q, $injector) {
        "use strict";
        // This is need for AngularJS 1.0.7 to get CORS request to work.
        // See https://github.com/angular/angular.js/issues/1004 to detail discussion.
        //  delete $httpProvider.defaults.headers.common['X-Requested-With'];
        var googleOAuthConfiguration = {
                endPointUrl: "https://accounts.google.com/o/oauth2/auth",
                clientId: "1085080338310.apps.googleusercontent.com",
                responseType: "token",
                redirectUrl: "http://calendar-app.noesiscode.cloudbees.net",
                scopes: ["https://www.googleapis.com/auth/userinfo.profile"],
                state: "Initializing",
                accessTokenValidationUrl: "https://www.googleapis.com/oauth2/v1/tokeninfo"
            };

        CalendarApp.getInstance().registerOAuthStrategy(
            CalendarApp.OAuth2Strategies.GOOGLE,
            $injector.instantiate(
                NoesisCode.oauth.OAuth2Strategy,
                {someContext: new NoesisCode.oauth.models.OAuth2Context(googleOAuthConfiguration)}
            ),
            true
        );
    }).
    factory('CalendarEventService', function ($resource) {
        "use strict";
        return $resource('data/events/:eventId.json', {}, {
            query: {method: 'GET', params: {eventId: 'events'}, isArray: true}
        });
    }).
    factory('CalendarDayHoursService', function ($resource) {
        "use strict";
        return $resource('data/:dayHoursId.json', {}, {
            query: {method: 'GET', params: {dayHoursId: 'dayHours'}, isArray: true}
        });
    }).
    factory('GoogleOAuth2Service', function ($resource) {
        "use strict";
        var validateAccessToken = function (accessToken) {
            return $resource('https://www.googleapis.com/oauth2/v1/tokeninfo', {access_token: accessToken});
        };

        return {
            validateAccessToken: validateAccessToken
        };
    }).
    factory('LoginService', function ($window, $location, $q, $rootScope) {
        "use strict";
        var sendAuthenticateUserRequest = function (oauthStrategyProvider) {
                var oauthStrategy = CalendarApp.getInstance().findRegisteredOAuthStrategy(oauthStrategyProvider);
                CalendarApp.getInstance().markRegisteredOAuthStrategyAsSelected(oauthStrategy);
                return oauthStrategy.sendAuthenticateUserRequest();
            },
            validateSession = function () {
                return CalendarApp.getInstance().findSelectedRegisteredOAuthStrategy().validateSession();
            };

        $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
            if (current.loadedTemplateUrl !== "partials/login.html") {
                $location.path("/login");
            }
        });

        return {
            sendAuthenticateUserRequest: sendAuthenticateUserRequest,
            validateSession: validateSession
        };
    });