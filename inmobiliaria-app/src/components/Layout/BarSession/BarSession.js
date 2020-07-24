import React, { Component } from "react";
import { styles } from './BarSession.css'
import {
  Toolbar,
  Typography,
  withStyles,
  Button,
  IconButton,
} from "@material-ui/core";

class BarSession extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Toolbar>
        <IconButton color="inherit">
          <i className="material-icons">menu</i>
        </IconButton>
        <Typography variant="h6">Property</Typography>
        <div className={classes.grow}></div>
        <div className={classes.sectionDesktop}>
          <Button color="inherit">Login</Button>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton color="inherit">
            <i className="material-icons">more_vert</i>
          </IconButton>
        </div>
      </Toolbar>
    );
  }
}

export default withStyles(styles)(BarSession);
