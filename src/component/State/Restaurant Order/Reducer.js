// Restaurant Order/Reducer.js
import {
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
  GET_RESTAURANTS_ORDER_REQUEST,
  GET_RESTAURANTS_ORDER_SUCCESS,
  GET_RESTAURANTS_ORDER_FAILURE,
  UPDATE_PAYMENT_STATUS_SUCCESS,
  UPDATE_PAYMENT_STATUS_REQUEST,
  UPDATE_PAYMENT_STATUS_FAILURE,
  SEARCH_ORDER_REQUEST,
  SEARCH_ORDER_SUCCESS,
  SEARCH_ORDER_FAILURE
} from "./ActionTypes.js"

const initialState = {
  loading: false,
  error: null,
  orders: [],
  search: [],
  message: null
};

const restaurantsOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESTAURANTS_ORDER_REQUEST:
    case UPDATE_PAYMENT_STATUS_REQUEST:
    case UPDATE_ORDER_STATUS_REQUEST:
      return {...state,loading:true,error:null};

    case GET_RESTAURANTS_ORDER_SUCCESS:
      return {...state,loading:false,orders:action.payload};

    case UPDATE_PAYMENT_STATUS_SUCCESS:
    case UPDATE_ORDER_STATUS_SUCCESS:
      const updatedOrders = state.orders.map((order) =>
        order.id === action.payload.id?action.payload:order
      );
      return {...state,loading:false,orders:updatedOrders};
    case GET_RESTAURANTS_ORDER_FAILURE:
    case UPDATE_PAYMENT_STATUS_FAILURE:
    case UPDATE_ORDER_STATUS_FAILURE:
      return {...state,loading:false,error:action.error};

    case SEARCH_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message: null
      }
    case SEARCH_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        search: action.payload
      }
    case SEARCH_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: null
      }

    default: 
      return state;
  }
};

export default restaurantsOrderReducer;