import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import {
  Container,
  Paper,
  Grid,
  Breadcrumbs,
  Link,
  Typography,
  TextField,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  ButtonGroup,
} from "@material-ui/core";
import { style } from "./ListProperty.css";
import { HouseOutlined } from "@material-ui/icons";
import { consumerFirebase } from "../../../server";
import logoDefault from "../../../logo.svg";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import { getData } from "../../../session/actions/property.action";

class ListProperty extends Component {
  state = {
    properties: [],
    textSearch: "",
    pages: [],
    pageSize: 6,
    casa: null,
    actualPage: 0,
  };

  changeTextSearch = (e) => {
    const self = this;
    self.setState({
      [e.target.name]: e.target.value,
    });

    if (self.state.tyingTimeout) {
      clearTimeout(self.state.tyingTimeout);
    }

    self.setState({
      name: e.target.value,
      typing: false,
      typingTimeout: setTimeout((goTime) => {
        let objectQuery = this.props.firebase.db
          .collection("Properties")
          .orderBy("direction")
          .where(
            "keywords",
            "array-contains",
            self.state.textSearch.toLowerCase()
          );

        if (self.state.textSearch.trim() === "") {
          objectQuery = this.props.firebase.db
            .collection("Properties")
            .orderBy("direction");
        }

        objectQuery.get().then((snapshot) => {
          const arrayProperty = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });

          this.setState({
            properties: arrayProperty,
          });
        });
      }, 500),
    });
  };

  nextPage = () => {
    const { actualPage, pageSize, textSearch, pages } = this.state;
    const firebase = this.props.firebase;

    getData(firebase, pageSize, pages[actualPage].endValue, textSearch).then(
      (firebaseReturnData) => {
        if (firebaseReturnData.arrayProperties.length > 0) {
          const page = {
            initialValue: firebaseReturnData.initialValue,
            endValue: firebaseReturnData.endValue,
          };

          pages.push(page);

          this.setState({
            pages,
            actualPage: actualPage + 1,
            properties: firebaseReturnData.arrayProperties,
          });
        }
      }
    );
  };

  async componentDidMount() {
    const { pageSize, textSearch, casa, pages, actualPage } = this.state;
    const firebase = this.props.firebase;
    const firebaseReturnData = await getData(
      firebase,
      pageSize,
      casa,
      textSearch
    );
    const page = {
      initialValue: firebaseReturnData.initialValue,
      endValue: firebaseReturnData.endValue,
    };

    pages.push(page);

    this.setState({
      properties: firebaseReturnData.arrayProperties,
      pages,
      actualPage,
    });
  }

  deleteProperty = (id) => {
    this.props.firebase.db
      .collection("Properties")
      .doc(id)
      .delete()
      .then((success) => {
        this.deleteIdListProperty(id);
      });
  };

  deleteIdListProperty = (id) => {
    const newPropertyList = this.state.properties.filter(
      (property) => property.id !== id
    );
    this.setState({
      properties: newPropertyList,
    });
  };

  editProperty = (id) => {
    this.props.history.push("/property/edit/" + id);
  };

  render() {
    return (
      <Container style={style.cardGrid}>
        <Paper style={style.paper}>
          <Grid item xs={12} sm={12}>
            <Breadcrumbs aria-label="breadcrumbs">
              <Link color="inherit" style={style.link} href="/">
                <HouseOutlined /> Home
              </Link>
              <Typography color="textPrimary">My Properties</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item xs={12} sm={6} style={style.gridTextField}>
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              name="textSearch"
              variant="outlined"
              label="Input the property to search"
              onChange={this.changeTextSearch}
              value={this.state.textSearch}
            />
          </Grid>
          <Grid item xs={12} sm={12} style={style.barButton}>
            <Grid
              container
              spacing={1}
              direction="column"
              alignItems="flex-end"
            >
              <ButtonGroup size="small" aria-label="Small outline group">
                <Button>
                  <ArrowLeft />
                </Button>
                <Button onClick={this.nextPage}>
                  <ArrowRight />
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} style={style.gridTextField}>
            <Grid container spacing={4}>
              {this.state.properties.map((card) => (
                <Grid item key={card.id} xs={12} sm={6} md={4}>
                  <Card style={style.card}>
                    <CardMedia
                      style={style.cardMedia}
                      image={
                        card.photos
                          ? card.photos[0]
                            ? card.photos[0]
                            : logoDefault
                          : logoDefault
                      }
                      title="My property"
                    />
                    <CardContent style={style.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.city + ", " + card.country}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        onClick={() => this.editProperty(card.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="secondary"
                        variant="outlined"
                        onClick={() => this.deleteProperty(card.id)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

export default consumerFirebase(ListProperty);
