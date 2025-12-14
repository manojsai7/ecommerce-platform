const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');
const { apiLimiter, createLimiter } = require('../middleware/rateLimiter');

router.route('/')
  .get(apiLimiter, getProducts)
  .post(protect, admin, createLimiter, createProduct);

router.route('/:id')
  .get(apiLimiter, getProductById)
  .put(protect, admin, createLimiter, updateProduct)
  .delete(protect, admin, createLimiter, deleteProduct);

module.exports = router;
