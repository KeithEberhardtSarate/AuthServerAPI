import express from 'express';
import { login, loginBasic } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginBasic);

export default router;