const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const authMiddleware = require('../middleware/auth');

// Get cart items for user
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.userId;

  try {
    const cartItems = await Cart.find({ user: userId }).populate('product');
    res.json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch cart items' });
  }
});

// Update quantity of a cart item (expects cartItemId & quantity in body)
router.put('/update', authMiddleware, async (req, res) => {
  const { quantity, cartItemId } = req.body;

  try {
    const cartItem = await Cart.findById(cartItemId);
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

    // Optional: verify ownership here

    cartItem.quantity = quantity;
    await cartItem.save();
    res.json({ message: 'Quantity updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update quantity' });
  }
});

// Add new item to cart
router.post('/', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: 'Product ID and quantity are required' });
  }

  try {
    const cartItem = new Cart({ user: userId, product: productId, quantity });
    await cartItem.save();
    res.status(201).json({ message: 'Item added to cart', cartItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add item to cart' });
  }
});

// Delete a cart item by cart item ID
router.delete('/:id', authMiddleware, async (req, res) => {
  const cartItemId = req.params.id;

  try {
    const cartItem = await Cart.findById(cartItemId);
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

    // Optional: verify ownership here

    await cartItem.deleteOne();
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to remove item' });
  }
});

// Clear the entire cart for the user
router.delete('/', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  try {
    await Cart.deleteMany({ user: userId });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to clear cart' });
  }
});

module.exports = router;
