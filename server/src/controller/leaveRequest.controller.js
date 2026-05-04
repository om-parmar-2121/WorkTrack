import Employee from "../models/employee.model.js";
import Notification from "../models/notification.model.js";
import Leave from "../models/leaveRequest.model.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";

const DAY_MS = 24 * 60 * 60 * 1000;

const parseIsoDateOnly = (value) => {
  if (typeof value !== "string") return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;

  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
};

const startOfTodayUtc = () => {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
};

export const createLeaveRequest = asyncHandler(async (req, res, next) => {
  const { startDate, endDate, reason } = req.body;

  if (!startDate || !endDate || !reason)
    return next(new errorHandler("All fields are required", 400));

  const parsedStartDate = parseIsoDateOnly(startDate);
  const parsedEndDate = parseIsoDateOnly(endDate);

  if (!parsedStartDate || !parsedEndDate) {
    return next(new errorHandler("Dates must be valid and use YYYY-MM-DD format", 400));
  }

  const todayUtc = startOfTodayUtc();
  const maxFutureDate = new Date(todayUtc.getTime() + 365 * DAY_MS);

  if (parsedStartDate < todayUtc) {
    return next(new errorHandler("Start date cannot be in the past", 400));
  }

  const employee = await Employee.findOne({ userId: req.user._id });
  if (!employee) return next(new errorHandler("Employee record not found", 404));

  if (parsedEndDate < parsedStartDate)
    return next(new errorHandler("End date must be after start date", 400));

  if (parsedStartDate > maxFutureDate || parsedEndDate > maxFutureDate) {
    return next(new errorHandler("Leave dates must be within one year from today", 400));
  }

  const leaveDurationDays = Math.floor((parsedEndDate - parsedStartDate) / DAY_MS) + 1;

  if (leaveDurationDays > 60) {
    return next(new errorHandler("Leave duration cannot exceed 60 days", 400));
  }

  if (String(reason).trim().length < 5) {
    return next(new errorHandler("Reason must be at least 5 characters long", 400));
  }

  const leaveRequest = await Leave.create({
    employeeId: employee._id,
    startDate: parsedStartDate,
    endDate: parsedEndDate,
    reason: reason.trim(),
    status: "pending"
  });

  await Notification.create({
    userId: req.user._id,
    employeeId: employee._id,
    type: "leave",
    message: `New leave request submitted from ${employee.fullName}`
  });

  const hrUsers = await User.find({ role: "HR", status: "active" }).select("_id");
  if (hrUsers.length) {
    await Notification.insertMany(
      hrUsers.map((hrUser) => ({
        userId: hrUser._id,
        employeeId: employee._id,
        type: "leave",
        message: `${employee.fullName} submitted a leave request.`,
      })),
    );
  }

  res.status(201).json({
    success: true,
    message: "Leave request submitted successfully",
    leaveRequest
  });
});

export const getPendingLeave = asyncHandler(async (req, res, next) => {
  const leaves = await Leave.find({ status: "pending" })
    .populate({
        path: 'employeeId',
        select: 'fullName userId',
        populate: { path: 'userId', select: 'email' }
    })

  if (!leaves || leaves.length === 0)
    return next(new errorHandler("No pending leave requests found", 404));

  res.status(200).json({
    success: true,
    leaves,
  });
});

export const getMyLeaveRequests = asyncHandler(async (req, res, next) => {
  const employee = await Employee.findOne({ userId: req.user._id });
  if (!employee) return next(new errorHandler("Employee record not found", 404));

  const leaveRequests = await Leave.find({ employeeId: employee._id })

  if (!leaveRequests || leaveRequests.length === 0)
    return next(new errorHandler("No leave requests found", 404));

  res.status(200).json({
    success: true,
    leaveRequests,
  });
});

export const approveLeaveRequest = asyncHandler(async (req, res, next) => {
  const { leaveId } = req.params;

  const leaveRequest = await Leave.findById(leaveId);
  if (!leaveRequest) return next(new errorHandler("Leave request not found", 404));

  if (leaveRequest.status !== "pending")
    return next(new errorHandler("Only pending requests can be approved", 400));

  const approvedLeave = await Leave.findByIdAndUpdate(
    leaveId,
    {
      status: "approved",
      approverId: req.user._id
    },
    { new: true, runValidators: true }
  ).populate('employeeId', 'fullName userId');

  await Notification.create({
    userId: approvedLeave.employeeId.userId,
    employeeId: approvedLeave.employeeId._id,
    type: "leave",
    message: "Your leave request has been approved."
  });

  res.status(200).json({
    success: true,
    message: "Leave request approved successfully",
    leave: approvedLeave
  });
});

export const rejectLeaveRequest = asyncHandler(async (req, res, next) => {
  const { leaveId } = req.params;

  const leaveRequest = await Leave.findById(leaveId);
  if (!leaveRequest) return next(new errorHandler("Leave request not found", 404));

  if (leaveRequest.status !== "pending")
    return next(new errorHandler("Only pending requests can be rejected", 400));

  const rejectedLeave = await Leave.findByIdAndUpdate(
    leaveId,
    {
      status: "rejected",
      approverId: req.user._id // Track who made the decision (approved or rejected)
    },
    { new: true, runValidators: true }
  ).populate('employeeId', 'fullName userId');

  await Notification.create({
    userId: rejectedLeave.employeeId.userId,
    employeeId: rejectedLeave.employeeId._id,
    type: "leave",
    message: "Your leave request has been rejected."
  });

  res.status(200).json({
    success: true,
    message: "Leave request rejected successfully",
    leave: rejectedLeave
  });
});
