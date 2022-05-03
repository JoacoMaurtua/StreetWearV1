import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_LOGOUT,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
 

} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }; //retorna un objeto nuevo con el estado(array) aun vacio

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }; //retorna un objeto nuevo con el estado(array) lleno con los datos traidos por axios de la DB

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }; //retorna un objeto nuevo que contiene el error definido en productActions.js

    case USER_LOGOUT:
      return {};

    default:
      return state; //retorna el mismo estado en caso no se envie una accion valida
  }
};



export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }; //retorna un objeto nuevo con el estado(array) aun vacio

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }; //retorna un objeto nuevo con el estado(array) lleno con los datos traidos por axios de la DB

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }; //retorna un objeto nuevo que contiene el error definido en productActions.js

    default:
      return state; //retorna el mismo estado en caso no se envie una accion valida
  }
};


export const userDetailsReducer = (state = {user:{}}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state,loading: true }; //retorna un objeto nuevo con el estado(array) aun vacio

    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }; //retorna un objeto nuevo con el estado(array) lleno con los datos traidos por axios de la DB

    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }; //retorna un objeto nuevo que contiene el error definido en productActions.js

    case USER_DETAILS_RESET:
      return { user: {}}

    default:
      return state; //retorna el mismo estado en caso no se envie una accion valida
  }
};



export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {loading: true }; //retorna un objeto nuevo con el estado(array) aun vacio

    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success:true, userInfo: action.payload }; //retorna un objeto nuevo con el estado(array) lleno con los datos traidos por axios de la DB

    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }; //retorna un objeto nuevo que contiene el error definido en productActions.js

    case USER_UPDATE_PROFILE_RESET:
      return {}

    default:
      return state; //retorna el mismo estado en caso no se envie una accion valida
  }
};

export const userListReducer = (state = {users: []}, action) =>{
  switch (action.type){
    case USER_LIST_REQUEST:
      return {loading: true}

    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload
      }

    case USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    case USER_LIST_RESET:
      return { users:[] }

    default: 
      return state
  }
};


export const userDeleteReducer = (state = {}, action) =>{
  switch (action.type){
    case USER_DELETE_REQUEST:
      return {loading: true}

    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true
      }

    case USER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    default: 
      return state
  }
};


export const userUpdateReducer = (state = { user: {} }, action) =>{
  switch (action.type){
    case USER_UPDATE_REQUEST:
      return {loading: true}

    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true
      }

    case USER_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    case USER_UPDATE_RESET:
      return{
        user: {}
      }

    default: 
      return state
  }
};