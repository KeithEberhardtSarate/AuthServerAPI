import express from 'express';
import { createNewUser } from '../controllers/userController.js';
import validateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', validateToken, createNewUser);

export default router;