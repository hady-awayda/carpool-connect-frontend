import { useCallback } from "react";
import { LocationProps } from "./interfaces";
import debounce from "lodash.debounce";
import { updateAddressList } from "@/data/redux/addressListSlice/slice";
import { useDispatch } from "react-redux";

const dispatch = useDispatch();

const findAddressesByName = async (name: string, limit = 5, page = 1) => {
  const encodedName = encodeURIComponent(name);
  const url = `https://nominatim.openstreetmap.org/search?q=${encodedName}&format=json&limit=${limit}&page=${page}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.length > 0) {
      const addresses = data.map((item: LocationProps) => ({
        name: item.name,
        coords: {
          latitude: item.coords?.latitude,
          longitude: item.coords?.longitude,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        },
      }));
      return addresses;
    } else return [];
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return [];
  }
};

const debouncedFindAddresses = useCallback(
  debounce(async (text: string) => {
    if (text.trim().length === 0) {
      dispatch(updateAddressList([]));
      return;
    }

    const addresses = await findAddressesByName(text);
    dispatch(updateAddressList(addresses));
  }, 500),
  []
);

export default debouncedFindAddresses;
