import express from 'express';
import Product from '../models/Product.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// GET /api/products - public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/products - protected (for sellers)
router.post('/', protect, async (req, res) => {
  try {
    const { name, price, image, description } = req.body;
    if (!name || !price) return res.status(400).json({ message: 'Name and price are required' });
    const product = new Product({
      name,
      seller: req.user?.username || 'Unknown',
      price,
      image,
      description,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
