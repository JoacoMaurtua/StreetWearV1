const express = require('express');
const router = express();
const { protect,admin } = require('../config/authMiddleware.config');
const {
  addOrderItems,
  getSingleOrder,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} = require('../controllers/order.controllers');

//Rutas:
router.get('/order/allorders',protect,admin,getOrders)

router.get('/order/myorders', protect, getMyOrders); //devolver las ordenes del usuario logueado

router.post('/order', protect, addOrderItems); //crear una orden nueva

router.get('/order/:id', protect, getSingleOrder); //devolver una orden ya creada

router.put('/order/:id/pay', protect, updateOrderToPaid); //actualizar estado de pago de una orden

router.put('/order/:id/deliver', protect,admin, updateOrderToDelivered); //actualizar etsado de entrega de una orden


module.exports = router;
