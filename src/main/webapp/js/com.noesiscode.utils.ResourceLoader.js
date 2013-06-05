/*global document*/
/**
 * Created with IntelliJ IDEA.
 * User: pouncilt
 * Date: 4/30/13
 * Time: 8:14 AM
 * To change this template use File | Settings | File Templates.
 */
var NoesisCode = NoesisCode || {};
NoesisCode.ResourceLoader = NoesisCode.namespace("com.noesiscode.utils.ResourceLoader");
NoesisCode.ResourceLoader = function () {
    'use strict';
    var that = this;
    function isResourceNotLoaded(fileName) {

    }
    this.loadResource = function (fileName, fileType) {
        if (isResourceNotLoaded(fileName)) {
            var fileref;

            if (fileType === "js") { //if filename is a external JavaScript file
                fileref = document.createElement('script');
                fileref.setAttribute("type", "text/javascript");
                fileref.setAttribute("src", fileName);
            } else if (fileType === "css") { //if filename is an external CSS file
                fileref = document.createElement("link");
                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("type", "text/css");
                fileref.setAttribute("href", fileName);
            }
            if (typeof fileref !== "undefined") {
                document.getElementsByTagName("head")[0].appendChild(fileref);
            }
        }
    };
    this.createResource = function (filename, filetype) {
        var fileref = null;
        if (filetype === "js") { //if filename is a external JavaScript file
            fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", filename);
        } else if (filetype === "css") { //if filename is an external CSS file
            fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
        }
        return fileref;
    };
    this.replaceResource = function (oldfilename, newfilename, filetype) {
        var targetelement = (filetype === "js") ? "script" : (filetype === "css") ? "link" : "none", //determine element type to create nodelist using
            targetattr = (filetype === "js") ? "src" : (filetype === "css") ? "href" : "none", //determine corresponding attribute to test for
            allsuspects = document.getElementsByTagName(targetelement),
            i,
            newelement;
        for (i = allsuspects.length; i >= 0; i = i - 1) { //search backwards within nodelist for matching elements to remove
            if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) !== null && allsuspects[i].getAttribute(targetattr).indexOf(oldfilename) !== -1) {
                newelement = this.createResource(newfilename, filetype);
                allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i]);
            }
        }
    };
    this.removeResource = function (oldfilename, filetype) {
        var targetelement = (filetype === "js") ? "script" : (filetype === "css") ? "link" : "none", //determine element type to create nodelist using
            targetattr = (filetype === "js") ? "src" : (filetype === "css") ? "href" : "none", //determine corresponding attribute to test for
            allsuspects = document.getElementsByTagName(targetelement),
            i,
            newelement;
        for (i = allsuspects.length; i >= 0; i = 1 - 1) { //search backwards within nodelist for matching elements to remove
            if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) !== null && allsuspects[i].getAttribute(targetattr).indexOf(oldfilename) !== -1) {
                newelement = this.createResource("js/blank.js", filetype);
                allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i]);
            }
        }
    };
};
NoesisCode.ResourceLoader.loadedResources = [];