// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mongodb: {
    apiKey: 'AIzaSyC4RNNlqXSwTM1Kt6Pbgutq2yuavSQ9WnU',
    authDomain: 'angularexampleapp.mongodb.com',
    databaseURL: 'mongodb://localhost:27017/bookShop',
    projectId: 'angularBookShop',
    storageBucket: 'angularexampleapp.appspot.com',
    messagingSenderId: '965114235515'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
