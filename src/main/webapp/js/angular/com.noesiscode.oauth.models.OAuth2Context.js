/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 8/24/13
 * Time: 1:05 PM
 * To change this template use File | Settings | File Templates.
 */
var NoesisCode = NoesisCode || {};
NoesisCode.oauth = NoesisCode.oauth || NoesisCode.namespace("com.noesiscode.oauth");
NoesisCode.oauth.models = NoesisCode.namespace("com.noesiscode.oauth.models");
NoesisCode.oauth.models.OAuth2Context = NoesisCode.defineClass({
    name: "NoesisCode.oauth.models.OAuth2Context",
    construct: function (config) {
        "use strict";
        if (config === undefined || config === null) {
            throw new Error("Configuration must be provided.");
        }
        var endPointUrl = config.endPointUrl,
            clientId = config.clientId,
            responseType = config.responseType,
            redirectUrl = config.redirectUrl,
            scopes = config.scopes || [],
            state = "Initializing",
            accessTokenValidationUrl = config.accessTokenValidationUrl;

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
        this.getAccessTokenValidationUrl = function () {
            return accessTokenValidationUrl;
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
                scopes.forEach(function (scope, index) {
                    if (scope !== undefined && scope !== null) {
                        formattedScopes += scope + " ";
                    }
                });
            }

            return formattedScopes.trim();
        }
    }
});