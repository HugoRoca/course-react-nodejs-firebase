import React, { Component } from "react";
import "./App.css";

import PropertyList from "./components/ListaInmuebles";
import AppNavbar from "./components/layout/AppNavbar";
import SignUp from "./components/security/Signup";
import SignIn from "./components/security/Signin";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core";
import theme from "./theme/theme";
import Grid from "@material-ui/core/Grid";

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
