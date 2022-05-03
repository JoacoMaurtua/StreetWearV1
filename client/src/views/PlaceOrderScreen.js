import React, { useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import {createOrder} from '../actions/orderActions';

const Placeorderscreen = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const cart = useSelector((state) => state.cart); //cart del store

  const  addDecimals =(num)=>{
    return (Math.round(num*100)/100).toFixed(2)
  }

  // Calculando precios: 
  cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => 
    acc + item.price * item.qty, 0
  ))

  cart.shippingPrice = addDecimals(cart.itemsPrice > 500? 0: 100)

  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))

  cart.totalPrice = addDecimals(Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice))

  //necesitamos envolver toda los datos de la orden en un estado

  const orderCreate = useSelector(state => state.orderCreate)
  const {order, success, error} = orderCreate;

  useEffect(() =>{
    if(success){
      history.push(`/order/${order._id}`) //aun no esta creada la ruta
    }
  },[success,history,order])

  const placeOrderHandler = () => { //lleno mi esquema de order con la info del carrito
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  console.log('order:',order)

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Envío</h2>
              <p>
                <strong>Dirección: </strong>
                {cart.shippingAddress.address}
                {cart.shippingAddress.city}
                {cart.shippingAddress.postalCode}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Método de Pago</h2>
              <strong>Método:</strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Artículos Seleccionados</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Su carrito esta vacío</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x S/.{item.price} = S/.{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card style={{height:"100%"}}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Resumen de Ordenes</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Artículos</Col>
                  <Col>S/.{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Envío</Col>
                  <Col>S/.{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Impuesto</Col>
                  <Col>S/.{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>S/.{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                  {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  style={{marginTop:'2rem'}}
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >Realizar Compra</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Placeorderscreen;
