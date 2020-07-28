import React, { Component } from "react";
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
import { style } from "./NewProperty.css";
import { HouseOutlined } from "@material-ui/icons";
import { consumerFirebase } from "../../../server";
import { openMessage } from "../../../session/actions/snackBar.action";
import ImageUpload from "react-images-upload";
import { v4 as uuidv4 } from "uuid";

const photoKey = uuidv4();

class NewProperty extends Component {
  state = {
    property: {
      direction: "",
      city: "",
      country: "",
      description: "",
      description_in: "",
    },
    files: [],
  };

  onChange = (e) => {
    let property = Object.assign({}, this.state.property);
    property[e.target.name] = e.target.value;
    this.setState({
      property,
    });
  };

  save = () => {
    const { property } = this.state;
    this.props.firebase.db
      .collection("Properties")
      .add(property)
      .then((r) => {
        this.props.history.push("");
      })
      .catch((err) => {
        openMessage({
          open: true,
          message: err.message,
        });
      });
  };

  uploadPhotos = (documents) => {
    Object.keys(documents).forEach(function (key) {
      documents[key].urlTemp = URL.createObjectURL(documents[key]);
    });

    this.setState({
      files: this.state.files.concat(documents),
    });
  };

  deletePhoto = (name) => {
    console.log(name);
  };

  render() {
    return (
      <Container style={style.container}>
        <Paper style={style.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" style={style.link} href="/">
                  <HouseOutlined style={style.icon} /> Home
                </Link>
                <Typography color="textPrimary">New Property</Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name="direction"
                label="Direction"
                variant="outlined"
                fullWidth
                autoComplete="off"
                value={this.state.property.direction}
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="city"
                label="City"
                variant="outlined"
                fullWidth
                autoComplete="off"
                value={this.state.property.city}
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="country"
                label="Country"
                variant="outlined"
                fullWidth
                autoComplete="off"
                value={this.state.property.country}
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name="description"
                label="Description Property"
                variant="outlined"
                fullWidth
                multiline
                value={this.state.property.description}
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name="description_in"
                label="Description Interior Property"
                variant="outlined"
                fullWidth
                multiline
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
                  {this.state.files.map((element, i) => (
                    <TableRow key={i}>
                      <TableCell align="left">
                        <img src={element.urlTemp} style={style.photo} />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          onClick={this.deletePhoto(element.name)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={12} md={6}>
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

export default consumerFirebase(NewProperty);
