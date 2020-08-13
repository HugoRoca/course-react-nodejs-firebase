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

export const updateRoles = (dispatch, user, role, firebase) => {
  return new Promise(async (resolve, reject) => {
    firebase.auth.onAuthStateChanged((userResponse) => {
      if (userResponse) {
        userResponse.getIdToken().then(async (tokenUser) => {
          const headers = {
            "Content-Type": "Application/json",
            authorization: "Bearer " + tokenUser,
          };

          const params = {
            id: user.id,
            role,
            roles: user.roles,
          };

          const response = await axios.post(
            "https://us-central1-storied-smile-283703.cloudfunctions.net/usersCrud",
            params,
            { "headers": headers }
          );
          resolve(response);
        });
      }
    });
  });
};
