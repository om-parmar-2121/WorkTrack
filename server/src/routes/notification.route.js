import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { getMyNotifications } from '../controller/notification.controller.js';

const router = express.Router();

router.get('/', isAuthenticated, getMyNotifications);

export default router;