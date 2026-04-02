import api from "../utils/api";

export const submitLeaveRequest = ({ startDate, endDate, reason }) => {
  return api.post("/leave", {
    startDate,
    endDate,
    reason,
  });
};

export const getMyLeaveRequests = async () => {
  const response = await api.get("/leave/myLeave");
  return response?.leaveRequests || [];
};

export const getPendingLeaveRequests = async () => {
  const response = await api.get("/leave/pending");
  return response?.leaves || [];
};

export const approveLeaveRequest = (leaveId) => {
  return api.patch(`/leave/${leaveId}/approve`);
};

export const rejectLeaveRequest = (leaveId) => {
  return api.patch(`/leave/${leaveId}/reject`);
};
