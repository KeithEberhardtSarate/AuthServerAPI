import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const { SECRET_KEY, TOKEN_EXPIRATION } = process.env;

async function authenticateUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found.');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials.');
  }

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
  return token;
}

export { authenticateUser };
