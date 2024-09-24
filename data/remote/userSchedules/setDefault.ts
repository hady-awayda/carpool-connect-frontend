import { apiRequest } from "../apiHandler";

export const setDefaultSchedule = async (scheduleId: number) => {
  const response = await apiRequest(
    `user-schedules/set-default/${scheduleId}`,
    "PATCH"
  );
  if (response.error) {
    throw new Error(response.error);
  }
  return response;
};
