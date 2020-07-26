import app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import config from "./key.json";

export default class Firebase {
  constructor() {
    app.initializeApp(config);
    this.db = app.firestore();
    this.auth = app.auth();
    this.storage = app.storage();
  }

  isStarted() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  saveDocument(nameDocument, document) {
    return this.storage.ref().child(nameDocument).put(document);
  }

  getDocument(documentUrl) {
    return this.storage.ref().child(documentUrl).getDownloadURL();
  }
}
