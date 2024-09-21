import { apiRequest } from "../apiHandler";

export const fetchUserSchedules = async ({ pageParam = 0 }) => {
  const response = await apiRequest(`/user-schedules?page=${pageParam}`, "GET");
  if (response.error) {
    throw new Error(response.error);
  }
  return response;
};
