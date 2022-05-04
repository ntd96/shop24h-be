// Import express
const express = require('express');
// Tạo router
const router = express.Router();

// Import Middleware Customer
const { PrintCustomerMiddleware } = require('../middleware/CustomerMiddleware');
// Import Controller Customer
const {getAllCustomer, createCustomer, getCustomerById, updateCustomer, deleteCustomer} = require('../controllers/CustomerController');

// GET ALL CUSTOMER
router.get('/customers', PrintCustomerMiddleware, getAllCustomer );
// CREATE CUSTOMER
router.post('/customer', PrintCustomerMiddleware, createCustomer );
// GET CUSTOMER BY ID
router.get('/customer/:customerId', PrintCustomerMiddleware, getCustomerById );
// UPDATE CUSTOMER BY ID
router.put('/customer/:customerId', PrintCustomerMiddleware, updateCustomer );
// DELETE CUSTOMER BY ID
router.delete('/customer/:customerId', PrintCustomerMiddleware, deleteCustomer);


// exporst Router
module.exports = router