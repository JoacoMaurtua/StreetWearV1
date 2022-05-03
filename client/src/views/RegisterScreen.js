import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';


const RegisterScreen = () => {
  const [state, setState] = useState({
    name:'',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState(null); //passwords hacen o no match

  const { name, email, password, confirmPassword } = state;

  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)
  const {loading,error,userInfo} = userRegister

  const location = useLocation();

  const history = useHistory();

  const redirect = location.search ? location.search.split('=')[1]:'/'

  //Nos redirija a la pagina si ya estamos logueados
  useEffect(() => {
    if(userInfo){
      history.push(redirect)
    }
  },[history,userInfo,redirect])

  const submitHandler = (event) => {
    event.preventDefault();
    //DISPATCH REGISTER
    if(password !== confirmPassword){
      setMessage('Passwords do not match')
    }else{
      dispatch(register(name,email,password))
    }
    
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
      <h1>Registrarse</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
      <Form.Group controlId="name">
          <Form.Label>Nombre: </Form.Label>
          <Form.Control
            style={{marginBottom:'1rem'}}
            type="name"
            placeholder="Enter your name"
            name='name'
            value={name}
            onChange={onChangeHandler}
          ></Form.Control>
        </Form.Group>

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

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirmar Contraseña: </Form.Label>
          <Form.Control
            style={{marginBottom:'1rem'}}
            type="password"
            placeholder="Confirm your Password please"
            name='confirmPassword'
            value={confirmPassword}
            onChange={onChangeHandler}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Registrarse
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          ¿Ya tienes una cuenta?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Iniciar Sesión
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
