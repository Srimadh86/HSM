// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
masterData:`http://20.244.4.72:8000/api/webservices/masters/list`,
 users:'https://mocki.io/v1/f602aa94-ad9e-4bc5-86d9-49c17b8b5f51',
  // users: `http://localhost:3000/users`,
  recognition: `http://20.244.4.72:8000/recognitions`,
  gratitude: `http://20.244.4.72:8000/gratitudes`,
  categoryList: 'http://20.244.4.72:8000/recognition-categories',
  baseUrl:'http://20.244.4.72:8000/api/webservices/',


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
