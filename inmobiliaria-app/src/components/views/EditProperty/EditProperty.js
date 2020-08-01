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
} from "@material-ui/core";
import { style } from "./EditProperty.css";
import { HouseOutlined } from "@material-ui/icons";

class EditProperty extends Component {
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="city"
                label="City"
                fullWidth
                variant="outlined"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="country"
                label="Country"
                fullWidth
                variant="outlined"
                autoComplete="off"
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
              />
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
