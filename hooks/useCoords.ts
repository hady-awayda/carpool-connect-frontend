import { Schedule } from "@/components/scheduleScreenComponents/ScheduleInterfaces";

const useCoords = (scheduleData: Schedule) => {
  const parseCoordinate = (value: string | number) => {
    const parsed = parseFloat(String(value));
    return isNaN(parsed) ? 0 : parsed;
  };

  const depLat = parseCoordinate(scheduleData.departureLat);
  const depLng = parseCoordinate(scheduleData.departureLng);
  const destLat = parseCoordinate(scheduleData.destinationLat);
  const destLng = parseCoordinate(scheduleData.destinationLng);

  return { depLat, depLng, destLat, destLng };
};

export default useCoords;
