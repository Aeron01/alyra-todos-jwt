export const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_INIT":
      return {
        ...state,
        loading: true,
        error: "",
      }
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      }
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: "",
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
        error: "",
      }
    default:
      throw new Error(`Unsupported action type ${action.type} in userReducer`)
  }
}