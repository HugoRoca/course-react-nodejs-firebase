import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Paper,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@material-ui/core";
import { style } from "./ListUser.css";
import { getUsersApp } from "../../../redux/actions/user.action";
import { sendEmail } from "../../../redux/actions/email.action";
import { useStateValue } from "../../../session/store";
import { openMessage } from "../../../session/actions/snackBar.action";

const ListUser = (props) => {
  const [{ session }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);
  const listArray = useSelector((state) => state.userRedux.users);
  const dispatchRedux = useDispatch();

  useEffect(() => {
    async function getData() {
      await getUsersApp(dispatchRedux);
    }

    if (!isLoading) {
      setIsLoading(true);
      getData();
    }
  });

  const sendEmailButton = (email) => {
    const obj = {
      email,
      title: "Message from APP React extreme",
      message: "This email es for test",
    };
    sendEmail(obj).then((data) => {
      openMessage(dispatch, {
        open: true,
        message: "the message send to " + email,
      });
    });
  };

  return (
    <Container style={style.container}>
      <Paper style={style.paper}>
        <Grid container justify="center">
          <Grid item xs={12} sm={12}>
            <Table>
              <TableBody>
                {listArray
                  ? listArray.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell align="left">
                          {row.email || row.phone}
                        </TableCell>
                        <TableCell align="left">
                          {row.name ? row.name + " " + row.last_name : ""}
                        </TableCell>
                        <TableCell align="left">
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                          >
                            Roles
                          </Button>
                        </TableCell>
                        <TableCell align="left">
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => sendEmailButton(row.email)}
                          >
                            Send message
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ListUser;
