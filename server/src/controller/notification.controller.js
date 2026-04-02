import Notification from "../models/notification.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";

export const getMyNotifications = asyncHandler(async (req, res, next) => {
  const notifications = await Notification.find({ userId: req.user._id })
    .populate('employeeId', 'fullName')
    .sort({ createdAt: -1 })
    .limit(5);

  if (!notifications || notifications.length === 0)
    return next(new errorHandler("No notifications found", 404));

  res.status(200).json({
    success: true,
    notifications,
  });
});