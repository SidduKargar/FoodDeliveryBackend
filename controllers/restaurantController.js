const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');

// Add Restaurant (Admin Only)
exports.addRestaurant = async (req, res) => {
  const { name, location } = req.body;
  try {
    const restaurant = new Restaurant({ name, location });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Restaurants
exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate('menu');
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};