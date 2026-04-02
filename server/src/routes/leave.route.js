import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { approveLeaveRequest, createLeaveRequest, getMyLeaveRequests, getPendingLeave, rejectLeaveRequest } from '../controller/leaveRequest.controller.js';
import { getMyNotifications } from '../controller/notification.controller.js';

const router = express.Router();

router.post('/', isAuthenticated, createLeaveRequest);
router.get('/pending', isAuthenticated, getPendingLeave);
router.get('/myLeave', isAuthenticated, getMyLeaveRequests);
router.patch('/:leaveId/approve', isAuthenticated, approveLeaveRequest);
router.patch('/:leaveId/reject', isAuthenticated, rejectLeaveRequest);

export default router;