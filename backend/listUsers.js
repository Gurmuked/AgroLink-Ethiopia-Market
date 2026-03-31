import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/connectDB.js';
import User from './models/Users.js';

const run = async () => {
  await connectDB();
  const users = await User.find().lean();
  console.log('Users:', users);
  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });
