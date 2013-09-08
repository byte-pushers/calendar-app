/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 8/28/13
 * Time: 8:30 AM
 * To change this template use File | Settings | File Templates.
 */
var NoesisCode = NoesisCode || {};
NoesisCode.oauth = NoesisCode.oauth || NoesisCode.namespace("com.noesiscode.oauth");
NoesisCode.oauth.models = NoesisCode.namespace("com.noesiscode.oauth.models");
NoesisCode.oauth.models.OAuth2AccessTokenInfo = NoesisCode.defineClass({
    name: "NoesisCode.oauth.models.OAuth2AccessTokenInfo",
    construct: function (config) {
        "use strict";
        if (config === undefined || config === null) {
            throw new Error("Configuration must be provided.");
        }
        var token = config.access_token,
            type = config.token_type,
            state = config.state,
            expiresIn = config.expires_in,
            error = config.error;

        this.getToken = function () {
            return token;
        };
        this.getType = function () {
            return type;
        };
        this.getExpiresIn = function () {
            return expiresIn;
        };
        this.getState = function () {
            return state;
        };
        this.getError = function () {
            return error;
        };
    },
    methods: {

    }
});