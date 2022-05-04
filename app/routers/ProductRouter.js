
// Import Express
const express = require('express');
// Tạo router
const router = express.Router();

// Import Product Middleware
const {PrintProductMiddleware} = require('../middleware/ProductMiddleware')

// Import product controller
const {getAllProduct, createProduct, getProductById, updateProduct, deleteProduct, getProductsLimit } = require('../controllers/ProductController')

// GET ALL PRODUCT
// router.get('/product', PrintProductMiddleware, getAllProduct);
// CREATE PRODUCT
router.post('/product', PrintProductMiddleware, createProduct);
// GET PRODUCT BY ID
router.get('/products/:productId', PrintProductMiddleware, getProductById)
// UPDATE BY ID
router.put('/product/:productId', PrintProductMiddleware, updateProduct)
//  DELETE BY ID
router.delete('/product/:productId', PrintProductMiddleware, deleteProduct)
//  GET PRODUCTS LIMIT
router.get('/products', PrintProductMiddleware, getProductsLimit)

// Export Product Router
module.exports = router