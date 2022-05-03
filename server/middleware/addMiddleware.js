const jwt = require('jsonwebtoken');

const User = require('../models/user.models');

const asyncHandler = require('express-async-handler');

//MIDDLEWARE PARA VALIDAR EL TOKEN

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization 
  ) {
    try {
      token = req.headers.authorization

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) { //AQUI CAE EL ERROR
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})



module.exports = {protect};