import api from "../utils/api";

export const loginUser = (credentials) => {
  return api.post("/auth/login", credentials);
};

export const registerUser = (payload) => {
  return api.post("/auth/register", payload);
};

export const logoutUser = () => {
  return api.post("/auth/logout");
};

export const approveUser = (userId) => {
  return api.patch(`/auth/approve/${userId}`);
};
