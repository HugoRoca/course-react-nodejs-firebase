import React, { Component } from "react";
import "./App.css";
import PropertyList from "./components/ListaInmuebles";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme/theme";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <PropertyList></PropertyList>
      </MuiThemeProvider>
    );
  }
}

export default App;
