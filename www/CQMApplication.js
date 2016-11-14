/*
*  Copyright 2016 Adobe Systems Incorporated. All rights reserved.
*  This file is licensed to you under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License. You may obtain a copy
*  of the License at http://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software distributed under
*  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
*  OF ANY KIND, either express or implied. See the License for the specific language
*  governing permissions and limitations under the License.
*
*/

var channel = require('cordova/channel'),
    exec = require('cordova/exec'),
    utils = require('cordova/utils'),
    cordova = require('cordova');

channel.createSticky('onCordovaAppInfoReady');
channel.waitForInitialization('onCordovaAppInfoReady');

/**
 * This represents the mobile application, and provides properties for inspecting the app id, version etc.
 * @constructor
 */
function CQMApplication() {

	//define channels for dynamic properties. Specific events will be dispatched for property update
    this.channels = {
        pushnotificationtokenchanged:cordova.addDocumentEventHandler("pushnotificationtokenchanged")
    };

    //define dynamic properties
    Object.defineProperty(this, '$properties', {'configurable': true, 'value': {}});
    utils.defineGetterSetter(this, 'pushNotificationToken', function(){return this.$properties['pushNotificationToken'];},
                                                function(pushNotificationToken){
                                                    this.$properties['pushNotificationToken'] = pushNotificationToken;
                                                    this.channels.pushnotificationtokenchanged.fire();
                                                });
    this.id = null;
    this.version = null;
    this.runtimeVersion = null;
    this.pushNotificationToken = null;
    this.isSocialSharingEnabled = false;
    this.isAppSearchEnabled = false;

    //initialize with data from native
    this.getApplicationInfo(this._initialize.bind(this), this._error);

}

CQMApplication.prototype._initialize = function(info) {
    this.id = info.id;
    this.version = info.version;
    this.runtimeVersion = info.runtimeVersion;
    this.pushNotificationToken = info.pushNotificationToken;
    this.isSocialSharingEnabled = info.isSocialSharingEnabled; 
    this.isAppSearchEnabled = info.isAppSearchEnabled;

   cordova.exec(this._updateProperties.bind(this), this._error, "CQMApplication", "watchApplicationInfo", []);
   channel.onCordovaAppInfoReady.fire();
};

/**
 * Get application info
 *
 * @param {Function} successCallback The function to call when the application data is available
 * @param {Function} errorCallback The function to call when there is an error getting the application data (OPTIONAL)
 */
CQMApplication.prototype.getApplicationInfo = function(successCallback, errorCallback) {
    exec(successCallback, errorCallback, "CQMApplication", "getApplicationInfo", []);
};

CQMApplication.prototype._updateProperties = function(properties) {
     for (prop in properties) {
        this[prop] = properties[prop];
    }
};

CQMApplication.prototype._error = function(e) {
    console.log("Error updating CQMApplication properties: " + e);
};

module.exports = new CQMApplication();
