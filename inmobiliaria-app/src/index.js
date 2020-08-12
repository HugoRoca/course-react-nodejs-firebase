import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Firebase, { FirebaseContext } from "./server";
import { initialState } from "./session/initialState";
import { StateProvider } from "./session/store";
import { mainReducer } from "./session/reducers";

const firebase = new Firebase();

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={firebase}>
      <StateProvider initialState={initialState} reducer={mainReducer}>
        <App />
      </StateProvider>
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

if (firebase.messagingValidation.isSupported()) {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((register) => {
        console.log("notification register");
      }).catch(err => {
        console.log("failure register in the serviceWorker")
      });
  }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
