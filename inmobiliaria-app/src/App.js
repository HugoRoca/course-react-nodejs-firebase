import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

// TODO Components
import PropertyList from "./components/ListaInmuebles";
import AppNavbar from "./components/layout/AppNavbar";
import SignUp from "./components/security/Signup";
import SignIn from "./components/security/Signin";
import { FirebaseContext } from "./server";

// TODO Material Design
import { ThemeProvider as MuiThemeProvider, Snackbar } from "@material-ui/core";
import theme from "./theme/theme";
import Grid from "@material-ui/core/Grid";

// TODO Sessions
import { useStateValue } from "./session/store";

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
              <Route path="/" exact component={PropertyList}></Route>
              <Route path="/signup" exact component={SignUp}></Route>
              <Route path="/signin" exact component={SignIn}></Route>
            </Switch>
          </Grid>
        </MuiThemeProvider>
      </Router>
    </React.Fragment>
  ) : null;
}

export default App;
