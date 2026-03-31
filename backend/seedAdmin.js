import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/connectDB.js';
import User from './models/Users.js';
import bcrypt from 'bcryptjs';

const seedAdmin = async () => {
  try {
    await connectDB();
    const existing = await User.findOne({ user_type: 'Admin' });
    if (existing) {
      console.log('Admin user already exists:', existing.username || existing.email);
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('Admin123!', salt);

    const admin = new User({
      username: 'admin',
      email: 'admin@local',
      password: hashed,
      user_type: 'Admin',
      is_verified: true,
      verification_status: 'approved'
    });

    await admin.save();
    console.log('Created admin user: username=admin password=Admin123!');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed', err);
    process.exit(1);
  }
};

seedAdmin();
