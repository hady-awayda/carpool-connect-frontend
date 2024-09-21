import { apiRequest } from "../apiHandler";
import store from "@/data/redux/store";

const addSchedule = async () => {
  const endpoint = "/user-schedules";
  const method = "POST";

  const state = store.getState();

  const scheduleData = {
    scheduleType: state.schedule.travelMode,
    departureName: state.address.departure.name,
    destinationName: state.address.destination.name,
    departureLat: state.address.departure.coords?.latitude,
    departureLng: state.address.departure.coords?.longitude,
    destinationLat: state.address.departure.coords?.latitude,
    destinationLng: state.address.departure.coords?.longitude,
    departureTime: Date.now(),
    arrivalTime: Date.now(),
    isDefault: true,
    isActive: true,
    selectedCar: "C63 AMG",
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
