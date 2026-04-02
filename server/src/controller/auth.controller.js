import env from "../config/env.js";
import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import Employee from "../models/employee.model.js";
import Notification from "../models/notification.model.js";
import generateToken from "../utilities/generateToken.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";

export const register = asyncHandler(async (req, res, next) => {
  const {role, fullName, email, password, phone, gender, birthdate, position, department, workplace, address} = req.body;

  if (!role || !fullName || !email || !password || !phone || !gender || !birthdate || !position || !department || !workplace || !address )
    return next(new errorHandler("All fields are required", 400));

  const user = await User.findOne({email})
  if(user) return next(new errorHandler("User already exist", 400));

  const hashedPassword = await bcrypt.hash(password,10);//10 rounds of hashing

  const status = role === 'HR' ? 'active' : 'pending';
  const approvedAt = role === 'HR' ? new Date() : null;
  
  const newUser = await User.create({
    email, passwordHash: hashedPassword, role, status, approvedAt
  });

  const employeeId = `EMP${Date.now().toString().slice(-8)}`;

  const currentDate = new Date(Date.now()).toISOString().split('T')[0];
  const newEmployee = await Employee.create({
    fullName, phone, gender, birthdate, position, department, workplace, address, 
    userId: newUser._id, employeeId, dateOfJoining: currentDate
  });

  if (role !== 'HR') {
    const hrUsers = await User.find({ role: 'HR', status: 'active' }).select('_id');

    if (hrUsers.length) {
      await Notification.insertMany(
        hrUsers.map((hrUser) => ({
          userId: hrUser._id,
          employeeId: newEmployee._id,
          type: 'profile',
          message: `${fullName} submitted a new employee registration request.`,
        })),
      );
    }
  }

  const token = generateToken(newUser._id, newUser.role)

  res
    .status(201)
    .cookie("token", token,{ // Sending the token to decode
        httpOnly: true, // The cookie cannot be accessed from JavaScript (document.cookie).Protects against XSS (Cross-Site Scripting) attacks. Always true for auth cookies like JWTs.
        secure: false,
        sameSite: "lax", // Controls when the cookie is sent in cross-site requests.
        expires: new Date(Date.now() + env.COOKIE_EXPIRES * 60 * 60 * 24 * 1000),
    })
    .json({
        success: true,
        message: "User created successfully",
        responseData:{
            newUser, 
            token
        }
    });
});

export const login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body

    const user = await User.findOne({
      email: email
    })

    if(!user) return next(new errorHandler("please enter valid username or password", 400));

    if(user.status !== 'active') return next(new errorHandler("Your account is pending approval", 403));

    const isValidPassword = await bcrypt.compare(password, user.passwordHash)
    if(!isValidPassword) return next(new errorHandler("please enter valid username or password", 400));

    const token = generateToken(user._id, user.role)

    const employee = await Employee.findOne({ userId: user._id }).select("fullName");

  res.status(200)
    .cookie("token", token,{
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        expires: new Date(Date.now() + env.COOKIE_EXPIRES * 60 * 60 * 24 * 1000),
    })
    .json({
        success: true,
        message: "User logged in successfully",
        responseData:{
            user, 
            employee,
            token
        }
    });
});

export const approveUser = asyncHandler(async (req, res, next) => {
  const approverUserId = req.user?.id;

  if (!approverUserId) {
    return next(new errorHandler("Unauthorized request", 401));
  }

  const approver = await User.findById(approverUserId);

  if (!approver) {
    return next(new errorHandler("Approver not found", 404));
  }

  if (approver.role !== 'HR') {
    return next(new errorHandler("Only HR can approve users", 403));
  }

  const userId = req.params.userId || req.body.userId;

  if (!userId) {
    return next(new errorHandler("userId is required", 400));
  }

  const user = await User.findById(userId)

  if(!user) return next(new errorHandler("User not found", 404))

  // It should redirect to login page if status is active....
  if(user.status === 'active') return next(new errorHandler("User is already approved", 400))
  
  user.status = 'active'
  user.approvedAt = new Date()
  await user.save()

  const employee = await Employee.findOne({ userId: user._id });
  if (employee) {
    await Notification.create({
      userId: user._id,
      employeeId: employee._id,
      type: "approval",
      message: "Your account has been approved.",
    });
  }

  res.status(200).json({
    success: true,
    message: "User approved successfully",
    responseData: { user }
  });
});

export const logout = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "",{
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    .json({
        success: true,
        message: "logout successful!"
    })
});