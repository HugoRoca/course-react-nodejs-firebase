export const login = (dispatch, firebase, email, password) => {
  return new Promise((resolve, reject) => {
    firebase.auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        firebase.db
          .collection("Users")
          .doc(auth.user.uid)
          .get()
          .then((doc) => {
            const userDb = doc.data();
            dispatch({
              type: "LOGIN",
              session: userDb,
              authenticate: true,
            });
            resolve();
          });
      })
      .catch((err) => {
        console.log(err);
        reject();
      });
  });
};

export const createUser = (dispatch, firebase, user) => {
  return new Promise((resolve, reject) => {
    firebase.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((auth) => {
        const newUser = {
          id: auth.user.uid,
          email: user.email,
          name: user.name,
          last_name: user.last_name,
        };
        firebase.db
          .collection("Users")
          .doc(auth.user.uid)
          .set(newUser, { merge: true })
          .then(() => {
            dispatch({
              type: "CHANGE_SESSION",
              newUser,
              authenticate: true,
            });
            resolve();
          });
      })
      .catch((err) => {
        console.log(err);
        reject();
      });
  });
};

export const logout = (dispatch, firebase) => {
  return new Promise((resolve, reject) => {
    firebase.auth.signOut().then((out) => {
      dispatch({
        type: "LOGOUT",
        session: {
          name: "",
          last_name: "",
          email: "",
          photo: "",
          id: "",
          phone: "",
        },
        authenticate: false,
      });
      resolve();
    });
  });
};
