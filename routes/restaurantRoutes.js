const express = require('express');
const { addRestaurant, getRestaurants } = require('../controllers/restaurantController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware'); // Ensure this import is correct
const router = express.Router();

// Add a restaurant (Admin only)
router.post('/', authMiddleware, roleMiddleware('admin'), addRestaurant);

// Get all restaurants
router.get('/', getRestaurants);

module.exports = router;
