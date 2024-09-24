import { apiRequest } from "../apiHandler";

export const findSchedules = async () => {
  const response = await apiRequest(`/find-schedules`, "GET");
  if (response.error) {
    throw new Error(response.error);
  }
  return response;
};
