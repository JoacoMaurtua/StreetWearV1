import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; //useDispatch sirve para sirve para llamar una accion //useSelector sirve para seleccionar una parte del estado
import { Link, useParams, useHistory } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  listDetailsProduct,
  createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Meta from '../components/Meta';

const Productscreen = () => {
  const [qty, setQty] = useState(1); //cantidad en el stock //quizas sea 1
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { id } = useParams();

  const history = useHistory();

  const dispatch = useDispatch();

  const productDetailList = useSelector((state) => state.productDetails); //extrae datos del estado del store, en este caso la propiedad productList
  const { loading, error, product } = productDetailList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const { loading: loadingCreateReview,success:successCreateReview, error: errorCreateReview } =
    productCreateReview;

  useEffect(() => {
    if(successCreateReview){
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    }
    //llama a la funcion creadora de actions
    dispatch(listDetailsProduct(id));
  }, [dispatch, id,successCreateReview]);

  const addToCart = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler =(e) => {
    e.preventDefault();
    dispatch(createProductReview(id,{
      rating,
      comment
    }))
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Regresar
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name}/>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} ${
                      product.numReviews > 1
                        ? 'comentarios'
                        : product.numReviews === 0
                        ? 'cometarios'
                        : 'cometario'
                    }`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Precio: S/.{product.price}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  Descripción: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Precio:</Col>
                      <Col>
                        <strong>S/.{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Estado:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'En Stock' : 'Fuera de Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Cantidad</Col>
                        <Col>
                          <Form.Select
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (
                                x /* Crear un arreglo con el numero de posiciones que tanga el stock */
                              ) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCart}
                      className="btn-block"
                      type="button"
                      style={{ width: '100%' }}
                      disabled={product.countInStock === 0}
                    >
                      Agregar al Carrito
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Comentarios</h2>
              {product.reviews.length === 0 && <Message>Sin comentarios</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>¿Cuál es su opinión del producto?</h2>
                  {successCreateReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingCreateReview && <Loader />}
                  {errorCreateReview && (
                    <Message variant='danger'>{errorCreateReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Calificación</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Seleccione...</option>
                          <option value='1'>1 - Malo</option>
                          <option value='2'>2 - Regular</option>
                          <option value='3'>3 - Bueno</option>
                          <option value='4'>4 - Muy Bueno</option>
                          <option value='5'>5 - Excelente</option>

                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comentario</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='4'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)} 
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary' style={{marginTop:'1rem'}}>
                          Enviar
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Por favor <Link to="/login">inicie sesión</Link> para comentar.
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Productscreen;
