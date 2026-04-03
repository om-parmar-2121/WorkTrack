import Notification from "../models/notification.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";

export const getMyNotifications = asyncHandler(async (req, res, next) => {
  const notifications = await Notification.find({ userId: req.user._id })
    .populate('employeeId', 'fullName')
    .sort({ createdAt: -1 })
    .limit(5);

  res.status(200).json({
    success: true,
    notifications: notifications || [],
  });
});