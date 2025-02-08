const Cart = require('../models/Cart');
const MenuItem = require('../models/MenuItem');

// Get Cart for a User
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.menuItem');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add Item to Cart
exports.addToCart = async (req, res) => {
  const { menuItemId, quantity } = req.body;
  try {
    // Check if menu item exists
    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });

    // Find the user's cart or create one if not exists
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: [{ menuItem: menuItemId, quantity }]
      });
      await cart.save();
    } else {
      // Check if the item already exists in the cart, if so, update the quantity
      const itemIndex = cart.items.findIndex(item => item.menuItem.toString() === menuItemId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity; // Increment quantity
      } else {
        cart.items.push({ menuItem: menuItemId, quantity });
      }
      await cart.save();
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove Item from Cart
exports.removeFromCart = async (req, res) => {
  const { menuItemId } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // Remove item from the cart
    cart.items = cart.items.filter(item => item.menuItem.toString() !== menuItemId);
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
