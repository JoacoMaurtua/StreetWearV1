import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listDetailsProduct, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import axios from 'axios';

const ProductEditScreen = () => {
  const history = useHistory();

  const { id } = useParams();

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [gender,setGender] = useState('');

  const [uploading, setUploading] = useState(false);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== id) {
        dispatch(listDetailsProduct(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setGender(product.gender)
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, id, product, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        gender,
        description,
        countInStock,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Regresar
      </Link>
      <FormContainer>
        <h1>Editar Producto</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Nombre: </Form.Label>
              <Form.Control
                style={{ marginBottom: '1rem' }}
                type="name"
                placeholder="Ingresar nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Precio: </Form.Label>
              <Form.Control
                style={{ marginBottom: '1rem' }}
                type="number"
                placeholder="Ingresar precio"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Imagen: </Form.Label>
              <Form.Control
                style={{ marginBottom: '1rem' }}
                type="text"
                placeholder="Ingresar url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
               <Form.Control
                style={{ marginBottom: '1rem' }}
                type='file'
                id='image-file'
                label='Subir un archivo'
                custom
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
             
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Marca: </Form.Label>
              <Form.Control
                style={{ marginBottom: '1rem' }}
                type="text"
                placeholder="Ingresar una marca"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Cantidad en Stock: </Form.Label>
              <Form.Control
                style={{ marginBottom: '1rem' }}
                type="number"
                placeholder="Ingresar stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
            <Form.Label>Categoría: </Form.Label>
              <Form.Select
                 style={{ marginBottom: '1rem' }}
                 type="text"
                 value={category}
                 onChange={(e) => setCategory(e.target.value)}
              >
                <option value={'Sneakers'}>Sneakers</option>
                <option value={'Poleras&Casacas'}>Ploeras y Casacas</option>
                <option value={'Polos'}>Polos</option>
                <option value={'Shorts'}>Shorts</option>
                <option value={'Pants&Joggers'}>Pants y Joggers</option>
                <option value={'Accesorios'}>Accesorios</option>

              </Form.Select>
            </Form.Group>

            <Form.Group controlId="sex">
              <Form.Label>Género: </Form.Label>
              <Form.Select
                 style={{ marginBottom: '1rem' }}
                 type="text"
                 value={gender}
                 onChange={(e) => setGender(e.target.value)}
              >
                <option value={'Hombre'}>Hombre</option>
                <option value={'Mujer'}>Mujer</option>
                <option value={'Unisex'}>Unisex</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Descripción: </Form.Label>
              <Form.Control
                as='textarea'
                style={{ marginBottom: '1rem' }}
                type="text"
                placeholder="Ingrese una descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Aceptar
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
