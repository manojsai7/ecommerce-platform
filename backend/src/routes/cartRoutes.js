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
const { createLimiter } = require('../middleware/rateLimiter');

router.route('/')
  .get(protect, getCart)
  .post(protect, createLimiter, addToCart)
  .delete(protect, clearCart);

router.route('/:itemId')
  .put(protect, createLimiter, updateCartItem)
  .delete(protect, removeFromCart);

module.exports = router;
