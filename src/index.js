import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';

import User from './models/User.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL.replace('<password>', encodeURIComponent(process.env.DATABASE_PASSWORD));

// Middlewares
app.use(express.json());

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
        nome: 'Keith',
        email: 'keithsarate.info@gmail.com',
        senha: 'senha123',
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