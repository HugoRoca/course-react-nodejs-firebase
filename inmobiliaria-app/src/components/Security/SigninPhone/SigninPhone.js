import React, { Component } from "react";
import * as firebaseui from "firebaseui";
import {
  Container,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { style } from "./SigninPhone.css";
import { consumerFirebase } from "../../../server";
import { openMessage } from "../../../session/actions/snackBar.action";
import { StateContext } from "../../../session/store";
import { auth } from "firebase";

class SigninPhone extends Component {
  static contextType = StateContext;
  state = {
    disable: true,
    dialogOpen: false,
    confirmCode: null,
    user: {
      phone: "",
      code: "",
    },
  };

  componentDidMount() {
    const { firebase } = this.props;

    firebase.auth.languageCode = "es";

    window.recaptchaVerifier = new firebase.authorization.RecaptchaVerifier(
      this.reCaptcha,
      {
        size: "normal",
        callback: (response) => {
          this.setState({
            disable: false,
          });
        },
        "expired-callback": function () {
          this.setState({
            disable: true,
          });
        },
      }
    );

    window.recaptchaVerifier.render().then(function (widgetId) {
      window.recaptchaVerifierId = widgetId;
    });
  }

  verifyNumber = (e) => {
    e.preventDefault();
    const [{ user }, dispatch] = this.context;
    const { firebase } = this.props;
    const appVerify = window.recaptchaVerifier;

    firebase.auth
      .signInWithPhoneNumber(this.state.user.phone, appVerify)
      .then((codeSent) => {
        this.setState({
          dialogOpen: true,
          confirmCode: codeSent,
        });
      })
      .catch((err) => {
        openMessage(dispatch, {
          open: true,
          message: err.message,
        });
      });
  };

  onChange = (e) => {
    let user = Object.assign({}, this.state.user);
    user[e.target.name] = e.target.value;
    this.setState({
      user,
    });
  };

  loginWithPhone = () => {
    const { firebase } = this.props;
    const [{ user }, dispatch] = this.context;
    const credential = firebase.authorization.PhoneAuthProvider.credential(
      this.state.confirmCode.verificationId,
      this.state.user.code
    );

    firebase.auth
      .signInAndRetrieveDataWithCredential(credential)
      .then((authUser) => {
        firebase.db
          .collection("Users")
          .doc(authUser.user.uid)
          .set(
            {
              id: authUser.user.uid,
              phone: authUser.user.phoneNumber,
            },
            { merge: true }
          )
          .then((success) => {
            dispatch({
              type: "LOGIN",
              session: {
                id: authUser.user.uid,
                phone: authUser.user.phoneNumber,
              },
              authenticate: true,
            });
            this.props.history.push("/");
          });
      });
  };

  render() {
    return (
      <Container maxWidth="xs">
        <Dialog
          open={this.state.dialogOpen}
          onClose={() => {
            this.setState({ dialogOpen: false });
          }}
        >
          <DialogTitle>Input your code</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the code you received by text message
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="code"
              fullWidth
              onChange={this.onChange}
              value={this.state.user.code}
            />
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              onClick={() => {
                this.setState({ dialogOpen: false });
              }}
            >
              Cancel
            </Button>
            <Button color="primary" onClick={this.loginWithPhone}>
              Verify
            </Button>
          </DialogActions>
        </Dialog>
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
              onChange={this.onChange}
              value={this.state.user.phone}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={style.submit}
              onClick={this.verifyNumber}
              disabled={this.state.disable}
            >
              Send
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default consumerFirebase(SigninPhone);
