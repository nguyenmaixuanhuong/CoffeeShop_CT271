const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController')

router.get('/create',OrderController.createOrder)
router.use('/listorders',OrderController.getAllOrders)
router.use('/orderdetails/:id',OrderController.getOrderDetails)
router.use('/orderdetailsapi',OrderController.getOrderDetailsAPI)
router.use('/getordersuser',OrderController.getOrderUserAPI)
router.use('/confirmorder/:id',OrderController.confirmOrder)
module.exports = router