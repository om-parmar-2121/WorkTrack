import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { getMonthlyAttendanceCalendar, markAttendance, cleanupOldAttendance, finalizeMonth, getTodayAttendanceStatus } from '../controller/attendance.controller.js';

const router = express.Router();

router.post('/mark', isAuthenticated, markAttendance);
router.get('/today', isAuthenticated, getTodayAttendanceStatus);
router.get('/month/:employeeId', isAuthenticated, getMonthlyAttendanceCalendar);
router.post('/cleanup', isAuthenticated, cleanupOldAttendance);
router.post('/finalize', isAuthenticated, finalizeMonth);

export default router;