import User from "../models/user.model.js";
import Employee from "../models/employee.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";

export const getAllEmployees = asyncHandler(async (req, res, next) => {
  const employees = await Employee.find().populate('userId', 'email role status');

  if (!employees || employees.length === 0)
    return next(new errorHandler("No employees found", 404));

  res.status(200).json({
    success: true,
    employees,
  });
});

export const getMyEmployeeProfile = asyncHandler(async (req, res, next) => {
  const employee = await Employee.findOne({ userId: req.user._id }).populate(
    "userId",
    "email role status",
  );

  if (!employee) return next(new errorHandler("Employee record not found", 404));

  res.status(200).json({
    success: true,
    employee,
  });
});

export const getEmployeeById = asyncHandler(async (req, res, next) => {
  const { employeeId } = req.params;

  const employee = await Employee.findById(employeeId).populate('userId', 'email role status');

  if (!employee) return next(new errorHandler("Employee does not exist", 404));

  res.status(200).json({
    success: true,
    employee,
  });
});

export const updateEmployee = asyncHandler(async (req, res, next) => {
  const { employeeId } = req.params;

  // Check if user is HR
  if (req.user.role !== 'HR') {
    return next(new errorHandler("Only HR can update employee details", 403));
  }

  const employee = await Employee.findById(employeeId);
  if (!employee) return next(new errorHandler("Employee does not exist", 404));

  const allowedUpdates = ['position', 'department', 'workplace'];
  const updates = {};

  allowedUpdates.forEach(field => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const updatedEmployee = await Employee.findByIdAndUpdate(
    employeeId,
    updates,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    employee: updatedEmployee,
  });
});

export const deleteEmployee = asyncHandler(async (req, res, next) => {
  const { employeeId } = req.params;

  if (req.user.role !== 'HR') {
    return next(new errorHandler("Only HR can delete employees", 403));
  }

  const employee = await Employee.findById(employeeId);
  if (!employee) return next(new errorHandler("Employee does not exist", 404));

  const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

  await User.findByIdAndDelete(employee.userId);

  res.status(200).json({
    success: true,
    message: "Employee and associated user account deleted successfully",
    employee: deletedEmployee,
  });
});

export const getPendingEmployees = asyncHandler(async (req, res, next) => {
  const pendingUsers = await User.find({status: "pending"})
  const employees = await Employee.find({
    userId: { $in: pendingUsers.map(u => u._id) }
  }).populate('userId', 'email role status approvedAt');

  if (!employees || employees.length === 0)
    return next(new errorHandler("No pending employees found", 404));

  res.status(200).json({
    success: true,
    employees,
  });
});
