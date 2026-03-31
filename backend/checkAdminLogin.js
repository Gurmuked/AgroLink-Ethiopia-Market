import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/connectDB.js';
import User from './models/Users.js';
import bcrypt from 'bcryptjs';

const run = async () => {
  await connectDB();
  const user = await User.findOne({ username: 'admin' });
  console.log('Found user:', !!user, user?._id);
  if (!user) return process.exit(1);
  const match = await bcrypt.compare('Admin123!', user.password);
  console.log('Password matches:', match);
  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });
