import React, { Component } from "react";
import { AppBar, withStyles } from "@material-ui/core";
import BarSession from "../BarSession/BarSession";
import { compose } from "recompose";
import { consumerFirebase } from "../../../server";
import { styles } from "./AppNavBar.css";
import { StateContext } from "../../../session/store";

class AppNavbar extends Component {
  static contextType = StateContext;

  state = {
    firebase: null,
  };

  componentDidMount() {
    const { firebase } = this.state;
    const [{ session }, dispatch] = this.context;

    if (firebase.auth.currentUser !== null && !session) {
      firebase.db
        .collection("Users")
        .doc(firebase.auth.currentUser.uid)
        .get()
        .then((doc) => {
          const userDB = doc.data();
          dispatch({
            type: "LOGIN",
            session: userDB,
            authenticate: true,
          });
        })
        .catch(console.log);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let newObjects = {};

    if (nextProps.firebase !== prevState.firebase) {
      newObjects.firebase = nextProps.firebase;
    }

    return newObjects;
  }

  render() {
    const [{ session }, dispatch] = this.context;

    return session ? (
      session.authenticate ? (
        <div>
          <AppBar position="static">
            <BarSession></BarSession>
          </AppBar>
        </div>
      ) : null
    ) : null;
  }
}

export default compose(withStyles(styles), consumerFirebase)(AppNavbar);
