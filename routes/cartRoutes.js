const express = require('express');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// Get the user's cart
router.get('/', authMiddleware, getCart);

// Add an item to the cart
router.post('/add', authMiddleware, addToCart);

// Remove an item from the cart
router.post('/remove', authMiddleware, removeFromCart);

module.exports = router;
