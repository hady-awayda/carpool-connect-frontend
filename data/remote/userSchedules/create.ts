import store from "@/data/redux/store";
import { apiRequest } from "../apiHandler";

const convertToISOString = (timeString: string): string => {
  const now = new Date();

  const timePattern = /(\d{1,2}):(\d{2})\s?(AM|PM)/i;
  const match = timeString.match(timePattern);

  if (!match) {
    throw new Error("Invalid time format");
  }

  let [, hours, minutes, meridian] = match;
  hours = parseInt(hours);
  minutes = parseInt(minutes);

  if (meridian.toUpperCase() === "PM" && hours < 12) {
    hours += 12;
  } else if (meridian.toUpperCase() === "AM" && hours === 12) {
    hours = 0;
  }

  now.setHours(hours, minutes, 0, 0);

  const adjustedTime = new Date(now.getTime());

  return adjustedTime.toISOString();
};

const addSchedule = async () => {
  const endpoint = "/user-schedules";
  const method = "POST";

  const state = store.getState();

  const departureISOTime = convertToISOString(state.schedule.departureTime);
  const destinationISOTime = convertToISOString(state.schedule.destinationTime);

  const scheduleData = {
    scheduleType: state.schedule.travelMode,
    departureName: state.address.departure.name,
    destinationName: state.address.destination.name,
    departureLat: state.address.departure.coords?.latitude,
    departureLng: state.address.departure.coords?.longitude,
    destinationLat: state.address.destination.coords?.latitude,
    destinationLng: state.address.destination.coords?.longitude,
    departureTime: departureISOTime,
    arrivalTime: destinationISOTime,
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
