# nostradamus
Database connection string in app.module.ts
`export const FIREBASE_CONFIG = {
	apiKey: '',
  authDomain: '',
  databaseURL: '',
  storageBucket: '',
  messagingSenderId: ''
};`
you should change this.



to run in dev mode
    npm install
    npm run start

to build in prod mode
    npm install
    npm run build:prod
files will be created under /dist folder

to publish using firebase hosting
    npm install -g firebase-tools
    firebase login
    firebase deploy
files under /dist folder will be published to firebase hosting


    
