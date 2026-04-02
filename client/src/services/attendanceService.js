import api from "../utils/api";

export const getTodayAttendanceStatus = async () => {
  const response = await api.get("/attendance/today");
  return response?.byEmployeeId || {};
};

export const markAttendance = ({ employeeId, status, date }) => {
  return api.post("/attendance/mark", {
    employeeId,
    status,
    date,
  });
};
