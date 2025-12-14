const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');
const { protect } = require('../middleware/auth');
const { apiLimiter, createLimiter } = require('../middleware/rateLimiter');

router.route('/')
  .get(protect, apiLimiter, getCart)
  .post(protect, createLimiter, addToCart)
  .delete(protect, apiLimiter, clearCart);

router.route('/:itemId')
  .put(protect, createLimiter, updateCartItem)
  .delete(protect, apiLimiter, removeFromCart);

module.exports = router;
