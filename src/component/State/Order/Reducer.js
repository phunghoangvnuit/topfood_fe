import {
  GET_USERS_NOTIFICATION_SUCCESS,
  GET_USERS_ORDERS_FAILURE,
  GET_USERS_ORDERS_REQUEST,
  GET_USERS_ORDERS_SUCCESS,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
} from "./ActionTypes";

const initialState = {
  loading: false,
  orders: [],
  error: null,
  order: {},
};
export const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS_ORDERS_REQUEST:
      return { ...state, error: null, loading: true };

    case GET_USERS_ORDERS_SUCCESS:
      return { ...state, error: null, loading: false, orders: payload };

    case GET_USERS_ORDERS_FAILURE:
      return { ...state, error: payload, loading: false };

    case GET_ORDER_BY_ID_REQUEST:
      return { ...state, error: null, loading: true };

    case GET_ORDER_BY_ID_SUCCESS:
      return { ...state, error: null, loading: false, order: payload };

    case GET_ORDER_BY_ID_FAILURE:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};
