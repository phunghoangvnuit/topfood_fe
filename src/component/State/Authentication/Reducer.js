const { isPresentInFavourites } = require("../../config/logic");
const {
  REGISTER_REQUEST,
  LOGIN_REQUEST,
  GET_USER_REQUEST,
  ADD_TO_FAVOURITE_REQUEST,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  ADD_TO_FAVOURITE_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_FAILURE,
  GET_USER_FAILURE,
  ADD_TO_FAVOURITE_FAILURE,
  GET_USER_SUCCESS,
  LOGOUT,
} = require("./ActionTypes");

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
  favourites: [],
  success: null,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
    case ADD_TO_FAVOURITE_REQUEST:
      return { ...state, isLoading: true, error: null, success: null };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwt: action.payload,
        success: "Authenticate Success"
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        favourites: action.payload.favourites
      };
    case ADD_TO_FAVOURITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        favourites: isPresentInFavourites(state.favourites, action.payload)
          ? state.favourites.filter((item) => item.id !== action.payload.id)
          : [action.payload, ...state.favourites],
      };
    case LOGOUT:
      return initialState;

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case ADD_TO_FAVOURITE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: null,
      };
    default:
      return state;
  }
};
