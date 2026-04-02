import Employee from "../models/employee.model.js";
import Attendance from "../models/attendance.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";

const formatLocalDateKey = (dateValue) => {
	const date = new Date(dateValue);
	const year = date.getFullYear();
	const month = `${date.getMonth() + 1}`.padStart(2, "0");
	const day = `${date.getDate()}`.padStart(2, "0");

	return `${year}-${month}-${day}`;
};

const getStartOfDay = (dateValue = new Date()) => {
	const date = new Date(dateValue);
	date.setHours(0, 0, 0, 0);
	return date;
};

const clearBeforeToday = async () => {
	const todayStart = getStartOfDay();
	await Attendance.deleteMany({ date: { $lt: todayStart } });
};

export const markAttendance = asyncHandler(async (req, res, next) => {
	const { employeeId, date, status } = req.body;

	if (!employeeId) return next(new errorHandler("employeeId is required", 400));

	if (![1, 0].includes(status) && !["Present", "Absent"].includes(status)) {
		return next(new errorHandler("Status must be 1 (Present) or 0 (Absent)", 400));
	}

	await clearBeforeToday();

	const employee = await Employee.findOne({ employeeId: employeeId.trim() });

	if (!employee) return next(new errorHandler("Employee not found", 404));

	const attendanceDate = date ? getStartOfDay(date) : getStartOfDay();
	const todayStart = getStartOfDay();

	if (Number.isNaN(attendanceDate.getTime())) {
		return next(new errorHandler("Invalid attendance date", 400));
	}

	if (attendanceDate.getTime() !== todayStart.getTime()) {
		return next(new errorHandler("Attendance can only be marked for today", 400));
	}

	const normalizedStatus = status === "Present" || status === 1 ? "Present" : "Absent";

	const attendance = await Attendance.findOneAndUpdate(
		{
		employeeId: employee._id,
			date: todayStart,
		},
		{
			employeeId: employee._id,
			date: todayStart,
			status: normalizedStatus,
			markedBy: req.user._id,
		},
		{ new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
	);

	res.status(200).json({
		success: true,
		message: "Attendance marked successfully",
		attendance: {
			employeeId: employee.employeeId,
			date: formatLocalDateKey(attendance.date),
			status: attendance.status,
		},
	});
});

export const getTodayAttendanceStatus = asyncHandler(async (req, res) => {
	await clearBeforeToday();
	const todayStart = getStartOfDay();

	const records = await Attendance.find({ date: todayStart }).populate(
		"employeeId",
		"employeeId fullName",
	);

	const byEmployeeId = {};
	records.forEach((record) => {
		if (record.employeeId?.employeeId) {
			byEmployeeId[record.employeeId.employeeId] = record.status;
		}
	});

	res.status(200).json({
		success: true,
		date: formatLocalDateKey(todayStart),
		records,
		byEmployeeId,
	});
});

export const getMonthlyAttendanceCalendar = asyncHandler(async (req, res, next) => {
	const employeeIdentifier = req.params.employeeId || req.query.employeeId;
	const month = req.query.month;

	if (!employeeIdentifier) {
		return next(new errorHandler("employeeId is required", 400));
	}

	if (!month || !/^\d{4}-\d{2}$/.test(month)) {
		return next(new errorHandler("month must be in YYYY-MM format", 400));
	}

	const employee = await Employee.findOne({ employeeId: employeeIdentifier.trim() });

	if (!employee) {
		return next(new errorHandler("Employee not found", 404));
	}

	const [year, monthNumber] = month.split("-").map(Number);
	const monthIndex = monthNumber - 1;
	const monthStart = new Date(year, monthIndex, 1);
	const monthEnd = new Date(year, monthIndex + 1, 1);

	const monthlyRecords = await Attendance.find({
		employeeId: employee._id,
		date: { $gte: monthStart, $lt: monthEnd },
	});

	const attendanceMap = new Map(
		monthlyRecords.map((record) => [new Date(record.date).getDate(), record.status]),
	);

	const totalDays = new Date(year, monthIndex + 1, 0).getDate();
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const days = [];

	for (let dayNumber = 1; dayNumber <= totalDays; dayNumber += 1) {
		const currentDate = new Date(year, monthIndex, dayNumber);
		currentDate.setHours(0, 0, 0, 0);
		const dateKey = formatLocalDateKey(currentDate);
		const dayOfWeek = currentDate.getDay();
		const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

		let status = null;
		const attendanceValue = attendanceMap.get(dayNumber);

		if (attendanceValue !== undefined) {
			status = attendanceValue;
		} else {
			if (currentDate > today) {
				status = "Future";
			} else if (isWeekend) {
				status = "Weekend";
			} else {
				status = "NotMarked";
			}
		}

		days.push({
			date: dateKey,
			day: dayNumber,
			weekDay: dayOfWeek,
			status,
		});
	}

	const summary = days.reduce(
		(acc, day) => {
			if (day.status === "Present") acc.present += 1;
			if (day.status === "Absent") acc.absent += 1;
			if (day.status === "Weekend") acc.weekend += 1;
			if (day.status === "NotMarked") acc.notMarked += 1;
			if (day.status === "Future") acc.future += 1;
			return acc;
		},
		{ present: 0, absent: 0, weekend: 0, notMarked: 0, future: 0 },
	);

	res.status(200).json({
		success: true,
		employee: {
			_id: employee._id,
			employeeId: employee.employeeId,
			fullName: employee.fullName,
		},
		month,
		days,
		summary,
	});
});

// Auto cleanup: Clear and archive attendance data for months older than 1 year
export const cleanupOldAttendance = asyncHandler(async (req, res, next) => {
	const todayStart = getStartOfDay();
	const result = await Attendance.deleteMany({ date: { $lt: todayStart } });

	res.status(200).json({
		success: true,
		message: "Previous day attendance cleared",
		deletedCount: result.deletedCount,
	});
});

export const finalizeMonth = asyncHandler(async (req, res, next) => {
	res.status(200).json({
		success: true,
		message: "Finalize is not required for day-wise attendance",
	});
});