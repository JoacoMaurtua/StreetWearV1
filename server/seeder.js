const mongoose = require('mongoose');
require('dotenv').config();
const users = require('./data/users');
const products = require('./data/products');
const User = require('./models/user.models');
const Product = require('./models/product.models');
const Order = require('./models/order.models');
const connectDB = require('./config/mongodb.config');

connectDB();

//Con esta funcion importaremos la data artificial a la base de datos en mongoDB
const importData = async() =>{
  try{
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map(product => {
      return {...product, user: adminUser}
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();

  }catch(error){
    console.log(`${error}`);
    process.exit(1);
  }
};

//Con esta funcion destruiremos la data artificial a la base de datos en mongoDB

const destroyData = async() =>{
  try{
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!')
    process.exit();

  }catch(error){
    console.log(`${error}`);
    process.exit(1);
  }
};

//si se apreta el comando -d que se desruya la data
if(process.argv[2] === '-d'){
  destroyData()
}else{
  importData();
}