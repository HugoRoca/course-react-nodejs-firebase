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
import { consumerFirebase } from "../../server";

const style = {
  paper: {
    marginTop: 9,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: 5,
    backgroundColor: "#e53935",
  },
  form: {
    with: "100%",
    marginTop: 8,
  },
};

class Signin extends Component {
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

  login = (e) => {
    e.preventDefault();
    const { firebase, user } = this.state;
    firebase.auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((r) => {
        this.props.history.push("/");
      })
      .catch(console.log);
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
