const mongoose = require('mongoose');

//Esta es una entidad debil
const reviewSchema = new mongoose.Schema(
{
  name: {type: String, required: true},
  rating: {type: Number, required: true},
  comment: {type: String, required: true},
  user:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  }
}, {timestamps:true});

const productSchema = new mongoose.Schema({

  //Relacion/anidamiento con esquema User
  user:{
    //_id --> mongoose
    type: mongoose.Schema.Types.ObjectId,
    required: [true,'Este campo es obligatorio'],
    ref: 'User'
  },

  name:{
    type: String,
    required: [true,'Este campo es obligatorio']
  },

  image:{
    type: String,
    required: [true,'Este campo es obligatorio']
  },

  gender:{
    type: String,
    required: [true,'Este campo es obligatorio']
  },

  /* size:{
    type: Array, 
    required: false
  },  */

  brand:{
    type: String,
    required: [true,'Este campo es obligatorio']
  },

  category:{
    type: String,
    required: [true,'Este campo es obligatorio']
  },

  /* color:{
    type: String, required: false
  }, */

  description:{
    type: String,
    required: [true,'Este campo es obligatorio']
  },

  rating:{
    type: Number,
    required: [true,'Este campo es obligatorio'],
    default: 0
  },

  reviews: [reviewSchema],

  numReviews:{
    type:Number,
    required:true,
    default:0,
  },

  price:{
    type: Number,
    required: [true,'Este campo es obligatorio'],
    default: 0
  },

  countInStock:{
    type: Number,
    required: [true,'Este campo es obligatorio'],
    default: 0
  },


},{timestamps:true});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;