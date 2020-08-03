import React, { Component } from "react";
import {
  Container,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
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
              autoComplete="off"
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
              autoComplete="off"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              style={style.submit}
              onClick={this.login}
            >
              SignIn
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {"Forgot password?"}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Register Now"}
                </Link>
              </Grid>
            </Grid>
          </form>
          <Button fullWidth variant="contained" style={style.submit} href="#">
            Sign in with your number phone
          </Button>
        </div>
      </Container>
    );
  }
}

export default compose(consumerFirebase)(Signin);
