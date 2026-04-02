import api from "../utils/api";

export const getMyEmployeeProfile = async () => {
  const response = await api.get("/employee/me");
  return response?.employee || null;
};

export const getEmployees = async () => {
  const response = await api.get("/employee");
  return response?.employees || [];
};

export const getPendingEmployees = async () => {
  const response = await api.get("/employee/pending");
  return response?.employees || [];
};

export const updateEmployee = (employeeId, payload) => {
  return api.patch(`/employee/${employeeId}`, payload);
};

export const deleteEmployee = (employeeId) => {
  return api.delete(`/employee/${employeeId}`);
};
