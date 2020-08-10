import app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import 'firebase/messaging'
// import config from "./key.json";
import { keyFirebase, keyNotification } from './keys'

export default class Firebase {
  constructor() {
    app.initializeApp(keyFirebase);
    this.db = app.firestore();
    this.auth = app.auth();
    this.storage = app.storage();
    this.authorization = app.auth;
    this.messagingValidation = app.messaging // TODO this is a object

    if (this.messagingValidation.isSupported()){
      this.messaging = app.messaging() // TODO this is a method
      this.messaging.usePublicVapidKey(keyNotification)
    }

    this.storage.ref().constructor.prototype.saveDocuments = function (
      documents
    ) {
      var ref = this;
      return Promise.all(
        documents.map(function (file) {
          return ref
            .child(file.alias)
            .put(file)
            .then((snapshot) => {
              return ref.child(file.alias).getDownloadURL();
            });
        })
      );
    };
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

  saveDocuments(documents) {
    return this.storage.ref().saveDocuments(documents);
  }

  deleteDocument(document) {
    return this.storage.ref().child(document).delete();
  }
}
