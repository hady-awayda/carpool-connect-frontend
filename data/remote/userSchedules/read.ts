import { apiRequest } from "../apiHandler";

export const fetchUserSchedules = async () => {
  const response = await apiRequest(`/user-schedules`, "GET");
  if (response.error) {
    throw new Error(response.error);
  }
  return response;
};
