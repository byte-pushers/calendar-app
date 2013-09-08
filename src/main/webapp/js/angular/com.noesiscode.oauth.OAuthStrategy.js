/*jslint regexp: true*/
/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 8/24/13
 * Time: 3:32 PM
 * To change this template use File | Settings | File Templates.
 */
var NoesisCode = NoesisCode || {};
NoesisCode.oauth = NoesisCode.namespace("com.noesiscode.oauth");
NoesisCode.oauth.OAuthStrategy = NoesisCode.defineClass({
    name: "NoesisCode.oauth.OAuthStrategy",
    methods: {
        getStateOfOAuthResponse: function () {
            "use strict";
            var queryString = this.$location.hash().substring(2),
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
        processAuthenticateUserResponse: function () {
            "use strict";
            throw new Error('Abstract Methods needs to be overridden.');
        },
        validateSession: function () {
            "use strict";
            throw new Error('Abstract Methods needs to be overridden.');
        },
        sendAuthenticateUserRequest: function () {
            "use strict";
            throw new Error('Abstract Methods needs to be overridden.');
        },
        getContext: function () {
            "use strict";
            throw new Error("Abstract Methods needs to be overridden.");
        }
    }
});
/*
NoesisCode.oauth.OAuthStrategy.RegisteredStrategies = NoesisCode.enumeration({
    GoogleOAuthStrategy: new NoesisCode.oauth.OAuth2Strategy({

    }),
    OAuth2: 2
});*/