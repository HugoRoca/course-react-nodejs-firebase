import React, { Component } from "react";
import { Container, Avatar, Typography } from "@material-ui/core";
import { LockOpenOutlined } from "@material-ui/icons";

const style = {
  paper: {
    marginTop: 9,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: 5,
    backgroundColor: "#e53935",
  }
}

export default class Signin extends Component {
  render() {
    return (
      <Container maxWidth="xs">
        <div style={style.paper}>
          <Avatar style={style.avatar}>
            <LockOpenOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">SignIn</Typography>
        </div>
      </Container>
    )
  }
}
