import React, { Component } from "react";
import { consumerFirebase } from "../../../server";
import {
  Container,
  Paper,
  Grid,
  Breadcrumbs,
  Link,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { style } from "./EditProperty.css";
import { HouseOutlined } from "@material-ui/icons";
import ImageUpload from "react-images-upload";
import { v4 as uuidv4 } from "uuid";
import { createKeyword } from "../../../session/actions/keyword.action";

class EditProperty extends Component {
  state = {
    property: {
      direction: "",
      city: "",
      country: "",
      description: "",
      description_in: "",
      photos: [],
    },
  };

  onChange = (e) => {
    let property = Object.assign({}, this.state.property);
    property[e.target.name] = e.target.value;
    this.setState({
      property,
    });
  };

  uploadPhotos = (photos) => {
    const { property } = this.state;
    const { id } = this.props.match.params;

    Object.keys(photos).forEach(function (key) {
      const code = uuidv4();
      const nameImage = photos[key].name;
      const extension = nameImage.split(".").pop();
      photos[key].alias = `${nameImage.split(".")[0]}_${code}.${extension}`
        .replace(/\s/g, "_")
        .toLowerCase();
    });

    this.props.firebase.saveDocuments(photos).then((arrayUrl) => {
      property.photos = property.photos.concat(arrayUrl);

      this.props.firebase.db
        .collection("Properties")
        .doc(id)
        .set(property, { merge: true })
        .then((success) => {
          this.setState({
            property,
          });
        });
    });
  };

  deletePhoto = (photoUrl) => async () => {
    const { property } = this.state;
    const { id } = this.props.match.params;
    const photoName = photoUrl.match(/[\w-]+.(jpg|png|jpeg|gif|svg)/);
    const photoId = photoName[0];

    await this.props.firebase.deleteDocument(photoId);

    const photoList = this.state.property.photos.filter((photo) => {
      return photo !== photoUrl;
    });

    property.photos = photoList;

    this.props.firebase.db
      .collection("Properties")
      .doc(id)
      .set(property, { merge: true })
      .then((success) => {
        this.setState({
          property,
        });
      });
  };

  // TODO this execute when render is finished
  async componentDidMount() {
    // TODO catch params in url
    const { id } = this.props.match.params;
    const propertyCollection = this.props.firebase.db.collection("Properties");
    const propertyResponse = await propertyCollection.doc(id).get();
    this.setState({
      property: propertyResponse.data(),
    });
  }

  save = () => {
    const { property } = this.state;
    const { id } = this.props.match.params;
    const textSearch = `${property.direction} ${property.city} ${property.country}`;
    property.keywords = createKeyword(textSearch);
    property.userId = this.props.firebase.auth.currentUser.uid

    this.props.firebase.db
      .collection("Properties")
      .doc(id)
      .set(property, { merge: true })
      .then((success) => {
        this.props.history.push("/");
      });
  };

  render() {
    const photoKey = uuidv4();

    return (
      <Container style={style.container}>
        <Paper style={style.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" style={style.link} href="/">
                  <HouseOutlined style={style.icon} /> Home
                </Link>
                <Typography color="textSecondary">Edit Property</Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                name="direction"
                label="Direction"
                fullWidth
                variant="outlined"
                autoComplete="off"
                value={this.state.property.direction}
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="city"
                label="City"
                fullWidth
                variant="outlined"
                autoComplete="off"
                value={this.state.property.city}
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="country"
                label="Country"
                fullWidth
                variant="outlined"
                autoComplete="off"
                value={this.state.property.country}
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                name="description"
                label="Description Property"
                fullWidth
                variant="outlined"
                multiline
                rowsMax="4"
                value={this.state.property.description}
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                name="description_in"
                label="Description Interior Property"
                fullWidth
                variant="outlined"
                multiline
                rowsMax="4"
                value={this.state.property.description_in}
                onChange={this.onChange}
              />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={12} sm={6}>
              <ImageUpload
                key={photoKey}
                withIcon={true}
                buttonText="Select your images"
                onChange={this.uploadPhotos}
                imgExtension={[".gif", ".png", ".jpg", ".jpeg"]}
                maxFileSize={5242880}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Table>
                <TableBody>
                  {this.state.property.photos
                    ? this.state.property.photos.map((photo, i) => (
                        <TableRow key={i}>
                          <TableCell align="left">
                            <img src={photo} style={style.photoProperty} />
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              variant="contained"
                              color="secondary"
                              size="small"
                              onClick={this.deletePhoto(photo)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    : ""}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={12} sm={6}>
              <Button
                type="button"
                variant="contained"
                fullWidth
                size="large"
                color="primary"
                style={style.submit}
                onClick={this.save}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

export default consumerFirebase(EditProperty);
