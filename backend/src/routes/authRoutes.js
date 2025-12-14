const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const { authLimiter, apiLimiter } = require('../middleware/rateLimiter');

router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
router.get('/me', apiLimiter, authenticate, authController.getProfile);
router.put('/me', apiLimiter, authenticate, authController.updateProfile);

module.exports = router;
