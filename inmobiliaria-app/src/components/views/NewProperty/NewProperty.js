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
} from "@material-ui/core";
import { style } from "./NewProperty.css";
import { HouseOutlined } from "@material-ui/icons";

export default class NewProperty extends Component {
  state = {
    property: {}
  }

  onChange = (e) => {
    // TODO: create clone
    let property = Object.assign({}, this.state.property);
    property[e.target.name] = e.target.value;
    this.setState({
      property,
    });
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
              <TextField name="direction" label="Direction" variant="outlined" fullWidth autoComplete="off" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField name="city" label="City" variant="outlined" fullWidth autoComplete="off"/>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField name="country" label="Country" variant="outlined" fullWidth autoComplete="off" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField name="description" label="Description Property" variant="outlined" fullWidth multiline/>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField name="descriptionIn" label="Description Interior Property" variant="outlined" fullWidth multiline/>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={12} md={6}>
              <Button type="button" variant="contained" fullWidth size="large" color="primary" style={style.submit}>Save</Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}
