import { apiRequest } from "../apiHandler";

export const findSchedules = async (
  depTimeFlex: number,
  destTimeFlex: number,
  depDistFlex: number,
  destDistFlex: number,
  scheduleId?: number
) => {
  const response = await apiRequest(
    `/find-schedules?scheduleId=${scheduleId}&departureTimeFlexibility=${depTimeFlex}&destinationTimeFlexibility=${destTimeFlex}&departureDistanceFlexibility=${depDistFlex}&destinationDistanceFlexibility=${destDistFlex}`,
    "GET"
  );
  if (response.error) {
    throw new Error(response.error);
  }
  return response;
};
