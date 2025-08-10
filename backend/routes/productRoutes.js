const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
);

// Get a single product by ID
router.get('/:id', async (req, res) => {  
  try {
    const product = await Product.findById(req.params.id);
    if (!product) { 
      return res.status(404).send({ message: 'Product not found' });
    }       
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  } 
}
);

// routes/cartRoutes.js
router.post('/', async (req, res) => {
  const user = req.session.user;
  if (!user) return res.status(401).send('Not logged in');

  const { productId, quantity } = req.body;

  // Save to database using your Cart model
  await Cart.create({ user: user._id, product: productId, quantity });

  res.status(200).send('Added to cart');
});


module.exports = router;