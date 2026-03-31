import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/connectDB.js';
import Product from './models/Product.js';
import registerRoute from './routes/createUser.js';
import usersRoute from './routes/getUsers.js';
import loginRoute from './routes/login.js';
import productsRoute from './routes/products.js';
import protect from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

// mount routes under /api
// Mount user related routes under /api/users
app.use('/api/users', registerRoute);
app.use('/api/users', loginRoute);
app.use('/api/users', usersRoute);
app.use('/api/products', productsRoute);

// Also expose a directly mounted protected endpoint for the current user
app.get('/api/users/me', protect, (req, res) => {
  try {
    if (!req.user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(req.user);
  } catch (err) {
    console.error('Error in /api/users/me:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Verification submission endpoint
app.post('/api/verification/submit', protect, async (req, res) => {
  try {
    if (!req.user) return res.status(404).json({ message: 'User not found' });
    
    // In a real app, you'd save the verification data to a Verification model
    // For now, we'll just update the user's verification status to pending
    const User = (await import('./models/Users.js')).default;
    await User.findByIdAndUpdate(req.user._id, { 
      is_verified: false, // Keep as false until admin approves
      verification_status: 'pending' // Add this field to track status
    });
    
    return res.status(200).json({ message: 'Verification submitted successfully' });
  } catch (err) {
    console.error('Error in /api/verification/submit:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Admin endpoint to approve verification
app.post('/api/admin/verify-user/:userId', protect, async (req, res) => {
  try {
    // Check if user is admin (you'd implement proper admin check)
    if (req.user.user_type !== 'Admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const User = (await import('./models/Users.js')).default;
    const user = await User.findByIdAndUpdate(req.params.userId, { 
      is_verified: true,
      verification_status: 'approved'
    }, { new: true });
    
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    return res.status(200).json({ message: 'User verified successfully', user });
  } catch (err) {
    console.error('Error in /api/admin/verify-user:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Admin endpoint to reject verification
app.post('/api/admin/reject-user/:userId', protect, async (req, res) => {
  try {
    if (req.user.user_type !== 'Admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const User = (await import('./models/Users.js')).default;
    const user = await User.findByIdAndUpdate(req.params.userId, {
      is_verified: false,
      verification_status: 'rejected'
    }, { new: true });

    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.status(200).json({ message: 'User rejected', user });
  } catch (err) {
    console.error('Error in /api/admin/reject-user:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

// start server after DB connects
const start = async () => {
  try {
    await connectDB();
    // Seed sample products in development if none exist
    try {
      const count = await Product.countDocuments();
      if (count === 0) {
        console.log('Seeding sample products...');
        await Product.create([
          { name: 'Fresh Fruit Basket', seller: 'Organic Farm Direct', price: 29.99, image: '/fruit.jpg', description: 'Seasonal fresh fruit.' },
          { name: 'Handwoven Textiles', seller: 'Local Artisans', price: 65, image: '/textiles.jpg', description: 'Handwoven traditional patterns.' },
          { name: 'Pure Honey Collection', seller: 'Beekeepers Association', price: 38.5, image: '/honey.jpg', description: 'Raw, pure honey.' },
        ]);
      }
    } catch (seedErr) {
      console.warn('Seeding products failed', seedErr);
    }
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

start();
