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
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Keyboard,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import addSchedule from "../../data/remote/addSchedule";
import BoldButton from "../BoldButton";
import BorderedButton from "../BorderedButton";
import AnimatedTextInput from "./AnimatedTextInput";
import { LocationProps, SheetComponentProps } from "./interfaces";
import { toggleDay } from "@/data/redux/daysSlice/slice";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const SheetComponent: React.FC<SheetComponentProps> = ({ animateToState }) => {
  const [sheetHeight] = useState(
    new Animated.Value(Dimensions.get("window").height * 0.25)
  );
  const [secondSheetPosition] = useState(
    new Animated.Value(Dimensions.get("window").width)
  );
  const [departureTimeOpacity] = useState(new Animated.Value(0));
  const [destinationTimeOpacity] = useState(new Animated.Value(0));
  const [buttonsOpacity] = useState(new Animated.Value(0));
  const [addButtonOpacity] = useState(new Animated.Value(0));
  const [iconRotation] = useState(new Animated.Value(0));
  const selectedDays = useSelector(
    (state: RootState) => state.days.selectedDays
  );

  const handleExpandSheet = () => {
    Animated.timing(sheetHeight, {
      toValue: Dimensions.get("window").height * 0.62,
      duration: 100,
      useNativeDriver: false,
    }).start();

    Animated.stagger(20, [
      Animated.timing(departureTimeOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(destinationTimeOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(buttonsOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(addButtonOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(iconRotation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseSheet = () => {
    Animated.parallel([
      Animated.timing(sheetHeight, {
        toValue: Dimensions.get("window").height * 0.25,
        duration: 200,
        useNativeDriver: false,
      }),

      Animated.stagger(100, [
        Animated.timing(departureTimeOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(destinationTimeOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(buttonsOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(addButtonOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),

      Animated.timing(iconRotation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const iconInterpolation = iconRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  const handleArrowPress = () => {
    dispatch(setUIState("slide-1"));
    handleOpenSlide();
  };

  const handleBackPress = () => {
    dispatch(setUIState("sheet-expanded"));
    handleCloseSlide();
  };

  const handleOpenSlide = () => {
    Animated.timing(secondSheetPosition, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseSlide = () => {
    Animated.timing(secondSheetPosition, {
      toValue: Dimensions.get("window").width,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const toggleDaySelection = (day: string) => {
    dispatch(toggleDay(day));
  };

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

  const departureInputRef = useRef<TextInput>(null);
  const destinationInputRef = useRef<TextInput>(null);
  const departureTimeInputRef = useRef<TextInput>(null);
  const destinationTimeInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (uiState !== "full" && uiState !== "sheet-expanded") {
      departureInputRef.current?.blur();
      destinationInputRef.current?.blur();
      departureTimeInputRef.current?.blur();
      destinationTimeInputRef.current?.blur();
    }
    if (uiState === "full") {
      handleCloseSheet();
      if (focusedField === "departure") {
        departureInputRef.current?.focus();
      } else if (focusedField === "destination") {
        destinationInputRef.current?.focus();
      } else
        departure.name === ""
          ? departureInputRef.current?.focus()
          : destinationInputRef.current?.focus();
    }
    if (uiState === "sheet-expanded") {
      handleExpandSheet();
      if (focusedField === "departureTime") {
        departureTimeInputRef.current?.focus();
      } else if (focusedField === "destinationTime") {
        destinationTimeInputRef.current?.focus();
      }
    }
  }, [uiState]);

  const handleClosePress = () => {
    if (uiState === "slide-1") {
      animateToState("sheet-expanded");
    } else if (uiState === "sheet-expanded") {
      animateToState("full");
    } else if (uiState === "full") {
      animateToState("expanded");
    }
  };

  const handleExpandPress = () => {
    animateToState("sheet-expanded");
  };

  const handleSettingMapLocation = () => {
    if (focusedField === "departure") {
      animateToState("setting-departure");
    } else if (focusedField === "destination") {
      animateToState("setting-destination");
    }
  };

  const findAddressesByName = async (name: string, limit = 5, page = 1) => {
    const encodedName = encodeURIComponent(name);
    const url = `https://nominatim.openstreetmap.org/search?q=${encodedName}&format=json&limit=${limit}&page=${page}&countrycodes=lb&lang=en`;

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

  const handleDepartureTime = () => {
    dispatch(setFocusedField("departureTime"));
  };

  const handleSubmitSchedule = async () => {
    if (departureTime > destinationTime)
      alert("Departure time can't be ahead of destination time!");
    addSchedule();
    // animateToState("expanded");
    Keyboard.dismiss();
  };

  return (
    <Animated.View style={[styles.sheetContainer, { height: sheetHeight }]}>
      <View style={styles.routeHeader}>
        <TouchableOpacity
          onPress={uiState === "slide-1" ? handleBackPress : handleClosePress}
        >
          <Animated.View
            style={
              uiState === "slide-1" && {
                transform: [{ rotate: iconInterpolation }],
              }
            }
          >
            <Ionicons
              name={uiState === "slide-1" ? "chevron-down" : "close"}
              size={28}
              color="black"
            />
          </Animated.View>
        </TouchableOpacity>
        <Text style={styles.routeTitle}>Your route</Text>
        {uiState !== "slide-1" ? (
          <TouchableOpacity
            onPress={uiState === "full" ? handleExpandPress : handleArrowPress}
          >
            <Animated.View
              style={{ transform: [{ rotate: iconInterpolation }] }}
            >
              <Ionicons
                name={uiState === "sheet-expanded" ? "chevron-up" : "add"}
                size={28}
                color="black"
              />
            </Animated.View>
          </TouchableOpacity>
        ) : (
          <Ionicons name={"add"} size={28} color="transparent" />
        )}
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.inputWrapper}>
          <AnimatedTextInput
            value={departure.name}
            placeholder="Departure"
            inputRef={departureInputRef}
            onChangeText={(text) => handleSettingDeparture(text)}
            onIcon1Press={() => handleSettingDeparture("")}
            onIcon2Press={handleSettingMapLocation}
            onFocus={() => dispatch(setFocusedField("departure"))}
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
            onIcon1Press={() => handleSettingDestination("")}
            onIcon2Press={handleSettingMapLocation}
            onFocus={() => dispatch(setFocusedField("destination"))}
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
              <Animated.View
                style={[
                  focusedField === "departureTime" && { zIndex: 400 },
                  { opacity: departureTimeOpacity },
                ]}
              >
                <AnimatedTextInput
                  value={departureTime}
                  placeholder="Departure Time"
                  inputRef={departureTimeInputRef}
                  onChangeText={(text) => dispatch(setDepartureTime(text))}
                  onFocus={handleDepartureTime}
                  onIcon2Press={() => dispatch(setDepartureTime(""))}
                  isFocused={focusedField === "departureTime"}
                  leftIcon1={{ name: "time-outline", color: "black" }}
                  leftIcon2={{
                    name: "clock",
                    color: departureTime ? Colors.light.secondary : "#bbb",
                  }}
                  rightIcon2={{ name: "close-circle", color: "#bbb" }}
                />
              </Animated.View>

              <Animated.View
                style={[
                  focusedField === "destinationTime" && { zIndex: 400 },
                  { opacity: destinationTimeOpacity },
                ]}
              >
                <AnimatedTextInput
                  value={destinationTime}
                  placeholder="Arrival Time"
                  inputRef={destinationTimeInputRef}
                  onChangeText={(text) => dispatch(setDestinationTime(text))}
                  onFocus={() => dispatch(setFocusedField("destinationTime"))}
                  onIcon2Press={() => dispatch(setDestinationTime(""))}
                  isFocused={focusedField === "destinationTime"}
                  leftIcon1={{ name: "time-outline", color: "black" }}
                  leftIcon2={{
                    name: "clock",
                    color: destinationTime ? Colors.light.secondary : "#bbb",
                  }}
                  rightIcon2={{ name: "close-circle", color: "#bbb" }}
                />
              </Animated.View>
            </>
          )}
        </View>

        {uiState === "sheet-expanded" && (
          <>
            <Animated.View
              style={[styles.travelModeContainer, { opacity: buttonsOpacity }]}
            >
              <BorderedButton
                onPress={() => dispatch(setTravelMode("rider"))}
                width={90}
                height={40}
                buttonText="Rider"
                borderWidth={travelMode === "rider" ? 1.5 : 1}
                textColor={
                  travelMode === "rider"
                    ? Colors.light.primary
                    : Colors.light.text
                }
                borderColor={
                  travelMode === "rider"
                    ? Colors.light.primary
                    : Colors.light.text
                }
              />

              <BorderedButton
                onPress={() => dispatch(setTravelMode("passenger"))}
                width={120}
                height={40}
                buttonText="Passenger"
                borderWidth={travelMode === "passenger" ? 1.5 : 1}
                textColor={
                  travelMode === "passenger"
                    ? Colors.light.primary
                    : Colors.light.text
                }
                borderColor={
                  travelMode === "passenger"
                    ? Colors.light.primary
                    : Colors.light.text
                }
              />

              <BorderedButton
                onPress={() => dispatch(setTravelMode("partnership"))}
                width={120}
                height={40}
                buttonText="Partnership"
                borderWidth={travelMode === "partnership" ? 1.5 : 1}
                textColor={
                  travelMode === "partnership"
                    ? Colors.light.primary
                    : Colors.light.text
                }
                borderColor={
                  travelMode === "partnership"
                    ? Colors.light.primary
                    : Colors.light.text
                }
              />
            </Animated.View>

            <Animated.View
              style={{
                opacity: addButtonOpacity,
                alignItems: "center",
                height: 100,
                gap: 10,
              }}
            >
              <BoldButton
                buttonText="+ Add Schedule"
                onPress={handleSubmitSchedule}
                buttonStyle={{ backgroundColor: Colors.light.primary }}
                width={352}
              />
              <BorderedButton
                buttonText="Set Days"
                onPress={handleArrowPress}
                width={352}
              />
            </Animated.View>
          </>
        )}
      </View>

      <Animated.View
        style={[
          styles.secondSheet,
          { transform: [{ translateX: secondSheetPosition }] },
        ]}
      >
        <View style={styles.slideHeader}>
          <TouchableOpacity onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.routeTitle}>Set Days</Text>
        </View>

        <View style={styles.buttonContainer}>
          {daysOfWeek.map((day) => (
            <BoldButton
              key={day}
              buttonText={day}
              onPress={() => toggleDaySelection(day)}
              buttonStyle={{
                backgroundColor: selectedDays[day]
                  ? Colors.light.primary
                  : Colors.light.text,
                borderColor: selectedDays[day]
                  ? Colors.light.primary
                  : Colors.light.text,
                borderWidth: 1,
                justifyContent: "center",
              }}
              width={240}
              height={48}
              textStyle={{ color: "#fff" }}
            />
          ))}
        </View>
      </Animated.View>
    </Animated.View>
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
    justifyContent: "space-between",
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    marginTop: 16,
  },
  travelModeContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 24,
  },
  travelModeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.light.accent,
  },
  activeButton: {
    backgroundColor: Colors.light.text,
  },
  travelModeText: {
    color: Colors.light.background,
    fontSize: 16,
  },
  secondSheet: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get("window").width,
    backgroundColor: "#fff",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  slideHeader: {
    marginTop: 24,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    gap: 6,
  },
});

export default SheetComponent;
