const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  createPaymentIntent
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');
const { apiLimiter, createLimiter } = require('../middleware/rateLimiter');

router.route('/')
  .post(protect, createLimiter, createOrder)
  .get(protect, admin, apiLimiter, getOrders);

router.post('/payment-intent', protect, createLimiter, createPaymentIntent);
router.get('/myorders', protect, apiLimiter, getMyOrders);

router.route('/:id')
  .get(protect, apiLimiter, getOrderById);

router.put('/:id/pay', protect, createLimiter, updateOrderToPaid);
router.put('/:id/deliver', protect, admin, createLimiter, updateOrderToDelivered);

module.exports = router;
