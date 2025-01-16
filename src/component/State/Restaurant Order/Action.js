// Restaurant Order/ Action.js
import axios from "axios";
import {
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
  GET_RESTAURANTS_ORDER_REQUEST,
  GET_RESTAURANTS_ORDER_SUCCESS,
  GET_RESTAURANTS_ORDER_FAILURE,
  UPDATE_PAYMENT_STATUS_REQUEST,
  UPDATE_PAYMENT_STATUS_SUCCESS,
  UPDATE_PAYMENT_STATUS_FAILURE
} from "./ActionTypes.js";
import { api } from "../../config/api.js";

export const updateOrderStatus = ({ orderId, jwt }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });

      const response = await api.put(
        `/api/admin/order/${orderId}`, {}, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const updatedOrder = response.data;

      console.log("updated order", updatedOrder);

      dispatch({
        type: UPDATE_ORDER_STATUS_SUCCESS,
        payload: updatedOrder,
      });
    } catch (error) {
      console.log("catch error", error);
      dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, error });
    }
  };
};

export const updatePaymentStatus = ({ orderId, jwt }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PAYMENT_STATUS_REQUEST });

      const response = await api.put(
        `api/order/${orderId}/payment`, {}, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const updatedOrder = response.data;

      console.log("updated order", updatedOrder);

      dispatch({
        type: UPDATE_PAYMENT_STATUS_SUCCESS,
        payload: updatedOrder,
      });
    } catch (error) {
      console.log("catch error", error);
      dispatch({ type: UPDATE_PAYMENT_STATUS_FAILURE, error });
    }
  };
};

export const fetchRestaurantsOrder = ({restaurantId,orderStatus,jwt}) => {
  return async (dispatch) => {
    try {
      dispatch({type:GET_RESTAURANTS_ORDER_REQUEST});

      const {data} = await api.get(
        `/api/admin/order/restaurant/${restaurantId}`,{
          params: {order_status: orderStatus},
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const orders = data;
      console.log("restaurants order ------------ ",orders);
      dispatch({
        type: GET_RESTAURANTS_ORDER_SUCCESS,
        payload: orders,
      });
    } catch (error) {
      dispatch({type:GET_RESTAURANTS_ORDER_FAILURE,error});
    }
  };
};
