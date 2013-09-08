/*global location*/
/*jslint regexp: true*/
/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 8/24/13
 * Time: 3:59 PM
 * To change this template use File | Settings | File Templates.
 */
var NoesisCode = NoesisCode || {};
NoesisCode.oauth = NoesisCode.namespace("com.noesiscode.oauth");
NoesisCode.oauth.OAuth2Strategy = NoesisCode.defineClass({
    name: "NoesisCode.oauth.OAuth2Strategy",
    extend: NoesisCode.oauth.OAuthStrategy,
    construct: function ($q, $http, $window, $location, $log, someContext) {
        "use strict";
        if (!NoesisCode.provides(someContext, NoesisCode.oauth.models.OAuth2Context)) {
            throw new Error("context must implement NoesisCode.oauth2.models.OAuth2Context");
        }
        this.$q = $q;
        this.$http = $http;
        this.$window = $window;
        this.$location = $location;
        this.$log = $log;

        var context = someContext,
            endPointUrl = context.getEndPointUrl(),
            clientId = context.getClientId(),
            responseType = context.getResponseType(),
            redirectUrl = context.getRedirectUrl(),
            accessTokenValidationUrl = context.getAccessTokenValidationUrl(),
            scopes = context.getScopes() || [],
            state = "Initializing",
            accessToken,
            accessTokenValidationResponse;

        this.getContext = function () {
            return context;
        };
        this.getEndPointUrl = function () {
            return endPointUrl;
        };
        this.getClientId = function () {
            return clientId;
        };
        this.getResponseType = function () {
            return responseType;
        };
        this.getRedirectUrl = function () {
            return redirectUrl;
        };
        this.getAccessToken = function () {
            return accessToken;
        };
        this.getAccessTokenValidationUrl = function () {
            return accessTokenValidationUrl;
        };
        this.getAccessTokenValidationResponse = function () {
            return accessTokenValidationResponse;
        };
        this.getScopes = function () {
            return scopes;
        };
        this.getState = function () {
            return state;
        };
        this.setState = function (sessionState) {
            state = sessionState;
        };
        this.removeAccessTokenFromUrl = function () {
            $location.hash("");
            location.hash = "";
        };
        this.getAccessTokenFromUrl = function () {
            var deferred = this.$q.defer(),
                action = this.getStateOfOAuthResponse();

            if (action === "Initializing") {
                this.processAuthenticateUserResponse();
            }

            if (this.sessionExist()) {
                accessToken = new NoesisCode.oauth.models.OAuth2AccessTokenInfo({
                    access_token: this.getSession().accessToken,
                    token_type: this.getSession().type,
                    expires_in: this.getSession().expiresAt,
                    error: this.getSession().error
                });

                //accessToken.state = getSession().state;
            }

            if (accessToken === null || accessToken === undefined) {
                deferred.reject(new Error("No Access Token"));
            } else {
                deferred.resolve(accessToken);
            }

            return deferred.promise;
        };
        this.processAuthenticateUserResponse = function () {
            this.resetSession();
            accessToken = new NoesisCode.oauth.models.OAuth2AccessTokenInfo(this.processAccessToken());
            this.saveAccessTokenToSession();
            this.removeAccessTokenFromUrl();
        };
        this.processValidationResponse = function (validationResponse) {
            //TODO: check for error attribute and save error message.
            //TODO: save session state in the sessionStorage to be equal to valid or invalid.
            //TODO: refresh session, if validationResponse has error message.
            var deferred = this.$q.defer();
            accessTokenValidationResponse = new NoesisCode.oauth.models.OAuth2AccessTokenValidationResponseInfo({
                audience: validationResponse.audience,
                userId: validationResponse.userId,
                scopes: this.formatScopesArray(validationResponse.scopes) || this.formatScopesArray([]),
                expiresIn: validationResponse.expiresIn,
                error: validationResponse.error
            });

            deferred.resolve(accessTokenValidationResponse);
            return deferred.promise;
        };
        this.saveAccessTokenToSession = function () {
            if (accessToken &&
                    accessToken.getToken() &&
                    accessToken.getExpiresIn() &&
                    accessToken.getState() &&
                    accessToken.getType()) {
                var currentTime = new Date(),
                    tempSession = null;
                currentTime.setTime(currentTime.getTime() + (accessToken.getExpiresIn() * 1000));
                this.$window.sessionStorage.accessToken = accessToken.getToken();
                this.$window.sessionStorage.expiresAt = currentTime;
                this.$window.sessionStorage.state = accessToken.getState();
                this.$window.sessionStorage.type = accessToken.getType();
            } else {
                throw "accessToken can not be empty";
            }
        };
        this.resetSession = function () {
            accessToken = null;
            if (this.$window && this.$window.sessionStorage) {
                if (this.$window.sessionStorage.accessToken) {
                    delete this.$window.sessionStorage.accessToken;
                }
                if (this.$window.sessionStorage.expiresAt) {
                    delete this.$window.sessionStorage.expiresAt;
                }
                if (this.$window.sessionStorage.state) {
                    delete this.$window.sessionStorage.state;
                }
                if (this.$window.sessionStorage.type) {
                    delete this.$window.sessionStorage.type;
                }
            }
        };
    },
    methods: {
        formatScopesArray: function (scopes) {
            "use strict";
            var formattedScopes = "";
            if (scopes === undefined || scopes === null) {
                return formattedScopes;
            }
            if (NoesisCode.isArrayLike(scopes)) {
                if (scopes.length === 0) {
                    return formattedScopes;
                }
                this.scopes.forEach(function (scope, index) {
                    if (scope !== undefined && scope !== null) {
                        formattedScopes += formattedScopes + " ";
                    }
                });
            }

            return formattedScopes.trim();
        },
        validateSession: function () {
            "use strict";
            var deferred = this.$q.defer(),
                strategy = this;
            deferred.resolve(this.getAccessTokenFromUrl().then(function (accessToken) {
                return strategy.sendValidateAccessTokenRequest(accessToken).then(function (response) {
                    return strategy.processValidationResponse(response);
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
        },
        sendAuthenticateUserRequest: function () {
            "use strict";
            var deferred = this.$q.defer(), oauthContext = this.getContext();

            this.$window.open(oauthContext.getEndPointUrl() +
                "?scope=" + oauthContext.formatScopesArray(oauthContext.getScopes()) +
                "&state=" + oauthContext.getState() +
                "&redirect_uri=" + oauthContext.getRedirectUrl() +
                "&response_type=" + oauthContext.getResponseType() +
                "&client_id=" + oauthContext.getClientId(),
                "_self");

            deferred.resolve(true);

            return deferred.promise;
        },
        sendValidateAccessTokenRequest: function () {
            "use strict";
            var deferred = this.$q.defer(), strategy = this;
            this.getSession().state = this.$window.sessionStorage.state = "ValidatingAccessToken";
            this.$http.jsonp(this.getAccessTokenValidationUrl(),
                {
                    params: {
                        access_token: this.getAccessToken().getToken(),
                        callback: 'JSON_CALLBACK'
                    }
                })
                .success(function (data, status, headers, config) {
                    if (data.audience && data.audience === strategy.getClientId()) {
                        deferred.resolve(data);
                        strategy.getSession().state = strategy.$window.sessionStorage.state = "AccessTokenValidated";
                    } else if (data.error) {
                        strategy.$log.error("Error occurred during sendValidationRequest() method: status: " + status + " error: " + data.error + " description: " + data.error_description);
                        deferred.reject(new Error("Error occurred during sendValidationRequest() method: " + status + " error: " + data.error + " description: " + data.error_description));
                        strategy.getSession().state = strategy.$window.sessionStorage.state = "AccessTokenInValid";
                    }
                })
                .error(function (data, status, headers, config) {
                    strategy.$log.error("Error occurred during sendValidationRequest() method: status: " + status + " error: " + data.error);
                    deferred.reject(new Error("Error occurred during sendValidationRequest() method: " + status + " error: " + data.error));
                    strategy.getSession().state = strategy.$window.sessionStorage.state = "AccessTokenInValid";
                });

            return deferred.promise;
        },
        processAccessToken: function () {
            "use strict";
            var queryString = this.$location.hash().substring(2),
                regex = /([^&=]+)=([^&]*)/g,
                m,
                accessToken = {};

            this.$log.info("processAccessToken() method url:" + this.$location.absUrl());
            do {
                m = regex.exec(queryString);
                if (m !== null) {
                    accessToken[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
                }
            } while (m !== null);

            return accessToken;
        },
        sessionExist: function () {
            "use strict";
            var sessionExistStatus = false;
            if (this.$window && this.$window.sessionStorage) {
                if (this.$window.sessionStorage.accessToken &&
                        this.$window.sessionStorage.expiresAt &&
                        this.$window.sessionStorage.state &&
                        this.$window.sessionStorage.type) {
                    sessionExistStatus = true;
                }
            }

            return sessionExistStatus;
        },
        getSession: function () {
            "use strict";
            var session = {
                accessToken: null,
                expiresAt: null,
                state: "None",
                type: null
            };

            if (this.sessionExist()) {
                session.accessToken = this.$window.sessionStorage.accessToken;
                session.expiresAt = this.$window.sessionStorage.expiresAt;
                session.state = this.$window.sessionStorage.state;
                session.type = this.$window.sessionStorage.type;
            }

            return session;
        }
    }
});