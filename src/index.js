import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';

import User from './models/User.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL
  .replace('<password>', encodeURIComponent(process.env.DATABASE_PASSWORD))
  .replace('<database>', encodeURIComponent(process.env.DATABASE_NAME))

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

// DB Connection
mongoose
  .connect(DATABASE_URL)
  .then(async () => {
    console.log('Database connection successfully established!');

    const defaultUser = await User.findOne({ email: 'keithsarate.info@gmail.com' });

    if (!defaultUser) {
      // Creates default user
      const newUser = new User({
        name: 'Keith',
        email: 'keithsarate.info@gmail.com',
        password: 'senha123',
        applicationKey: 'TESTE'
      });

      await newUser.save();

      console.log('Default user successfully created.');
    }
    
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error.message);
  });