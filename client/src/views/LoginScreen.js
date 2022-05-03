import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';


const Loginscreen = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const { email, password } = state;

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin) //extrae un pedazo del state del store
  const {loading,error,userInfo} = userLogin

  const location = useLocation();

  const history = useHistory();

  const redirect = location.search ? location.search.split('=')[1]:'/'

  /*EJEMPLO*/
  ///search?q=bugatti => location.search?

  // location.search.split('=')[1] => 0[search?q] = 1[bugatti]

  //redirect = bugatti

  //Nos redirija a la pagina si ya estamos logueados
  useEffect(() => {
    if(userInfo){
      history.push(redirect) //por ahora siempre nos manda a '/' => home
    }
  },[history,userInfo,redirect])

  console.log('redirect: ',redirect);

  const submitHandler = (event) => {
    event.preventDefault();
    //USER DISPATCH
    dispatch(login(email,password))
  };

  const onChangeHandler = (event) => {
    const {name,value} = event.target;
    setState({
      ...state,
      [name]:value
    })
  }

  return (
    <FormContainer>
      <h1>Inicia Sesión</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Correo Electrónico: </Form.Label>
          <Form.Control
            style={{marginBottom:'1rem'}}
            type="email"
            placeholder="Enter your email"
            name='email'
            value={email}
            onChange={onChangeHandler}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Contraseña: </Form.Label>
          <Form.Control
            style={{marginBottom:'1rem'}}
            type="password"
            placeholder="Enter your password"
            name='password'
            value={password}
            onChange={onChangeHandler}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Iniciar Sesión
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          ¿Cliente Nuevo?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Regístrate
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Loginscreen;
