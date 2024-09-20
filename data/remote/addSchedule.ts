import { apiRequest } from "./apiHandler";
import store from "@/data/redux/store";

const addSchedule = async () => {
  const endpoint = "/userSchedules";
  const method = "POST";

  const state = store.getState();

  const scheduleData = {
    scheduleType: state.schedule.travelMode,
    departureLat: state.address.departure.coords?.latitude,
    departureLng: state.address.departure.coords?.longitude,
    destinationLat: state.address.departure.coords?.latitude,
    destinationLng: state.address.departure.coords?.longitude,
    departureTime: Date.now(),
    arrivalTime: Date.now(),
    isDefault: true,
    isActive: true,
  };

  console.log(scheduleData);

  try {
    const response = await apiRequest(endpoint, method, scheduleData);
    console.log(response);
    return response;
  } catch (error: any) {
    return { error: error.message || "Failed to add schedule" };
  }
};

export default addSchedule;
