/*global console:true, alert*/
/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 4/9/13
 * Time: 3:43 PM
 * To change this template use File | Settings | File Templates.
 */
var alertFallback = true;
if (typeof console === "undefined" || typeof console.log === "undefined") {
    console = {};
    if (alertFallback) {
        console.log = function (msg) {
            'use strict';
            alert(msg);
        };
    } else {
        console.log = function () {
            'use strict';
        };
    }
}