import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { consumerFirebase } from "../../../server";
import { compose } from "recompose";
import { StateContext } from "../../../session/store";
import { logout } from "../../../session/actions/session.action";
import { styles } from "./BarSession.css";
import { MainRight } from "../MainRight/MainRight";
import { MainLeft } from "../MainLeft/MainLeft";
import photoUser from "../../../logo.svg";
import { Link } from "react-router-dom";
import {
  Toolbar,
  Typography,
  withStyles,
  Button,
  IconButton,
  Drawer,
  Avatar,
} from "@material-ui/core";
import { getPermissionNotification } from "../../../session/actions/notification.action";

class BarSession extends Component {
  static contextType = StateContext;

  state = {
    firebase: null,
    right: false,
    left: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let newObjects = {};

    if (nextProps.firebase !== prevState.firebase) {
      newObjects.firebase = nextProps.firebase;
    }

    return newObjects;
  }

  singOut = () => {
    const { firebase } = this.state;
    const [{ session }, dispatch] = this.context;
    logout(dispatch, firebase).then((res) => {
      this.props.history.push("/signin");
    });
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  activateNotifications = async () => {
    const { firebase } = this.state;
    const [{ session }, dispatch] = this.context;
    const { user } = session;

    if (firebase.messagingValidation.isSupported()) {
      await getPermissionNotification(firebase, user, dispatch);
    }
  };

  render() {
    const { classes } = this.props;
    const [{ session }, dispatch] = this.context;
    const { user } = session;

    return (
      <div>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
          anchor="left"
        >
          <div
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            <MainLeft
              classes={classes}
              permissionForGetNotification={this.activateNotifications}
            ></MainLeft>
          </div>
        </Drawer>
        <Drawer
          open={this.state.right}
          onClose={this.toggleDrawer("right", false)}
          anchor="right"
        >
          <div
            role="button"
            onClick={this.toggleDrawer("right", false)}
            onKeyDown={this.toggleDrawer("right", false)}
          >
            <MainRight
              classes={classes}
              user={user}
              photoUser={user.photo || photoUser}
              logout={this.singOut}
            ></MainRight>
          </div>
        </Drawer>
        <Toolbar>
          <IconButton color="inherit" onClick={this.toggleDrawer("left", true)}>
            <i className="material-icons">menu</i>
          </IconButton>
          <Typography variant="h6">Properties</Typography>
          <div className={classes.grow}></div>
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit" component={Link} to="">
              <i className="material-icons">mail_outline</i>
            </IconButton>
            <Button color="inherit" onClick={this.singOut}>
              Logout
            </Button>
            <Button color="inherit">
              {!user.name ? user.phone : user.name}
            </Button>
            <Avatar src={user.photo || photoUser}></Avatar>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              color="inherit"
              onClick={this.toggleDrawer("right", true)}
            >
              <i className="material-icons">more_vert</i>
            </IconButton>
          </div>
        </Toolbar>
      </div>
    );
  }
}

export default compose(
  withRouter,
  consumerFirebase,
  withStyles(styles)
)(BarSession);
