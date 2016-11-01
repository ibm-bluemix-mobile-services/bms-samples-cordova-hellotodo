# HelloTodo Cordova application for Bluemix Mobile services

The HelloTodo sample contains a Cordova project that you can use to learn.


### Downloading the sample

Clone the samples with the following command:

```Bash
git clone https://github.com/ibm-bluemix-mobile-services/bms-samples-cordova-hellotodo
```


### Configure the mobile backend for your HelloTodo application

Before you can run the HelloTodo application, you must set up an app on Bluemix. The following procedure shows you how to create a MobileFirst Services Starter application. A Node.js runtime environment is created so that you can provide server-side functions, such as resource URIs and static files. The Cloudant® NoSQL DB, Push Notifications, and Mobile Client Access services are then added to the app.

Create a mobile backend in the Bluemix dashboard:

1. In the **Boilerplates** section of the Bluemix catalog, click **MobileFirst Services Starter**.
2. Enter a name and host for your mobile backend and click **Create**.
3. Click **Finish**.

### Add the native platforms to your app

Navigate into your project directory and run the following commands:

```Bash
cordova platform add ios
cordova platform add android
```

Add the plugin:

```Bash
cordova plugin add bms-core
```

### Configure Cordova

Follow the README instructions for [Configuration](https://github.com/ibm-bluemix-mobile-services/bms-clientsdk-cordova-plugin-core) to configure your development environment.

> **Note:** Project will not build until you follow instructions from this step.

### Configure the front end in the HelloWorld sample

1. Navigate to the directory where the project was cloned.
2. Open <b>index.js</b> located at [your-directory]/www/js/index.js
3. Replace the `"SERVER_URL"` and set your region.
4. Make sure your route is using **https**.

JavaScript:

```Javascript
// Bluemix credentials
//
// Create a MobileFirst Services starter service instance and copy the route e.g. "https://myhostname.mybluemix.net"
route: "SERVER_URL",
```

```Javascript
// deviceready Event Handler
//
// Set the region: BMSClient.REGION_US_SOUTH, BMSClient.REGION_UK, or BMSClient.REGION_SYDNEY
onDeviceReady: function() {
		BMSClient.initialize(BMSClient.REGION_US_SOUTH);
},
```
> **Note:** Don't forget commas at the end of each line!

### Build/Run the Cordova App

Now you can run your application in your mobile emulator or on your device.

1. Build the Cordova app. From your terminal enter the following command:

	```Bash
	cordova build ios
	cordova build android
	```

2. You will need to make native code changes to your application to initialize `BMSAuthorizationManager`. Follow the [documentation here](https://github.com/ibm-bluemix-mobile-services/bms-clientsdk-cordova-plugin-core#initializing-bmsauthorizationmanager) for instructions.

3. Run the sample app from Android Studio or Xcode after making the native changes.

### Resolve any problems

Check the following items:

- Verify that you correctly pasted the route value without the slash at the end.
- Double check the [README](https://github.com/ibm-bluemix-mobile-services/bms-clientsdk-cordova-plugin-core) of the core plugin to ensure your development environment is set up correctly.
- Check the Xcode or Android debug log for more information.
- Check the status of your App in Bluemix.

### License

This package contains sample code provided in source code form. The samples are licensed under the under the Apache License, Version 2.0 (the "License"). You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 and may also view the license in the license.txt file within this package. Also see the notices.txt file within this package for additional notices.
