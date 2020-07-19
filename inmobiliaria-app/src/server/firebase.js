import app from "firebase/app";
import dotenv from "dotenv";
dotenv.config();

const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

export default class Firebase {
  constructor() {
    app.initializeApp(config);
    this.db = app.firestore();
  }
}
