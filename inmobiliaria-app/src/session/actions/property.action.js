import { CasinoSharp } from "@material-ui/icons";

export const getData = async (firebase, pageSize, casa, text) => {
  return new Promise(async (resolve, reject) => {
    let properties = firebase.db
      .collection("Properties")
      .where("userId", "==", firebase.auth.currentUser.uid)
      .orderBy("direction")
      .limit(pageSize);

    if (casa !== null) {
      properties = firebase.db
        .collection("Properties")
        .where("userId", "==", firebase.auth.currentUser.uid)
        .orderBy("direction")
        .startAfter(casa)
        .limit(pageSize);

      if (text.trim() !== "") {
        properties = firebase.db
          .collection("Properties")
          .where("userId", "==", firebase.auth.currentUser.uid)
          .orderBy("direction")
          .where("keywords", "array-contains", text.toLowerCase())
          .startAfter(casa)
          .limit(pageSize);
      }
    }

    const snapshot = await properties.get()
    const arrayProperties = snapshot.docs.map(doc => {
      let data = doc.data()
      let id = doc.id
      return {
        id, ...data
      }
    })

    const initialValue = snapshot.docs[0]
    const endValue = snapshot.docs[snapshot.docs.length - 1]

    const returnValue = {
      arrayProperties,
      initialValue,
      endValue
    }

    resolve(returnValue)
  });
};

export const getPreviousData = async (firebase, pageSize, casa, text) => {
  return new Promise(async (resolve, reject) => {
    let properties = firebase.db
      .collection("Properties")
      .where("userId", "==", firebase.auth.currentUser.uid)
      .orderBy("direction")
      .limit(pageSize);

    if (casa !== null) {
      properties = firebase.db
        .collection("Properties")
        .where("userId", "==", firebase.auth.currentUser.uid)
        .orderBy("direction")
        .startAt(casa)
        .limit(pageSize);

      if (text.trim() !== "") {
        properties = firebase.db
          .collection("Properties")
          .where("userId", "==", firebase.auth.currentUser.uid)
          .orderBy("direction")
          .where("keywords", "array-contains", text.toLowerCase())
          .startAt(casa)
          .limit(pageSize);
      }
    }

    const snapshot = await properties.get()
    const arrayProperties = snapshot.docs.map(doc => {
      let data = doc.data()
      let id = doc.id
      return {
        id, ...data
      }
    })

    const initialValue = snapshot.docs[0]
    const endValue = snapshot.docs[snapshot.docs.length - 1]

    const returnValue = {
      arrayProperties,
      initialValue,
      endValue
    }

    resolve(returnValue)
  });
};