const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticate } = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimiter');

router.get('/', apiLimiter, authenticate, cartController.getCart);
router.post('/items', apiLimiter, authenticate, cartController.addToCart);
router.put('/items/:productId', apiLimiter, authenticate, cartController.updateCartItem);
router.delete('/items/:productId', apiLimiter, authenticate, cartController.removeFromCart);
router.delete('/', apiLimiter, authenticate, cartController.clearCart);

module.exports = router;
