import { Schedule } from "@/components/scheduleScreenComponents/ScheduleInterfaces";
import useCoords from "./useCoords";

const useInitialRegion = (scheduleData: Schedule) => {
  const { depLat, depLng, destLat, destLng } = useCoords(scheduleData);

  const latitude = (depLat + destLat) / 2;
  const longitude = (depLng + destLng) / 2;
  const latitudeDelta = Math.abs(depLat - destLat) * 1.5 || 0.5;
  const longitudeDelta = Math.abs(depLng - destLng) * 1.5 || 0.5;

  return { latitude, longitude, latitudeDelta, longitudeDelta };
};

export default useInitialRegion;
