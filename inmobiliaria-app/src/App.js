import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

// TODO Components
import PropertyList from "./components/views/ListProperty/ListProperty";
import NewProperty from "./components/views/NewProperty/NewProperty";
import EditProperty from "./components/views/EditProperty/EditProperty";
import AppNavbar from "./components/Layout/AppNavBar/AppNavbar";
import SignUp from "./components/Security/Signup/Signup";
import SignIn from "./components/Security/Signin/Signin";
import SignInPhone from "./components/Security/SigninPhone/SigninPhone";
import Profile from "./components/Security/Profile/Profile";
import ListUser from './components/views/ListUser/ListUser'
import { FirebaseContext } from "./server";
import RouteAuth from "./components/Security/RouteAuth/RouteAuth";

// TODO Material Design
import { ThemeProvider as MuiThemeProvider, Snackbar } from "@material-ui/core";
import theme from "./theme/theme";
import Grid from "@material-ui/core/Grid";

// TODO Sessions
import { useStateValue } from "./session/store";

import store from "./redux/store";
import { Provider } from "react-redux";

function App(props) {
  let firebase = React.useContext(FirebaseContext);
  const [authenticationStarted, setupFirebaseStart] = React.useState(false);
  const [{ snackBar }, dispatch] = useStateValue();

  useEffect(() => {
    firebase.isStarted().then((res) => {
      setupFirebaseStart(res);
    });
  });

  return authenticationStarted !== false ? (
    <Provider store={store}>
      <React.Fragment>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={3000}
          onClose={() =>
            dispatch({
              type: "OPEN_SNACKBAR",
              snackBar: {
                open: false,
                message: "",
              },
            })
          }
          ContentProps={{ "aria-describedby": "message-id" }}
          message={
            <span id="message-id">{snackBar ? snackBar.message : ""}</span>
          }
          open={snackBar ? snackBar.open : false}
        ></Snackbar>
        <Router>
          <MuiThemeProvider theme={theme}>
            <AppNavbar />
            <Grid container>
              <Switch>
                <RouteAuth
                  exact
                  path="/"
                  component={PropertyList}
                  authenticateFirebase={firebase.auth.currentUser}
                />
                <RouteAuth
                  exact
                  path="/profile"
                  component={Profile}
                  authenticateFirebase={firebase.auth.currentUser}
                />
                <RouteAuth
                  exact
                  path="/property/new"
                  component={NewProperty}
                  authenticateFirebase={firebase.auth.currentUser}
                />
                <RouteAuth
                  exact
                  path="/property/edit/:id"
                  component={EditProperty}
                  authenticateFirebase={firebase.auth.currentUser}
                />
                <RouteAuth
                  exact
                  path="/user/list"
                  component={ListUser}
                  authenticateFirebase={firebase.auth.currentUser}
                />
                <Route path="/signup" exact component={SignUp}></Route>
                <Route path="/signin" exact component={SignIn}></Route>
                <Route
                  path="/signin/phone"
                  exact
                  component={SignInPhone}
                ></Route>
              </Switch>
            </Grid>
          </MuiThemeProvider>
        </Router>
      </React.Fragment>
    </Provider>
  ) : null;
}

export default App;
