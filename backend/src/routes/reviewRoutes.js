const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticate } = require('../middleware/auth');
const { createLimiter, apiLimiter } = require('../middleware/rateLimiter');

router.get('/products/:productId/reviews', reviewController.getProductReviews);
router.post('/products/:productId/reviews', apiLimiter, authenticate, createLimiter, reviewController.createReview);
router.put('/:id', apiLimiter, authenticate, reviewController.updateReview);
router.delete('/:id', apiLimiter, authenticate, reviewController.deleteReview);

module.exports = router;
