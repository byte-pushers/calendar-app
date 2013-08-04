/**
 * Created with JetBrains WebStorm.
 * User: pouncilt
 * Date: 11/10/12
 * Time: 7:40 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('NoesisCodeCalendarApp.services', ['ngResource']).
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
    factory('LoginService', function ($window, $location, $log, $http, $q, $rootScope) {
        var accessToken = {
                empty: true,
                isEmpty: function () {
                    return this.empty;
                },
                reset: function (){
                    for (var propName in this) {
                        if (propName !== undefined &&
                            propName !== null &&
                            propName !== "empty" &&
                            propName !== "isEmpty" &&
                            propName !== "reset" &&
                            this.hasOwnProperty(propName)) {
                            delete this[propName];
                        }
                    }

                    this.empty = true;
                }
            },
            processAccessToken = function (){
                var queryString = $location.path().substring(1),  // $location.search()
                    regex = /([^&=]+)=([^&]*)/g,
                    m;

                    $log.info("url:"+$location.absUrl());
                    while (m = regex.exec(queryString)) {
                        accessToken[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
                        if(accessToken.isEmpty()) {
                            accessToken.empty = false;
                        }
                    }
                if (accessToken.isEmpty()) {
                    throw "accessToken can not be emtpy";
                }
            },
            saveAccessTokenToSession = function () {
                if (accessToken.isEmpty()) {
                    throw "accessToken can not be empty";
                }
                if(accessToken && accessToken.access_token && accessToken.expires_in){
                    //$scope.accessToken = accessToken.access_token;
                    var currentTime = new Date();
                    currentTime.setTime(currentTime.getTime() + (accessToken.expires_in * 1000));
                    $window.sessionStorage.accessToken = accessToken.access_token;
                    $window.sessionStorage.expiresAt = currentTime;
                }
            },
            resetSession = function () {
                accessToken.reset();
                if ($window && $window.sessionStorage) {
                    if ($window.sessionStorage.accessToken) {
                        delete $window.sessionStorage.accessToken;
                    }
                    if ($window.sessionStorage.expiresAt) {
                        delete $window.sessionStorage.expiresAt;
                    }
                }
            },
            processValidationResponse = function (validationResponse) {
                //TODO: check for error attribute and save error message.
                //TODO: save session state in the sessionStorage to be equal to valid or invalid.
                //TODO: refresh session, if validationResponse has error message.
                return true;
            },
            processAuthenticateUserResponse = function () {
                resetSession();
                processAccessToken();
                saveAccessTokenToSession();
                //sendValidationRequest();
            },
            sessionExist = function () {
                var sessionExistStatus = false;
                if ($window &&
                    $window.sessionStorage &&
                    $window.sessionStorage.accessToken &&
                    $window.sessionStorage.expiresAt) {
                    sessionExistStatus = true;
                }

                return sessionExistStatus;
            },
            getSession = function () {
                var session = {
                    accessToken:null,
                    expiresAt: null
                };

                if(sessionExist()){
                    session.accessToken = $window.sessionStorage.accessToken;
                    session.expiresAt = $window.sessionStorage.expiresAt;
                }

                return session;
            },
            getAccessToken = function () {
                try {
                    if ($window.sessionStorage) {
                        return $window.sessionStorage.accessToken;
                    } else {
                        throw "Browser does not support Web Storage APIs."
                    }
                } catch (e) {
                    throw "Access Token can not be undefined or null."
                }
            },
            sendValidationRequest = function () {
                var validationResponseProcessed = false;
                //send validation request to google api.
                $http.get('https://www.googleapis.com/oauth2/v1/tokeninfo', {params: {access_token: getAccessToken()}
                }).success(function(data, status, headers, config) {
                    // Do something successful.
                    validationResponseProcessed = processValidationResponse(data);
                }).error(function(data, status, headers, config) {
                    // TODO: Handle the error
                    $log.error("Error occurred during sendValidationRequest() method: " + status);
                });
                return validationResponseProcessed;
            },
            isSessionNotValid = function () {
                var sessionStatus = "invalid";
                if ($window &&
                    $window.sessionStorage &&
                    $window.sessionStorage.sessionStatus) {
                    sessionStatus = $window.sessionStorage.sessionStatus;
                }

                return sessionStatus;
            },
            getAction = function () {
                var queryString = $location.path().substring(1),  // $location.search()
                    regex = /([^&=]+)=([^&]*)/g,
                    m,
                    action = null;

                while (m = regex.exec(queryString)) {
                    if (m[1] === "state") {
                        action = decodeURIComponent(m[2]);
                        break;
                    }
                }

                return action;
            },
            sendAuthenticateUserRequest = function () {
                var deferred = $q.defer()/*,
                    oauth2 = {
                        endPointUrl: "https://accounts.google.com/o/oauth2/auth",
                        clientId: "1085080338310.apps.googleusercontent.com",
                        responseType: "token",
                        redirectUrl: "http://localhost:8080/calendar-app/processAuthenticateUserResponse",
                        scope: "https://www.googleapis.com/auth/userinfo.profile",
                        state: "ProcessAuthenticatedUserResponse"
                    }*/;

                /*$window.open(oauth2.endPointUrl +
                    "?scope=" + oauth2.scope +
                    "&state=" + oauth2.state +
                    "&redirect_uri=" + oauth2.redirectUrl +
                    "&response_type=" + oauth2.responseType +
                    "&client_id=" + oauth2.clientId,
                    "_self");*/

                deferred.resolve(true);

                return deferred.promise;
            },
            getAccessToken = function () {
                var deferred = $q.defer(),
                    action = getAction(),
                    accessToken = null;

                if (action === "ProcessAuthenticatedUserResponse"){
                    processAuthenticateUserResponse();
                }

                if(sessionExist()){
                    accessToken = {};
                    accessToken.token = getSession().accessToken;
                    accessToken.expiresAt = getSession().expiresAt;
                }

                if(accessToken == null){
                    deferred.reject(new Error("No Access Token"));
                } else {
                    deferred.resolve(accessToken);
                }

                return deferred.promise;
            },
            validateAccessToken = function (){
                var deferred = $q.defer(),
                    accessTokenValidated = false;

                if (sessionExist()) {
                    accessTokenValidated = sendValidationRequest();
                }

                if (accessTokenValidated) {
                    deferred.resolve(accessTokenValidated);
                } else {
                    deferred.reject(new Error("Access Token Validation Failed."));
                }

                return deferred.promise;
            },
            validateSession = function () {
                var promise = getAccessToken();
                return promise.then(validateAccessToken());
            };

        $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
            if (current.loadedTemplateUrl !== "partials/login.html") {
                $location.path( "/login" );
            }
        });

        return {
            sendAuthenticateUserRequest: sendAuthenticateUserRequest,
            validateSession: validateSession
        };
    });