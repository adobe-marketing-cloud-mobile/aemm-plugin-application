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

exports.defineAutoTests = function() {
  describe('Application Information (window.application)', function () {
    it("should exist", function() {
      expect(window.application).toBeDefined();
    });

    it("should contain a identifier that is a string", function() {
      expect(window.application.identifier).toBeDefined();
      expect((new String(window.application.identifier)).length > 0).toBe(true);
    });

    it("should contain a version specification that is a string", function() {
      expect(window.application.version).toBeDefined();
      expect((new String(window.application.version)).length > 0).toBe(true);
    });

    it("should contain a runtimeVersion specification that is a string", function() {
      expect(window.application.runtimeVersion).toBeDefined();
      expect((new String(window.application.runtimeVersion)).length > 0).toBe(true);
    });


    it("should contain a cordova specification that is a string", function() {
      expect(window.application.cordova).toBeDefined();
      expect((new String(window.application.cordova)).length > 0).toBe(true);
    });

    it("should depend on the presence of cordova.version string", function() {
      expect(window.cordova.version).toBeDefined();
      expect((new String(window.cordova.version)).length > 0).toBe(true);
    });

    it("should contain application.cordova equal to cordova.version", function() {
      expect(window.application.cordova).toBe(window.cordova.version);
    });

    it("should contain a pushNotificationToken that is a string", function() {
      expect(window.application.pushNotificationToken).toBeDefined();
    });
    
    it("should contain an isSocialSharingEnabled property that is a boolean", function() {
      expect(window.application.isSocialSharingEnabled).toBeDefined();
      expect(typeof window.application.isSocialSharingEnabled).toBe("boolean");
    });
    
    it("should contain an isAppSearchEnabled property that is a boolean", function() {
      expect(window.application.isAppSearchEnabled).toBeDefined();
      expect(typeof window.application.isAppSearchEnabled).toBe("boolean");
    });
    
  });
};

exports.defineManualTests = function(contentEl, createActionButton) {
  var logMessage = function (message, color) {
        var log = document.getElementById('info');
        var logLine = document.createElement('div');
        if (color) {
            logLine.style.color = color;
        }
        logLine.innerHTML = message;
        log.appendChild(logLine);
    }

    var clearLog = function () {
        var log = document.getElementById('info');
        log.innerHTML = '';
    }

    var application_tests = '<h3>Press Dump Application button to get application information</h3>' +
        '<div id="dump_application"></div>' +
        'Expected result: Status box will get updated with application info. (i.e. platform, version, uuid, model, etc)';

    contentEl.innerHTML = '<div id="info"></div>' + application_tests;

    createActionButton('Dump application', function() {
      clearLog();
      logMessage(JSON.stringify(window.application, null, '\t'));
    }, "dump_application");
};
