const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate, authorize } = require('../middleware/auth');
const { createLimiter, apiLimiter } = require('../middleware/rateLimiter');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', apiLimiter, authenticate, authorize('admin'), createLimiter, productController.createProduct);
router.put('/:id', apiLimiter, authenticate, authorize('admin'), productController.updateProduct);
router.delete('/:id', apiLimiter, authenticate, authorize('admin'), productController.deleteProduct);

module.exports = router;
