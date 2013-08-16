/*jslint regexp: true */
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
        "use strict";
        var accessToken = {
                empty: true,
                isEmpty: function () {
                    return this.empty;
                },
                reset: function () {
                    var propName;
                    for (propName in this) {
                        if (this.hasOwnProperty(propName)) {
                            if (propName !== undefined &&
                                    propName !== null &&
                                    propName !== "empty" &&
                                    propName !== "isEmpty" &&
                                    propName !== "reset") {
                                delete this[propName];
                            }
                        }
                    }

                    this.empty = true;
                }
            },
            processAccessToken = function () {
                var queryString = $location.hash().substring(2), //$location.path().substring(1),  // $location.search()
                    regex = /([^&=]+)=([^&]*)/g,
                    m;

                $log.info("url:" + $location.absUrl());
                do {
                    m = regex.exec(queryString);
                    if (m !== null) {
                        accessToken[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
                        if (accessToken.isEmpty()) {
                            accessToken.empty = false;
                        }
                    }
                } while (m !== null);

                if (accessToken.isEmpty()) {
                    throw "accessToken can not be emtpy";
                }
            },
            saveAccessTokenToSession = function () {
                if (accessToken.isEmpty()) {
                    throw "accessToken can not be empty";
                }
                if (accessToken && accessToken.access_token && accessToken.expires_in &&
                        accessToken.state) {
                    var currentTime = new Date(),
                        tempSession = null;
                    currentTime.setTime(currentTime.getTime() + (accessToken.expires_in * 1000));
                    $window.sessionStorage.accessToken = accessToken.access_token;
                    $window.sessionStorage.expiresAt = currentTime;
                    $window.sessionStorage.state = accessToken.state;
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
                    if ($window.sessionStorage.state) {
                        delete $window.sessionStorage.state;
                    }
                }
            },
            processValidationResponse = function (validationResponse) {
                //TODO: check for error attribute and save error message.
                //TODO: save session state in the sessionStorage to be equal to valid or invalid.
                //TODO: refresh session, if validationResponse has error message.
                var deferred = $q.defer();
                deferred.resolve(true);
                return deferred.promise;
            },
            processAuthenticateUserResponse = function () {
                resetSession();
                processAccessToken();
                saveAccessTokenToSession();
            },
            sessionExist = function () {
                var sessionExistStatus = false;
                if ($window && $window.sessionStorage) {
                    if ($window.sessionStorage.accessToken &&
                            $window.sessionStorage.expiresAt &&
                            $window.sessionStorage.state) {
                        sessionExistStatus = true;
                    }
                }

                return sessionExistStatus;
            },
            getSession = function () {
                var session = {
                    accessToken: null,
                    expiresAt: null,
                    state: "None"
                };

                if (sessionExist()) {
                    session.accessToken = $window.sessionStorage.accessToken;
                    session.expiresAt = $window.sessionStorage.expiresAt;
                    session.state = $window.sessionStorage.state;
                }

                return session;
            },
            getAction = function () {
                var queryString = $location.hash().substring(2),
                    regex = /([^&=]+)=([^&]*)/g,
                    m,
                    action = null;

                do {
                    m = regex.exec(queryString);
                    if (m !== null) {
                        if (m[1] === "state") {
                            action = decodeURIComponent(m[2]);
                            break;
                        }
                    }
                } while (m !== null);

                return action;
            },
            sendAuthenticateUserRequest = function () {
                var deferred = $q.defer(),
                    oauth2 = {
                        endPointUrl: "https://accounts.google.com/o/oauth2/auth",
                        clientId: "1085080338310.apps.googleusercontent.com",
                        responseType: "token",
                        redirectUrl: "http://calendar-app.noesiscode.cloudbees.net/", //http://calendar-app.noesiscode.cloudbees.net/  "http://localhost:8080/calendar-app/"
                        scope: "https://www.googleapis.com/auth/userinfo.profile",
                        state: "Initializing"
                    };

                $window.open(oauth2.endPointUrl +
                    "?scope=" + oauth2.scope +
                    "&state=" + oauth2.state +
                    "&redirect_uri=" + oauth2.redirectUrl +
                    "&response_type=" + oauth2.responseType +
                    "&client_id=" + oauth2.clientId,
                    "_self");

                deferred.resolve(true);

                return deferred.promise;
            },
            getAccessToken = function () {
                var deferred = $q.defer(),
                    action = getAction(),
                    accessToken = null;

                if (action === "Initializing") {
                    processAuthenticateUserResponse();
                }

                if (sessionExist()) {
                    accessToken = {};
                    accessToken.token = getSession().accessToken;
                    accessToken.expiresAt = getSession().expiresAt;
                    accessToken.state = getSession().state;
                }

                if (accessToken === null || accessToken === undefined) {
                    deferred.reject(new Error("No Access Token"));
                } else {
                    deferred.resolve(accessToken);
                }

                return deferred.promise;
            },
            validateAccessToken = function (accessToken) {
                var deferred = $q.defer();

                accessToken.state = getSession().state = $window.sessionStorage.state = "ValidatingAccessToken";
                /*$http.get('https://www.googleapis.com/oauth2/v1/tokeninfo', {params: {access_token: accessToken.token}})
                    .success(function (data, status, headers, config) {
                        // Do something successful.
                        $log.info("sendValidationRequest() method: data: " + data);
                        deferred.resolve(data);
                        accessToken.state = getSession().state = $window.sessionStorage.state = "AccessTokenValidated";
                    })
                    .error(function (data, status, headers, config) {
                        // TODO: Handle the error
                        $log.error("Error occurred during sendValidationRequest() method: " + status);
                        deferred.reject(new Error("Error occurred during sendValidationRequest() method: " + status));
                        accessToken.state = getSession().state = $window.sessionStorage.state = "AccessTokenInValid";
                    });
                */
                deferred.resolve(true);
                return deferred.promise;
            },
            validateSession = function () {
                var deferred = $q.defer();
                deferred.resolve(getAccessToken().then(function (accessToken) {
                    return validateAccessToken(accessToken).then(function (response) {
                        return processValidationResponse(response);
                    }/* We do not handle error here because we want to route to redirect to the login page.
                     If we handle the error, the route would not be redirected to the login page and
                     the return value would be injected into the controller.
                     , function (reason) {
                        return false;
                    }*/ );
                }/* We do not handle error here because we want to route to redirect to the login page.
                    If we handle the error, the route would not be redirected to the login page and
                    the return value would be injected into the controller.
                 , function (reason) {
                     return false;
                }*/ ));
                return deferred.promise;
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