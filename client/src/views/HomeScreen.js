import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions'; //traemos las acciones de products
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useParams, Link } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import NavMenu from '../components/NavMenu/NavMenu';
import AsideMenu from '../components/AsideMenu/AsideMenu';

//import axios from 'axios';

const Homescreen = () => {
  const dispatch = useDispatch(); //devuelve una referencia al dispatch enviado por la accion al store

  const { keyword, keyword2, keyword3 } = useParams(); //idea: urilizar un arreglo de keywords

  const { pageNumber } = useParams() || 1;

  //creando el rango de precio
  const [price, setPrice] = useState([1, 3000]);

  const productList = useSelector((state) => state.productList); //extrae datos del estado del store, en este caso la propiedad productList
  const { loading, error, products, pages, page } = productList; //extrae las propiedades del objeto que devuelve el productReducer

  useEffect(() => {
    //activa las funcionalidades de las acciones
    dispatch(listProducts(keyword, keyword2, keyword3, pageNumber, price)); //llamo a la funcion creadora de acciones la cual despacha la data del API
  }, [dispatch, keyword, keyword2, keyword3, pageNumber, price]);

  return (
    <>
      <Meta />
      <NavMenu />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Regresar
        </Link>
      )}
      <h1 style={{ margin: '2rem 0' }}>Últimos Productos</h1>
      {loading ? ( //Si la data esta cargando(loading:true en el reducer)
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message> //Si hubo un error se activa la accion PRODUCT_LIST_FAIL
      ) : (
        <Container fluid>
          <Row>
            {keyword ? (
              <>
                <Col sm={12} lg={3} style={{ paddingLeft: '0' }}>
                  <AsideMenu
                    price={price}
                    setPrice={setPrice}
                    keyword={keyword}
                    keyword2={keyword2}
                  />
                  {console.log('precio al dar click', price)}
                </Col>
                <Col sm={12} lg={9} style={{ paddingRight: '0' }}>
                  <Row>
                    {products.map((product, index) => (
                      <Col key={index} sm={12} md={6} lg={4}>
                        <Product product={product} />
                      </Col>
                    ))}
                  </Row>
                </Col>
              </>
            ) : (
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            )}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
            keyword2={keyword2 ? keyword2 : ''}
            keyword3={keyword3 ? keyword3 : ''}
          />{' '}
          {/* puede ser que aqui implemente una funcionalidad */}
        </Container>
      )}
    </>
  );
};

export default Homescreen;
