import React from "react";
import { List, ListItem, ListItemText, Divider } from "@material-ui/core";
import { Link } from 'react-router-dom'

export const MainLeft = ({ classes }) => (
  <div className={classes.list}>
    <List>
      <ListItem component={Link} button to="/profile">
        <i className="material-icons">account_box</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Profile"
        />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem component={Link} button to="">
        <i className="material-icons">add_box</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="new property"
        ></ListItemText>
      </ListItem>
      <ListItem component={Link} button to="">
        <i className="material-icons">business</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Properties"
        ></ListItemText>
      </ListItem>
      <ListItem component={Link} button to="">
        <i className="material-icons">mail</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Messages"
        ></ListItemText>
      </ListItem>
    </List>
  </div>
);
