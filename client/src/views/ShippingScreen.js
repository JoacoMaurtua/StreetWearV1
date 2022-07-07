import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { useHistory } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const Shippingscreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [state, setState] = useState({
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country,
  });

  const { address, city, postalCode, country } = state;

  const dispatch = useDispatch();

  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );
    history.push('/payment');
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <FormContainer>
      
      <CheckoutSteps step1 step2 />
      <h1>Envío</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Dirección: </Form.Label>
          <Form.Control
            style={{ marginBottom: '1rem' }}
            type="text"
            placeholder="Ingrese su dirección"
            name="address"
            value={address}
            required
            onChange={onChangeHandler}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>Ciudad: </Form.Label>
          <Form.Control
            style={{ marginBottom: '1rem' }}
            type="text"
            placeholder="Ingrese su ciudad"
            name="city"
            value={city}
            required
            onChange={onChangeHandler}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Código Postal: </Form.Label>
          <Form.Control
            style={{ marginBottom: '1rem' }}
            type="text"
            placeholder="Ingrese su cógigo postal"
            name="postalCode"
            value={postalCode}
            required
            onChange={onChangeHandler}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Ciudad: </Form.Label>
          <Form.Control
            style={{ marginBottom: '1rem' }}
            type="text"
            placeholder="Ingrese su país"
            name="country"
            value={country}
            required
            onChange={onChangeHandler}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continuar
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Shippingscreen;
