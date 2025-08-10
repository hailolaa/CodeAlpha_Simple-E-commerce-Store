const express = require('express');
const Order = require('../models/Order');
const router = express.Router();
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth');

// POST /api/orders
router.post('/', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const { items, total } = req.body;

  try {
    // ✅ ADD THIS check
    if (!Array.isArray(items)) {
      return res.status(400).json({ message: 'Invalid items format' });
    }

    const order = new Order({ userId, items, total });
    await order.save();
    res.status(201).json({ message: 'Order placed', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error placing order' });
  }
});



// GET /api/orders/mine

router.get('/mine', authMiddleware, async (req, res) => {
  const userId = req.user.userId;

  try {
    const orders = await Order.find({ userId }).populate('items.productId');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get orders' });
  }
});


module.exports = router;
