import React, { Component } from "react";
import {
  Container,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { LockOpenOutlined } from "@material-ui/icons";
import { compose } from "recompose";
import { consumerFirebase } from "../../../server";
import { login } from "../../../session/actions/session.action";
import { openMessage } from "../../../session/actions/snackBar.action";
import { StateContext } from "../../../session/store";
import { style } from "./Signin.css";

class Signin extends Component {
  static contextType = StateContext;

  state = {
    firebase: null,
    user: {
      email: "",
      password: "",
    },
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.firebase === prevState.firebase) {
      return null;
    }

    return {
      firebase: nextProps.firebase,
    };
  }

  onChange = (e) => {
    // TODO: create clone
    let user = Object.assign({}, this.state.user);
    user[e.target.name] = e.target.value;
    this.setState({
      user,
    });
  };

  login = async (e) => {
    e.preventDefault();
    const [{ session }, dispatch] = this.context;
    const { firebase, user } = this.state;
    const { email, password } = user;
    const response = await login(dispatch, firebase, email, password);

    if (response.status) {
      this.props.history.push("/");
    } else {
      openMessage(dispatch, {
        open: true,
        message: response.message,
      });
    }
  };

  render() {
    return (
      <Container maxWidth="xs">
        <div style={style.paper}>
          <Avatar style={style.avatar}>
            <LockOpenOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            SignIn
          </Typography>
          <form style={style.form}>
            <TextField
              variant="outlined"
              label="Email"
              name="email"
              fullWidth
              margin="normal"
              onChange={this.onChange}
              value={this.state.user.email}
            />
            <TextField
              type="password"
              variant="outlined"
              label="Password"
              name="password"
              fullWidth
              margin="normal"
              onChange={this.onChange}
              value={this.state.user.password}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={this.login}
            >
              SignIn
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default compose(consumerFirebase)(Signin);
