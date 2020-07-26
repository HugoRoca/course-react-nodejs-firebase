import React, { useState, useEffect } from "react";
import { useStateValue } from "../../../session/store";
import {
  Container,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { style } from "./Profile.css";
import Logo from "../../../logo.svg";
import { consumerFirebase } from "../../../server";
import { openMessage } from "../../../session/actions/snackBar.action";

const ProfileUser = (props) => {
  const [{ session }, dispatch] = useStateValue();
  const firebase = props.firebase;
  let [status, changeStatus] = useState({
    name: "",
    last_name: "",
    phone: "",
    photo: "",
    id: "",
  });

  const changeData = (e) => {
    const { name, value } = e.target;
    changeStatus((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveChanges = (e) => {
    e.preventDefault();
    firebase.db
      .collection("Users")
      .doc(firebase.auth.currentUser.uid)
      .set(status, { merge: true })
      .then((success) => {
        dispatch({
          type: "LOGIN",
          session: status,
          authenticate: true,
        });

        openMessage(dispatch, {
          open: true,
          message: "Update successfully!",
        });
      })
      .catch((err) => {
        openMessage(dispatch, {
          open: true,
          message: "Update error " + err.message,
        });
      });
  };

  useEffect(() => {
    if (status.id === "") {
      if (session) {
        changeStatus(session.user);
      }
    }
  });

  return session ? (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <Avatar style={style.avatar} src={status.photo || Logo} />
        <Typography component="h1" variant="h5">
          Account Profile
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                name="name"
                variant="outlined"
                fullWidth
                label="Name"
                value={status.name}
                onChange={changeData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="last_name"
                variant="outlined"
                fullWidth
                label="Last name"
                value={status.last_name}
                onChange={changeData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="email"
                variant="outlined"
                fullWidth
                label="Email"
                value={status.email}
                onChange={changeData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="phone"
                variant="outlined"
                fullWidth
                label="Phone"
                value={status.phone}
                onChange={changeData}
              />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                color="primary"
                style={style.submit}
                onClick={saveChanges}
              >
                Save changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  ) : null;
};

export default consumerFirebase(ProfileUser);
