const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticate, authorize } = require('../middleware/auth');
const { createLimiter, apiLimiter } = require('../middleware/rateLimiter');

router.post('/', apiLimiter, authenticate, createLimiter, orderController.createOrder);
router.get('/', apiLimiter, authenticate, orderController.getOrders);
router.get('/:id', apiLimiter, authenticate, orderController.getOrderById);
router.put('/:id', apiLimiter, authenticate, authorize('admin'), orderController.updateOrderStatus);

module.exports = router;
