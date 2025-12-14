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
const { createLimiter } = require('../middleware/rateLimiter');

router.route('/')
  .post(protect, createLimiter, createOrder)
  .get(protect, admin, getOrders);

router.post('/payment-intent', protect, createLimiter, createPaymentIntent);
router.get('/myorders', protect, getMyOrders);

router.route('/:id')
  .get(protect, getOrderById);

router.put('/:id/pay', protect, createLimiter, updateOrderToPaid);
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

module.exports = router;
