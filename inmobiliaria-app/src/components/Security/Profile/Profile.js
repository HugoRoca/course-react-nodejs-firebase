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

const ProfileUser = (props) => {
  const [{ session }, disptach] = useStateValue();
  let [status, changeStatus] = useState({
    name: "",
    last_name: "",
    phone: "",
    photo: "",
    id: "",
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
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="last_name"
                variant="outlined"
                fullWidth
                label="Last name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="email"
                variant="outlined"
                fullWidth
                label="Email"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="phone"
                variant="outlined"
                fullWidth
                label="Phone"
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

export default ProfileUser;
