import React, { Component } from "react";
import { compose } from "recompose";
import { consumerFirebase } from "../../../server";
import {
  Container,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { style } from "./Signup.css";
import { LockOpenOutlined } from "@material-ui/icons";
import { createUser } from "../../../session/actions/session.action";
import { openMessage } from "../../../session/actions/snackBar.action";
import { StateContext } from "../../../session/store";

class Signup extends Component {
  static contextType = StateContext;

  state = {
    firebase: null,
    user: {
      name: "",
      last_name: "",
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

  async save(e) {
    e.preventDefault();
    const [{ session }, dispatch] = this.context;
    const { user, firebase } = this.state;
    await createUser(dispatch, firebase, user)
      .then((r) => {
        console.log("test!!!");
        if (r.status) {
          this.props.history.push("/");
        } else {
          openMessage(dispatch, {
            open: true,
            message: "error ocurred in login",
          });
        }
      })
      .catch((e) => {
        openMessage(dispatch, {
          open: true,
          message: e.message,
        });
      });
  }

  render() {
    return (
      <Container maxWidth="md">
        <div style={style.paper}>
          <Avatar style={style.avatar}>
            <LockOpenOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            SignUp
          </Typography>
          <form style={style.form}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  variant="outlined"
                  value={this.state.user.name}
                  onChange={this.onChange}
                  name="name"
                  fullWidth
                  label="Input your name"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  variant="outlined"
                  value={this.state.user.last_name}
                  onChange={this.onChange}
                  name="last_name"
                  fullWidth
                  label="Input your last name"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  variant="outlined"
                  value={this.state.user.email}
                  onChange={this.onChange}
                  name="email"
                  fullWidth
                  label="Input your email"
                  type="email"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  variant="outlined"
                  value={this.state.user.password}
                  onChange={this.onChange}
                  type="password"
                  name="password"
                  fullWidth
                  label="Input your password"
                />
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid item md={6} xs={12}>
                <Button
                  onClick={this.save}
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  color="primary"
                  style={style.submit}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default compose(consumerFirebase)(Signup);
