// import exporess
const express = require('express');
// Tạo router
const router = express.Router();

// Import Order Middleware
const {printOrderMiddleware} = require('../middleware/OrderMiddleware');
// Import Order Controller
const {getAllOrder, createOrderOfCustomer, getAllOrderOfCustomer, getOrderById, deleteOrderById} = require('../controllers/OrderController')

// GET ALL ORDER
router.get('/orders', printOrderMiddleware, getAllOrder)
// CREATE ORDER OF CUSTOMER
router.post('/customer/:customerId/order', printOrderMiddleware, createOrderOfCustomer)
// GET ALL ORDER OF CUSTOMER
router.get('/customer/:customerId/order', printOrderMiddleware, getAllOrderOfCustomer)
// UPDATE ORDER BY ID
router.get('/order/:orderId', printOrderMiddleware, getOrderById)
// DELETE ORDER BY ID 
router.delete('/customer/:customerId/order/:orderId', printOrderMiddleware, deleteOrderById)

module.exports = router