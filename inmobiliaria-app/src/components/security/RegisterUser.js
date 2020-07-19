import React, { Component } from "react";
import { Container, Avatar, Typography, Grid, TextField, Button } from "@material-ui/core";
import { LockOpenOutlined } from "@material-ui/icons";

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
  }
};

export default class RegisterUser extends Component {
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
                <TextField name="name" fullWidth label="Input your name" />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField name="last_name" fullWidth label="Input your last name" />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField name="email" fullWidth label="Input your email" />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField type="password" name="password" fullWidth label="Input your password" />
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid item md={6} xs={12}>
                <Button type="submit" variant="contained" fullWidth size="large" color="primary" style={style.submit}>Save</Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}
