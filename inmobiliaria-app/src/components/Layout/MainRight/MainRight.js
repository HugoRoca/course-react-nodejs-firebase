import React from 'react'
import { List, ListItem, Link, Avatar, ListItemText } from "@material-ui/core";

export const MainRight = ({ classes, user, photoUser, logout }) => (
  <div className={classes.list}>
    <List>
      <ListItem button component={Link} to="/signup">
        <Avatar src={photoUser} />
        <ListItemText
          classes={{ primary: classes.listItemTxt }}
          primary={user.name}
        />
      </ListItem>
      <ListItem button onClick={logout}>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Logout"
        />
      </ListItem>
    </List>
  </div>
);
