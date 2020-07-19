import app from "firebase/app";
import "firebase/firestore";
import dotenv from "dotenv";
dotenv.config();

const config = {
  apiKey: "AIzaSyBnQ6iplnbhzP6tEMHqajML9t-kYIDHSaM",
  authDomain: "storied-smile-283703.firebaseapp.com",
  databaseURL: "https://storied-smile-283703.firebaseio.com",
  projectId: "storied-smile-283703",
  storageBucket: "storied-smile-283703.appspot.com",
  messagingSenderId: "253473277366",
  appId: "1:253473277366:web:880a837c146b6bba816d17",
  measurementId: "G-841FPWKJKD",
};

export default class Firebase {
  constructor() {
    app.initializeApp(config);
    this.db = app.firestore();
  }
}
