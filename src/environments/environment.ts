import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebaseConfig: {
    apiKey: 'AIzaSyBUliC__t01KZ6SdBRGXpIkB3F858P4xrw',
    authDomain: 'holiday-planner-angular.firebaseapp.com',
    projectId: 'holiday-planner-angular',
    storageBucket: 'holiday-planner-angular.appspot.com',
    messagingSenderId: '244924145831',
    appId: '1:244924145831:web:0f3c8dddff42e3ef5afb82',
    measurementId: 'G-1P68FF9FM3',
  },
  // Initialize Firebase
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
