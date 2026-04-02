import api from "../utils/api";

export const getMyNotifications = async () => {
  const response = await api.get("/notification");
  return response?.notifications || [];
};
