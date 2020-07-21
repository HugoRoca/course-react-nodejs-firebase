import app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import config from "./key.json";

export default class Firebase {
  constructor() {
    app.initializeApp(config);
    this.db = app.firestore();
    this.auth = app.auth();
  }
}
