const Order = require('../models/order.models');
const asyncHandler = require('express-async-handler');
const ObjectId = require('mongodb').ObjectId;

//CONTROLLER PARA AGREGAR UNA ORDEN
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save(); //save() guarda el documento en la base de datos

    res.status(201).json(createdOrder);
  }
});


//CONTROLLER PARA DEVOLVER UNA ORDEN
 const getSingleOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  console.log({order:order})

  if(order){
    res.json(order)
  }else{
    res.status(404)
    throw new Error('Order not found')
  }
});

//CONTROLLER PARA ACTUALIZAR EL ESTADO DE PAGO DE UNA ORDEN
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) { //esto es lo que quiero replicar de paypal
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})


//CONTROLLER PARA DEVOLVER TODAS LAS ORDENES DE UN USER

//VERSION 1
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})


//CONTROLER PARA DEVOLVER TODAS LAS ORDENES -ADMIN-
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user','id name')
  res.json(orders)
})

//CONTROLLER PARA ACTUALIZAR EL ESTADO DE ENTREGA DE UNA ORDEN
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()
   
    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
});


module.exports = { addOrderItems, getSingleOrder,updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered };



