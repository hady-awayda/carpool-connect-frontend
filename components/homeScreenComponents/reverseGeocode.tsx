import * as Location from "expo-location";
import { useDispatch } from "react-redux";
import { setSearch } from "@/data/redux/addressListSlice/slice";

const reverseGeocode = async (latitude: number, longitude: number) => {
  try {
    const addresses = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    if (addresses.length > 0) {
      const address: string =
        addresses[0].street ||
        addresses[0].city ||
        addresses[0].region ||
        addresses[0].name ||
        "Unknown Location";

      return address;
    } else {
      return "Unknown Location";
    }
  } catch (error) {
    console.error("Error fetching location name:", error);
    return "Unknown Location";
  }
};

export default reverseGeocode;
