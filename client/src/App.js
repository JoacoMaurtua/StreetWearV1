import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './views/HomeScreen';
import ProductScreen from './views/ProductScreen';
import CartScreen from './views/CartScreen';
import LoginScreen from './views/LoginScreen';
import RegisterScreen from './views/RegisterScreen';
import ProfileScreen from './views/ProfileScreen';
import ShippingScreen from './views/ShippingScreen';
import PaymentScreen from './views/PaymentScreen';
import PlaceOrderScreen from './views/PlaceOrderScreen';
import OrderScreen from './views/OrderScreen';
import UserListScreen from './views/UserListScreen';
import UserEditProfileScreen from './views/UserEditProfile';
import ProductListScreen from './views/ProductListScreen';
import ProductEditScreen from './views/ProductEditScreen';
import OrderListScreen from './views/OrderListScreen';



const App = () => {
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
          <Route path='/' component={HomeScreen} exact/> 
          <Route path='/register' component={RegisterScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen}/>
          <Route path='/cart/:id?' component ={CartScreen} />
          <Route path='/shipping' component ={ShippingScreen} />
          <Route path='/payment' component ={PaymentScreen} />
          <Route path='/placeorder' component ={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/admin/userlist' component={UserListScreen}/>
          <Route path='/admin/user/:id/edit' component={UserEditProfileScreen}/>
          <Route path='/admin/productlist' component={ProductListScreen} exact/>
          <Route path='/admin/productlist/:pageNumber' component={ProductListScreen} exact/>
          <Route path='/admin/product/:id/edit' component={ProductEditScreen}/>
          <Route path='/admin/orderlist' component={OrderListScreen}/>
          <Route path='/search/:keyword' component={HomeScreen} exact/> 
          <Route path='/search/:keyword/:keyword2' component={HomeScreen} exact/> 
          <Route path='/page/:pageNumber' component={HomeScreen} exact/> {/* Funciona bien siempre */}
          <Route path='/search/:keyword?/page/:pageNumber?' component={HomeScreen} exact/>   {/* Comportamiento secundario inesperado */}
          <Route path='/search/:keyword?/:keyword2?/page/:pageNumber?' component={HomeScreen} exact/> {/* Comportamiento secundario inesperado */}
         

        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;


