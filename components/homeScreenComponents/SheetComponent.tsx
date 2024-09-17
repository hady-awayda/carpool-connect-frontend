import { Colors } from "@/constants/Variables";
import {
  setDeparture,
  setDestination,
  updateAddressList,
} from "@/data/redux/addressListSlice/slice";
import { Ionicons } from "@expo/vector-icons";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AnimatedTextInput from "./AnimatedTextInput";
import { LocationProps, SheetComponentProps } from "./interfaces";
import { RootState } from "@/data/redux/store";

const SheetComponent: React.FC<SheetComponentProps> = ({
  closeRouteSheet,
  setMapLocation,
  isAnimationComplete,
  destinationInputRef,
}) => {
  const dispatch = useDispatch();
  const departure = useSelector(
    (state: RootState) => state.address.departure.name
  );
  const destination = useSelector(
    (state: RootState) => state.address.destination.name
  );

  const [focusedField, setFocusedField] = useState<"departure" | "destination">(
    "destination"
  );

  useEffect(() => {
    if (isAnimationComplete) {
      destinationInputRef.current?.focus();
    }
  }, [isAnimationComplete, destinationInputRef]);

  const handleFocus = (field: "departure" | "destination") => {
    if (focusedField === field) setFocusedField("destination");
    setFocusedField(field);
  };

  const handleSettingMapLocation = () => {
    if (focusedField === "departure") {
      setMapLocation("departure");
    } else if (focusedField === "destination") {
      setMapLocation("destination");
    }
  };

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

  const handleSettingDeparture = (text: string) => {
    setDeparture(
      (prev: LocationProps): LocationProps => ({ ...prev, name: text })
    );
    debouncedFindAddresses(text);
  };

  const handleSettingDestination = (text: string) => {
    setDestination(
      (prev: LocationProps): LocationProps => ({ ...prev, name: text })
    );
    debouncedFindAddresses(text);
  };

  return (
    <View style={styles.sheetContainer}>
      <View style={styles.routeHeader}>
        <TouchableOpacity onPress={closeRouteSheet}>
          <Ionicons name="close" size={28} />
        </TouchableOpacity>
        <Text style={styles.routeTitle}>Your route</Text>
        <TouchableOpacity>
          <Ionicons name="add" size={28} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputWrapper}>
        <AnimatedTextInput
          value={departure}
          placeholder="Departure"
          onChangeText={(text) => handleSettingDeparture(text)}
          onMapLocationSelect={handleSettingMapLocation}
          onFocus={() => handleFocus("departure")}
          isFocused={focusedField === "departure"}
          leftIcon1={{ name: "search", color: "black" }}
          leftIcon2={{ name: "radiobox-marked", color: Colors.light.secondary }}
          rightIcon1={{ name: "close-circle", color: "#bbb" }}
          rightIcon2={{
            name: "map-marker-radius",
            color: Colors.light.primary,
          }}
        />

        <AnimatedTextInput
          value={destination}
          placeholder="Destination"
          inputRef={destinationInputRef}
          onChangeText={(text) => handleSettingDestination(text)}
          onMapLocationSelect={handleSettingMapLocation}
          onFocus={() => handleFocus("destination")}
          isFocused={focusedField === "destination"}
          leftIcon1={{ name: "search", color: "black" }}
          leftIcon2={{ name: "radiobox-marked", color: "#bbb" }}
          rightIcon1={{ name: "close-circle", color: "#bbb" }}
          rightIcon2={{
            name: "map-marker-radius",
            color: Colors.light.secondary,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    height: Dimensions.get("window").height * 0.25,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  routeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 4,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  inputWrapper: {
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    marginTop: 16,
  },
});

export default SheetComponent;
