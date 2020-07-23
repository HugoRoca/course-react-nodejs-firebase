const initialState = {
  user: {
    name: "",
    last_name: "",
    email: "",
    phone: "",
    id: "",
    photo: "",
  },
  authenticate: false,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.session,
        authenticate: true,
      };
    case "CHANGE_SESSION":
      return {
        ...state,
        user: action.newUser,
        authenticate: action.authenticate,
      };
    case "LOGOUT":
      return {
        ...state,
        user: action.session,
        authenticate: action.authenticate,
      };
    default:
      return state;
  }
};

export default sessionReducer;
