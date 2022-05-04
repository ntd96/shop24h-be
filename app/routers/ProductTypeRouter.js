
// Import express
const express = require('express');
// Khai báo Router
const router = express.Router();

// Import Middleware Product
const {printUrlProductTypeMiddleware} = require('../middleware/ProductTypeMiddlware')
// Import Controller Product
const {getAllProductType, createProductType, getProductTypeByID, updateProductType, deleteProductType} = require('../controllers/ProductTypeController')


// Khai báo URL Product Type API
// Get All  Product
router.get('/producttype', printUrlProductTypeMiddleware, getAllProductType)
// Create product
router.post('/producttype', printUrlProductTypeMiddleware, createProductType)
// Get product By Id
router.get('/producttype/:producttypeId', printUrlProductTypeMiddleware, getProductTypeByID)
// Update product
router.put('/producttype/:producttypeId', printUrlProductTypeMiddleware, updateProductType)
// Delete product
router.delete('/producttype/:producttypeId', printUrlProductTypeMiddleware, deleteProductType)


module.exports = router 