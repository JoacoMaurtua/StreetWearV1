const mongoose = require('mongoose');

const DB = process.env.MONGODB;

const connectDB = async() =>{
  try{
    await mongoose.connect(DB,{
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log(`2: Se establecio la coneccion con MongoDB`)
  }
  catch(error){
      console.error(`Error: ${error.message}`)
      process.exit(1)
  }
}

module.exports = connectDB;