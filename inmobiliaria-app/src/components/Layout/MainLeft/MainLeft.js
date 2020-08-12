import React from "react";
import { List, ListItem, ListItemText, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";

export const MainLeft = ({ classes, permissionForGetNotification }) => (
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
      <ListItem component={Link} button to="/property/new">
        <i className="material-icons">add_box</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="new property"
        />
      </ListItem>
      <ListItem component={Link} button to="">
        <i className="material-icons">business</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Properties"
        />
      </ListItem>
      <ListItem component={Link} button to="/user/list">
        <i className="material-icons">group</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Users"
        />
      </ListItem>
      <ListItem button onClick={permissionForGetNotification}>
        <i className="material-icons">notifications_none</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Activate notifications"
        />
      </ListItem>
    </List>
  </div>
);
