import { Colors } from "@/constants/Variables";
import {
  setDeparture,
  setDestination,
  updateAddressList,
} from "@/data/redux/addressListSlice/slice";
import {
  setDepartureTime,
  setDestinationTime,
  setTravelMode,
} from "@/data/redux/scheduleSlice/slice";
import { RootState } from "@/data/redux/store";
import { setFocusedField, setUIState } from "@/data/redux/UIStateSlice/slice";
import { Ionicons } from "@expo/vector-icons";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useRef } from "react";
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AnimatedTextInput from "./AnimatedTextInput";
import { LocationProps, SheetComponentProps } from "./interfaces";

const SheetComponent: React.FC<SheetComponentProps> = ({ closeRouteSheet }) => {
  const dispatch = useDispatch();
  const departure = useSelector((state: RootState) => state.address.departure);
  const destination = useSelector(
    (state: RootState) => state.address.destination
  );
  const departureTime = useSelector(
    (state: RootState) => state.schedule.departureTime
  );
  const destinationTime = useSelector(
    (state: RootState) => state.schedule.destinationTime
  );
  const uiState = useSelector((state: RootState) => state.uiState.uiState);
  const travelMode = useSelector(
    (state: RootState) => state.schedule.travelMode
  );
  const focusedField = useSelector(
    (state: RootState) => state.uiState.focusedField
  );
  const isAnimationComplete = useSelector(
    (state: RootState) => state.uiState.isAnimationComplete
  );

  const departureInputRef = useRef<TextInput>(null);
  const destinationInputRef = useRef<TextInput>(null);
  const departureTimeInputRef = useRef<TextInput>(null);
  const destinationTimeInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (isAnimationComplete) {
      if (focusedField === "departure") {
        departureInputRef.current?.focus();
      } else if (focusedField === "destination") {
        destinationInputRef.current?.focus();
      } else if (focusedField === "departureTime") {
        departureTimeInputRef.current?.focus();
      } else if (focusedField === "destinationTime") {
        destinationTimeInputRef.current?.focus();
      }
    }
  }, [isAnimationComplete, focusedField]);

  const handleFocus = (
    field: "departure" | "destination" | "departureTime" | "destinationTime"
  ) => {
    dispatch(setFocusedField(field));
  };

  const handleSettingMapLocation = () => {};

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
    dispatch(setDeparture({ ...departure, name: text }));
    debouncedFindAddresses(text);
  };

  const handleSettingDestination = (text: string) => {
    dispatch(setDestination({ ...destination, name: text }));
    debouncedFindAddresses(text);
  };

  const handleDepartureTimeChange = (text: string) => {
    dispatch(setDepartureTime(text));
  };

  const handleDestinationTimeChange = (text: string) => {
    dispatch(setDestinationTime(text));
  };

  const handleTravelModeChange = (
    mode: "rider" | "passenger" | "partnership"
  ) => {
    dispatch(setTravelMode(mode));
  };

  const handleExpandSheet = () => {
    Keyboard.dismiss();
    dispatch(setUIState("sheet-expanded"));
  };

  const sheetHeight =
    uiState === "sheet-expanded"
      ? Dimensions.get("window").height * 0.47
      : Dimensions.get("window").height * 0.25;

  return (
    <View style={[styles.sheetContainer, { height: sheetHeight }]}>
      <View style={styles.routeHeader}>
        <TouchableOpacity onPress={closeRouteSheet}>
          <Ionicons name="close" size={28} />
        </TouchableOpacity>
        <Text style={styles.routeTitle}>Your route</Text>
        <TouchableOpacity onPress={handleExpandSheet}>
          <Ionicons name="add" size={28} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputWrapper}>
        <AnimatedTextInput
          value={departure.name}
          placeholder="Departure"
          inputRef={departureInputRef}
          onChangeText={(text) => handleSettingDeparture(text)}
          onMapLocationSelect={handleSettingMapLocation}
          onFocus={() => handleFocus("departure")}
          isFocused={focusedField === "departure"}
          leftIcon1={{ name: "search", color: "black" }}
          leftIcon2={{
            name: "radiobox-marked",
            color: departure.name ? Colors.light.secondary : "#bbb",
          }}
          rightIcon1={{ name: "close-circle", color: "#bbb" }}
          rightIcon2={{
            name: "map-marker-radius",
            color: Colors.light.primary,
          }}
        />

        <AnimatedTextInput
          value={destination.name}
          placeholder="Destination"
          inputRef={destinationInputRef}
          onChangeText={(text) => handleSettingDestination(text)}
          onMapLocationSelect={handleSettingMapLocation}
          onFocus={() => handleFocus("destination")}
          isFocused={focusedField === "destination"}
          leftIcon1={{ name: "search", color: "black" }}
          leftIcon2={{
            name: "radiobox-marked",
            color: destination.name ? Colors.light.secondary : "#bbb",
          }}
          rightIcon1={{ name: "close-circle", color: "#bbb" }}
          rightIcon2={{
            name: "map-marker-radius",
            color: Colors.light.secondary,
          }}
        />
        {uiState === "sheet-expanded" && (
          <>
            <AnimatedTextInput
              value={departureTime}
              placeholder="Departure Time"
              inputRef={departureTimeInputRef}
              onChangeText={handleDepartureTimeChange}
              onFocus={() => handleFocus("departureTime")}
              isFocused={focusedField === "departureTime"}
              leftIcon1={{ name: "time-outline", color: "black" }}
              leftIcon2={{
                name: "radiobox-marked",
                color: departureTime ? Colors.light.secondary : "#bbb",
              }}
              rightIcon1={{ name: "close-circle", color: "#bbb" }}
            />

            <AnimatedTextInput
              value={destinationTime}
              placeholder="Arrival Time"
              inputRef={destinationTimeInputRef}
              onChangeText={handleDestinationTimeChange}
              onFocus={() => handleFocus("destinationTime")}
              isFocused={focusedField === "destinationTime"}
              leftIcon1={{ name: "time-outline", color: "black" }}
              leftIcon2={{
                name: "radiobox-marked",
                color: destinationTime ? Colors.light.secondary : "#bbb",
              }}
              rightIcon1={{ name: "close-circle", color: "#bbb" }}
            />
          </>
        )}
      </View>
      {uiState === "sheet-expanded" && (
        <View style={styles.travelModeContainer}>
          <TouchableOpacity
            style={[
              styles.travelModeButton,
              travelMode === "rider" && styles.activeButton,
            ]}
            onPress={() => handleTravelModeChange("rider")}
          >
            <Text style={styles.travelModeText}>Rider</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.travelModeButton,
              travelMode === "passenger" && styles.activeButton,
            ]}
            onPress={() => handleTravelModeChange("passenger")}
          >
            <Text style={styles.travelModeText}>Passenger</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.travelModeButton,
              travelMode === "partnership" && styles.activeButton,
            ]}
            onPress={() => handleTravelModeChange("partnership")}
          >
            <Text style={styles.travelModeText}>Partnership</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
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
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 4,
  },
  routeTitle: {
    backgroundColor: "#fff",
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
  travelModeContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  travelModeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.light.accent,
  },
  activeButton: {
    backgroundColor: Colors.light.primary,
  },
  travelModeText: {
    color: Colors.light.background,
    fontSize: 16,
  },
});

export default SheetComponent;
