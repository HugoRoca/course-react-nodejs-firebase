import axios from "axios";

export const getPermissionNotification = (firebase, user, dispatch) => {
  return new Promise(async (resolve, reject) => {
    const message = firebase.messaging;
    await message.requestPermission();

    const token = await message.getToken();

    if (!user.tokenArray) {
      user.tokenArray = [];
    }

    const tokenArrayFilter = user.tokenArray.filter((tk) => tk !== token);
    tokenArrayFilter.push(token);
    user.tokenArray = tokenArrayFilter;

    firebase.db
      .collection("Users")
      .doc(firebase.auth.currentUser.uid)
      .set(user, { merge: true })
      .then((success) => {
        dispatch({
          type: "LOGIN",
          session: user,
          authenticate: true,
        });
        resolve(true);
      })
      .catch((err) => {
        resolve(false);
      });
  });
};

export const sendNotification = (token) => {
  return new Promise(async (resolve, reject) => {
    const response = await axios.post(
      "https://us-central1-storied-smile-283703.cloudfunctions.net/notificationSend",
      token
    );
    resolve(response);
  });
};
