import { createStore, combineReducers, applyMiddleware } from 'redux'; //crea el store, agrupa todos los reducers, middleware
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'; //metodo para que las redux dev tools del browser se apliquen al proyecto

import {
  productListReducer,
  productListDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productCreateReviewReducer,
  productTopRatedReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderMyListReducer,
  orderListReducer,
  orderDeliverReducer
} from './reducers/orderReducers';
//Variable que engloba a los reducers y combina sus propiedades en un solo objeto

//ESTADO GLOBAL:
const reducer = combineReducers({
  productList: productListReducer, //pedazos del estado
  productDetails: productListDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productCreateReview:productCreateReviewReducer,
  productTopRated:productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer, 
  userUpdateProfile: userUpdateProfileReducer, //el user actualiza su propia info
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer, //el admin actualiza la info del user
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMyList: orderMyListReducer,
  orderList: orderListReducer,
  orderDeliver:orderDeliverReducer,
});

//Almacenar la data del carrito de compras en el local storage
const cartItemsFromStorage = localStorage.getItem('cartItems') //si existe cartItems en LocalStorage
  ? JSON.parse(localStorage.getItem('cartItems'))//conviertde de JSON a js
  : [];

//Almacenar la data del usuario en el local storage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk]; // middleware para hacer llamadas asincronas en el mundo de redux

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(
    //Creamos la unica store de la aplicacion
    applyMiddleware(...middleware) //accedemos a la funcionalidad del middleware thunk, store es el que gestiona todo
  )
);

export default store;
