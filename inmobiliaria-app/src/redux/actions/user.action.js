import axios from "axios";

export const getUsersApp = (dispatch) => {
  return new Promise(async (resolve, reject) => {
    const dataRest = await axios.get(
      `https://us-central1-storied-smile-283703.cloudfunctions.net/usersList/list`
    );
    dispatch({
      type: "LIST_USERS",
      payload: dataRest.data.users,
    });
    resolve();
  });
};

export const updateRoles = (dispatch, user, role) => {
  return new Promise(async (resolve, reject) => {
    const params = {
      id: user.id,
      role,
      roles: user.roles,
    };
    const dataRest = await axios.post(
      `https://us-central1-storied-smile-283703.cloudfunctions.net/usersCrud`,
      params
    );
    dispatch({
      type: "UPDATE_ROLES",
      payload: dataRest.data,
    });
    resolve();
  });
};
