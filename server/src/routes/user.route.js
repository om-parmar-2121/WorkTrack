import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { approveUser, login, logout, register } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', isAuthenticated, logout);
router.patch('/approve/:userId', isAuthenticated, approveUser);

export default router;