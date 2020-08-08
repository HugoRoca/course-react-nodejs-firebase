import axios from "axios";

export const sendEmail = (dispatch, email) => {
  return new Promise(async (resolve, reject) => {
    const dataResponse = await axios.post(
      "https://us-central1-storied-smile-283703.cloudfunctions.net/mailSend",
      email
    );
    resolve(dataResponse);
  });
};
