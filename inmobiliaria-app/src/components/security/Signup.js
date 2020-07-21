import React, { Component } from "react";
import { compose } from "recompose";
import { consumerFirebase } from "../../server";
import {
  Container,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { LockOpenOutlined } from "@material-ui/icons";

const initialUser = {
  name: "",
  last_name: "",
  email: "",
  password: "",
};
const style = {
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: 8,
    backgroundColor: "#e53935",
  },
  form: {
    width: "100%",
    marginTop: 10,
  },
  submit: {
    marginTop: 15,
    marginBottom: 20,
  },
};

class Signup extends Component {
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

  save = (e) => {
    e.preventDefault();
    const { user, firebase } = this.state;

    firebase.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((auth) => {
        const saveUser = {
          userId: auth.user.uid,
          email: user.email,
          name: user.name,
          last_name: user.last_name,
        };
        firebase.db
          .collection("Users")
          .add(saveUser)
          .then((res) => {
            console.log("successfully", res);
            this.setState({ user: initialUser });
          })
          .catch(console.error);
      })
      .catch(console.error);
  };

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
