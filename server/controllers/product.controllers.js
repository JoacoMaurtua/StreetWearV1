const Product = require('../models/product.models');

const asyncHandler = require('express-async-handler');

//DEVOLVER TODA LA LISTA DE PRODUCTOS
const findProduct = asyncHandler(async (req, res) => {
  //funcionalidad para la paginacion tomando en cuenta el backend
  const pageSize = 8; //numero de productos maximo por pagina
  const page = Number(req.query.pageNumber) || 1;

  console.log(req.query.keyword);
  console.log(req.query.keyword2);

  const keyword = req.query.keyword
    ? {
        $or: [
          //filtra los productos que cumplan con alguna de las condiciones del array
          {
            name: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
          {
            brand: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
          {
            category: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
          {
            subcategory: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
          {
            gender: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          },
        ],
      }
    : {};

  const keyword2 = req.query.keyword2
    ? {
        $or: [
          {
            name: {
              $regex: req.query.keyword2,
              $options: 'i',
            },
          },
          {
            brand: {
              $regex: req.query.keyword2,
              $options: 'i',
            },
          },
          {
            category: {
              $regex: req.query.keyword2,
              $options: 'i',
            },
          },
          {
            subcategory: {
              $regex: req.query.keyword2,
              $options: 'i',
            },
          },
          {
            gender: {
              $regex: req.query.keyword2,
              $options: 'i',
            },
          },
        ],
      }
    : {};


  const count = await Product.countDocuments({ $and: [keyword, keyword2] });
  const products = await Product.find({ $and: [keyword, keyword2] })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) }); //creo que no hay problema con la paginacion aqui
});

//DEVOLVER UN SOLO PRODUCTO
const findSingleProduct = (req, res) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => res.json(product))
    .catch((error) => {
      res.json({ error: error, message: 'Productos no encontrados' });
      res.sendStatus(404);
    });
};

//IMPORTANTE PARA LA SIGUIENTE ESCALA:
/* 
  Por ahora cualquier admin puede editar y eliminar todos los productos
  esto debe modificarse para que solo unos puedan editar o eliminar los
  productos que ellos postean
*/
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//Crear un producto -ADMIN-
const createProduct = asyncHandler(async (req, res) => {
  //(CAMBIAR ESTE CONTROLLER)
  //Prueba
  const product = new Product({
    //reeemplaza por el de CD
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    gender: 'Hombre',
    category: 'Sneakers',
    subcategory: 'Ninguna',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//VERISON ALTERNATIVA:
/* const createProduct = async(req,res) =>{
Product.create(req.body)
    .then(results => res.json({data:results}))
    .catch(error=>{
      res.json({error:error, message:'Could not create a task'})
      res.sendStatus(500);
    })
}; */

//Actualizar un producto -ADMIN-
const updateProduct = asyncHandler(async (req, res) => {
  //(MEJORAR ESTE CONTROLLER)
  const {
    name,
    price,
    description,
    image,
    brand,
    gender,
    category,
    subcategory,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.gender = gender;
    product.category = category;
    product.subcategory = subcategory;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//CREAR UN NUEVO REVIEW
const createReview = asyncHandler(async (req, res) => {
  //(MEJORAR ESTE CONTROLLER)
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }
    //cuerpo del review
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length; //reviews es un array

    //sobre las estrellas(operacion)
    /* rating = 
    reviews = [jhon.dhara,ben,brand,tom]

    jhnon --> 4 estrellas

    dhara --> 3 estrellas

    ben --> 4 estrellas

    brand --> 3 estrellas

    tom --> 5 estrellas

    suma = 19 estrellas/5 comentarios

    rating --> 3.8 estrellas */
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added!' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//DEVOLVER LOS PRODUCTOS MAS RANKEADOS PARA EL CARRUSEL
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3); //-1 indica un orden decendente
  res.json(products);
});

module.exports = {
  findProduct,
  findSingleProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createReview,
  getTopProducts,
};
