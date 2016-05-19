<!--
# license: Licensed to the Apache Software Foundation (ASF) under one
#         or more contributor license agreements.  See the NOTICE file
#         distributed with this work for additional information
#         regarding copyright ownership.  The ASF licenses this file
#         to you under the Apache License, Version 2.0 (the
#         "License"); you may not use this file except in compliance
#         with the License.  You may obtain a copy of the License at
#
#           http://www.apache.org/licenses/LICENSE-2.0
#
#         Unless required by applicable law or agreed to in writing,
#         software distributed under the License is distributed on an
#         "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#         KIND, either express or implied.  See the License for the
#         specific language governing permissions and limitations
#         under the License.
-->

# aemm-plugin-application

This plugin defines a global `application` object, which describes the application version and id.
Although the object is in the global scope, it is not available until after the `deviceready` event.

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log(cq.mobile.application.id);
    }

## Installation

cordova plugin add aemm-plugin-application

## Properties

- application.id
- application.version
- application.runtimeVersion
- application.pushNotificationToken

## Document Events
- pushnotificationtokenchanged

## application.id
Get the id of the application as identified by each platform's store. 

### Supported Platforms

- Android
- iOS
- Windows

### Quick Example

    // iOS:     returns the id of the application bundle as
    //          identified by the app store.
    //          com.exampleCompany.exampleApp
    // Windows: returns the main package identity name as
    //          identified by the Windows Store.
    //          examplePublisher.exampleApp
	var string = application.id;

## application.version

Get the application's version as defined by the app vendor

    var string = application.version;

### Supported Platforms

- Android
- iOS
- Windows

### Quick Example

    //   - "iOS"     3.4.5
    //   - "Windows" 3.4.5.6
    var runtimeVersion = application.version;

## application.runtimeVersion

Get the application's version as defined by Adobe AEM

    var string = application.runtimeVersion;

### Description

This version is provided to assist Adobe AEM.

### Supported Platforms

- Android
- iOS
- Windows

### Quick Example

    //  - "iOS"     2016.1.1
    //  - "Windows" 2016.1.1
    var applicationRuntimeVersion = application.runtimeVersion;

## application.pushNotificationToken

Get the push notification token for the app and device. 
If there is no push token the method returns the empty string

    var string = application.pushNotificationToken;

### Description

Since the push notification token is provided to the device by the device manufacturer
in a binary format, this API converts the token to a base64-encoded string

### Supported Platforms

- iOS

### Quick Example

    // iPhone:     ew0KDQogICAgICAgICAgICBtZS5hdmFp==
    
    var pushNotificationToken = application.pushNotificationToken;

## pushnotificationtokenchanged

Event will be fired when the push notification token has changed. 
Clients should query the application object for the latest value.

### Example
document.addEventListener("pushnotificationtokenchanged", updatePushToken, false);

### Supported Platforms

- iOS

