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
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
  DialogActions,
} from "@material-ui/core";
import { style } from "./ListUser.css";
import { getUsersApp, updateRoles } from "../../../redux/actions/user.action";
import { sendEmail } from "../../../redux/actions/email.action";
import { useStateValue } from "../../../session/store";
import { openMessage } from "../../../session/actions/snackBar.action";
import { refreshSession } from "../../../session/actions/session.action";
import { consumerFirebase } from "../../../server";

const ListUser = (props) => {
  const [{ session }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);
  const [stateDialog, setStateDialog] = useState(false);
  const [selectRole, setSelectRole] = useState("0");
  const [userDialog, setUserDialog] = useState({
    email: "",
    phone: "",
    roles: [],
  });
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

  const openDialogWithUser = (row) => {
    setUserDialog(row);
    setStateDialog(true);
  };

  const eventCombo = (event) => {
    setSelectRole(event.target.value);
  };

  const addRole = async () => {
    if (!userDialog.roles) {
      userDialog.roles = [];
    }

    const existsRole = userDialog.roles.filter(
      (rol) => rol.name === selectRole
    );

    if (existsRole.length === 0) {
      const customClaims = {};
      userDialog.roles.map((role) => {
        Object.defineProperty(customClaims, role.name, {
          value: role.state,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      });

      Object.defineProperty(customClaims, selectRole, {
        value: true,
        writable: true,
        enumerable: true,
        configurable: true,
      });

      userDialog.roles.push({ name: selectRole, state: true });

      await updateRoles(dispatchRedux, userDialog, customClaims);
      await getUsersApp(dispatchRedux);

      refreshSession(props.firebase);

      openMessage(dispatch, {
        open: true,
        message: "Added role successfully",
      });
    }
  };

  const removeRol = async (rol) => {
    const newArrayRoles = userDialog.roles.filter(
      (currentRol) => currentRol.name !== rol
    );
    const customClaims = {};

    userDialog.roles = newArrayRoles;

    newArrayRoles.map((rol) => {
      Object.defineProperty(customClaims, rol.name, {
        value: rol.state,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    });

    Object.defineProperty(customClaims, rol, {
      value: false,
      writable: true,
      enumerable: true,
      configurable: true,
    });

    await updateRoles(dispatchRedux, userDialog, customClaims);
    await getUsersApp(dispatchRedux);

    refreshSession(props.firebase);

    openMessage(dispatch, {
      open: true,
      message: "Remove role successfully",
    });
  };

  return (
    <Container style={style.container}>
      <Dialog
        open={stateDialog}
        onClose={() => {
          setStateDialog(false);
        }}
      >
        <DialogTitle>
          User Roles {userDialog.email || userDialog.phone}
        </DialogTitle>
        <DialogContent>
          <Grid container justify="center">
            <Grid item xs={6} sm={6}>
              <Select value={selectRole} onChange={eventCombo}>
                <MenuItem value={"0"}>Select Rol</MenuItem>
                <MenuItem value={"ADMIN"}>Admin</MenuItem>
                <MenuItem value={"OPERATOR"}>Operator</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => addRole()}
              >
                Add
              </Button>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Table>
                <TableBody>
                  {userDialog.roles
                    ? userDialog.roles.map((rol, i) => (
                        <TableRow key={i}>
                          <TableCell align="left">{rol.name}</TableCell>
                          <TableCell align="left">
                            <Button
                              color="primary"
                              size="small"
                              variant="contained"
                              onClick={() => removeRol(rol.name)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => setStateDialog(false)}
          ></Button>
        </DialogActions>
      </Dialog>
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
                            onClick={() => openDialogWithUser(row)}
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

export default consumerFirebase(ListUser);
