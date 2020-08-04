import React, { Component } from "react";
import * as firebaseui from "firebaseui";
import {
  Container,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { style } from "./SigninPhone.css";

class SigninPhone extends Component {
  reCaptcha = () => {};

  render() {
    return (
      <Container maxWidth="xs">
        <div style={style.paper}>
          <Avatar style={style.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Input number phone
          </Typography>
          <form style={style.form}>
            <Grid container style={style.captcha} justify="center">
              <div ref={(ref) => (this.reCaptcha = ref)}></div>
            </Grid>
            <TextField
              variant="outlined"
              fullWidth
              name="phone"
              label="Input number phone"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={style.submit}
            >
              Send
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default SigninPhone;
