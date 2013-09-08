/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 8/28/13
 * Time: 8:39 AM
 * To change this template use File | Settings | File Templates.
 */
var NoesisCode = NoesisCode || {};
NoesisCode.oauth.models = NoesisCode.namespace("com.noesiscode.oauth.models");
NoesisCode.oauth = NoesisCode.oauth || NoesisCode.namespace("com.noesiscode.oauth");
NoesisCode.oauth.models.OAuth2AccessTokenValidationResponseInfo = NoesisCode.defineClass({
    name: "NoesisCode.oauth.models.OAuth2AccessTokenValidationResponseInfo",
    construct: function (config) {
        "use strict";
        if (config === undefined || config === null) {
            throw new Error("Configuration must be provided.");
        }
        this.audience = config.audience;
        this.userId = config.userId;
        this.scopes = config.scopes || [];
        this.expiresIn = config.expiresIn;
        this.error = config.error || null;
    },
    methods: {
        getAudience: function () {
            "use strict";
            return this.audience;
        },
        setAudience: function (audience) {
            "use strict";
            this.audience = audience;
        },
        getUserId: function () {
            "use strict";
            return this.userId;
        },
        setUserId: function (userId) {
            "use strict";
            this.userId = userId;
        },
        getScopes: function () {
            "use strict";
            return this.scopes;
        },
        setScopes: function (scopes) {
            "use strict";
            if (!NoesisCode.isArrayLike(scopes)) {
                throw new Error("setScopes(scopes): argument must be an array and not empty.");
            }
            this.scopes = scopes;
        },
        getExpiresIn: function () {
            "use strict";
            return this.expiresIn;
        },
        setExpiresIn: function (expiresIn) {
            "use strict";
            if (typeof expiresIn !== "number") {
                throw new Error("setExpiresIn(number): argument must be a number.");
            }
            this.expiresIn = expiresIn;
        },
        getError: function () {
            "use strict";
            return this.error;
        },
        setError: function (error) {
            "use strict";
            this.error = error;
        },
        calculateExpirationTime: function () {
            "use strict";
            var currentTime = new Date(), expirationTime;

            if (this.expiresIn && this.expiresIn > 0) {
                expirationTime = currentTime.setTime(currentTime.getTime() + (this.expiresIn * 1000));
            }

            return expirationTime;
        }
    }
});