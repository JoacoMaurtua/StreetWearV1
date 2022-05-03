import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  //ORDER_PAY_RESET,
  ORDER_MYLIST_SUCCESS,
  ORDER_MYLIST_FAIL,
  ORDER_MYLIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
} from '../constants/orderConstants';
import axios from 'axios';

import { logout } from './userActions'

export const createOrder = (order) => async (dispatch, getState) => {
  //objeto gigante con toda la info de lo que estas comprando
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    //Autorizacion del token y su uso para lo que sea
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/order`, order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  //objeto gigante con toda la info de lo que estas comprando
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    //Autorizacion del token y su uso para lo que sea
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/order/${id}`, config);
    console.log({data:data})

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    //paymentResult es un objeto que viene de PayPal
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/order/${orderId}/pay`, //Ruta que actualiza una nueva orden considerando los datos del paymentResult
        paymentResult,
        config
      );

      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: message,
      });
    }
  };

  export const listMyOrders = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_MYLIST_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/order/myorders`, config)
  
      dispatch({
        type: ORDER_MYLIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: ORDER_MYLIST_FAIL,
        payload: message,
      })
    }
  };

  //ADMIN
  export const listOrders = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/order/allorders`, config)
  
      dispatch({
        type: ORDER_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: ORDER_LIST_FAIL,
        payload: message,
      })
    }
  };

  //admin
  export const deliverOrder = (order) => async (dispatch, getState) => {
    //paymentResult es un objeto que viene de PayPal
    try {
      dispatch({
        type: ORDER_DELIVER_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(`/api/order/${order._id}/deliver`,{}, config );//Ruta que actualiza una nueva orden considerando los datos del paymentResult
      
      dispatch({
        type: ORDER_DELIVER_SUCCESS,
        payload: data,
      });

    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ORDER_DELIVER_FAIL,
        payload: message,
      });
    }
  };