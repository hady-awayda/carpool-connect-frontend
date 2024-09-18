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
import { setFocusedField } from "@/data/redux/UIStateSlice/slice";
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
import BorderedButton from "../BorderedButton";
import AnimatedTextInput from "./AnimatedTextInput";
import { LocationProps, SheetComponentProps } from "./interfaces";
import addSchedule from "./addSchedule";
import BoldButton from "../BoldButton";

const SheetComponent: React.FC<SheetComponentProps> = ({ animateToState }) => {
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
    console.log(focusedField);
    if (isAnimationComplete || uiState === "full") {
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
  }, [uiState, focusedField]);

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

  const handleCloseSheet = () => {
    if (uiState === "sheet-expanded") {
      animateToState("full");
    } else if (uiState === "full") {
      animateToState("expanded");
    }
    departureInputRef.current?.blur();
    destinationInputRef.current?.blur();
  };

  const handleExpandSheet = () => {
    dispatch(setFocusedField("departureTime"));
    animateToState("sheet-expanded");
  };

  const handleSubmitSchedule = async () => {
    addSchedule();
    animateToState("expanded");
    Keyboard.dismiss();
  };

  const sheetHeight =
    uiState === "sheet-expanded"
      ? Dimensions.get("window").height * 0.55
      : Dimensions.get("window").height * 0.25;

  useEffect(() => console.log("uiState:", travelMode), [travelMode]);

  return (
    <View style={[styles.sheetContainer, { height: sheetHeight }]}>
      <View style={styles.routeHeader}>
        <TouchableOpacity onPress={handleCloseSheet}>
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
                name: "clock",
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
                name: "clock",
                color: destinationTime ? Colors.light.secondary : "#bbb",
              }}
              rightIcon1={{ name: "close-circle", color: "#bbb" }}
            />
          </>
        )}
      </View>
      {uiState === "sheet-expanded" && (
        <>
          <View style={styles.travelModeContainer}>
            <BoldButton
              onPress={() => handleTravelModeChange("rider")}
              width={90}
              height={40}
              buttonText="Rider"
              buttonStyle={
                travelMode === "rider" ? styles.activeButton : undefined
              }
            />
            <BoldButton
              onPress={() => handleTravelModeChange("passenger")}
              width={120}
              height={40}
              buttonText="Passenger"
              buttonStyle={
                travelMode === "passenger" ? styles.activeButton : undefined
              }
            />
            <BoldButton
              onPress={() => handleTravelModeChange("partnership")}
              width={120}
              height={40}
              buttonText="Partnership"
              buttonStyle={
                travelMode === "partnership" ? styles.activeButton : undefined
              }
            />
          </View>

          <BorderedButton
            buttonText="+ Add Schedule"
            onPress={handleSubmitSchedule}
            textColor={Colors.light.primary}
            borderColor={Colors.light.secondary}
          />
        </>
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
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 18,
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
