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
import ImageUpload from "react-images-upload";
import { v4 as uuidv4 } from "uuid";

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

  const uploadPhoto = (photos) => {
    // catch photo
    const photo = photos[0];
    // rename photo
    const keyUniquePhoto = uuidv4();
    // get name photo
    const namePhoto = photo.name;
    // get extension photo
    const extensionPhoto = namePhoto.split(".").pop();
    // create new name alias photo
    const newNamePhoto = `${
      namePhoto.split(".")[0]
    }_${keyUniquePhoto}.${extensionPhoto}`
      .replace(/\s/g, "_")
      .toLowerCase();

    firebase.saveDocument(newNamePhoto, photo).then((data) => {
      firebase.getDocument(newNamePhoto).then((urlPhoto) => {
        status.photo = urlPhoto;

        firebase.db
          .collection("Users")
          .doc(firebase.auth.currentUser.uid)
          .set({ photo: urlPhoto }, { merge: true })
          .then((res) => {
            dispatch({
              type: "CHANGE_SESSION",
              newUser: status,
              authenticate: true,
            });
          });
      });
    });
  };

  const validateStateForm = (e) => {
    if (session) {
      changeStatus(session.user);
    }
  };

  useEffect(() => {
    if (status.id === "") {
      validateStateForm(session);
    }
  });

  const photoKey = uuidv4();

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
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <ImageUpload
                withIcon={false}
                key={photoKey}
                singleImage={true}
                buttonText="Select your image profile"
                onChange={uploadPhoto}
                imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                maxFileSize={5242880}
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
