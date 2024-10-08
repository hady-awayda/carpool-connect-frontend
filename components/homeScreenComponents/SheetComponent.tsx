import { Colors, Typography } from "@/constants/Variables";
import {
  setDeparture,
  setDestination,
  updateAddressList,
} from "@/data/redux/addressListSlice/slice";
import { toggleDay } from "@/data/redux/daysSlice/slice";
import {
  setDepartureTime,
  setDestinationTime,
  setTravelMode,
} from "@/data/redux/scheduleSlice/slice";
import { RootState } from "@/data/redux/store";
import { setFocusedField, setUIState } from "@/data/redux/UIStateSlice/slice";
import findPlaceByName from "@/data/remote/location/findAddressByName";
import { Ionicons } from "@expo/vector-icons";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import addSchedule from "../../data/remote/userSchedules/create";
import BoldButton from "../BoldButton";
import BorderedButton from "../BorderedButton";
import AnimatedTextInput from "./AnimatedTextInput";
import { SheetComponentProps } from "./interfaces";
import DateTimePickerInput from "./DateTimePickerInput";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const { width } = Dimensions.get("window");

const SheetComponent: React.FC<SheetComponentProps> = ({ animateToState }) => {
  const [showDateTimePicker, setShowPicker] = useState(false);

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

  const dispatch = useDispatch();
  const selectedDays = useSelector(
    (state: RootState) => state.days.selectedDays
  );
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
  }, [uiState, focusedField]);

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
    destinationInputRef.current?.focus();
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

  const debouncedFindAddresses = useCallback(
    debounce(async (text: string) => {
      if (text.trim().length === 0) {
        dispatch(updateAddressList([]));
        return;
      }

      const addresses = await findPlaceByName(text);
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

  const handleClearingDeparture = () => {
    dispatch(setDeparture({ ...departure, name: "" }));
    dispatch(setFocusedField("departure"));
    animateToState("full");
  };

  const handleClearingDestination = () => {
    dispatch(setDestination({ ...destination, name: "" }));
    dispatch(setFocusedField("destination"));
    animateToState("full");
  };

  const handleDepartureTime = () => {
    dispatch(setFocusedField("departureTime"));
  };

  const handleDestinationTime = () => {
    dispatch(setFocusedField("destinationTime"));
  };

  const handleSubmitSchedule = async () => {
    console.log(departureTime, destinationTime);
    if (!departure.name || !destination.name) {
      alert("Please select departure and destination!");
      return;
    }
    if (!departureTime || !destinationTime) {
      alert("Please select departure and destination time!");
      return;
    }

    try {
      const response = await addSchedule();

      if (response.isActive) {
        console.log(response);
        animateToState("expanded");
        alert("Schedule successfully added!");
      } else {
        alert("Failed to add the schedule. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while adding the schedule. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleDateTimeConfirm = (time: string) => {
    if (focusedField === "departureTime") {
      dispatch(setDepartureTime(time));
    } else if (focusedField === "destinationTime") {
      dispatch(setDestinationTime(time));
    }

    setShowPicker(false);
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
            onIcon1Press={handleClearingDeparture}
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
            onIcon1Press={handleClearingDestination}
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
                  onFocus={handleDepartureTime}
                  onIcon1Press={() => setDepartureTime("")}
                  onIcon2Press={() => setShowPicker(true)}
                  isFocused={focusedField === "departureTime"}
                  leftIcon1={{ name: "time-outline", color: "black" }}
                  leftIcon2={{
                    name: "clock",
                    color: departureTime ? Colors.light.secondary : "#bbb",
                  }}
                  rightIcon1={{ name: "close-circle", color: "#bbb" }}
                  rightIcon2={{ name: "calendar", color: "#bbb" }}
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
                  onFocus={handleDestinationTime}
                  onIcon1Press={() => setDestinationTime("")}
                  onIcon2Press={() => setShowPicker(true)}
                  isFocused={focusedField === "destinationTime"}
                  leftIcon1={{ name: "time-outline", color: "black" }}
                  leftIcon2={{
                    name: "clock",
                    color: destinationTime ? Colors.light.secondary : "#bbb",
                  }}
                  rightIcon1={{ name: "close-circle", color: "#bbb" }}
                  rightIcon2={{ name: "calendar", color: "#bbb" }}
                />
              </Animated.View>

              {showDateTimePicker && (
                <Animated.View
                  style={[
                    styles.sheetContainer,
                    { height: Dimensions.get("window").height * 0.3 },
                  ]}
                >
                  <View style={styles.inputWrapper}>
                    <DateTimePickerInput
                      value={destinationTime}
                      placeholder="Arrival Time"
                      setShowPicker={setShowPicker}
                      onConfirm={handleDateTimeConfirm}
                    />
                  </View>
                </Animated.View>
              )}
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
                width={width * 0.915}
              />
              <BorderedButton
                buttonText="Set Days"
                onPress={handleArrowPress}
                width={width * 0.915}
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
            <Ionicons name="chevron-back" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.routeTitle}>Set Days</Text>
          <Ionicons name="chevron-back" size={28} color="transparent" />
        </View>

        <View style={styles.buttonContainer}>
          {daysOfWeek.map((day) => (
            <BoldButton
              key={day}
              buttonText={day}
              onPress={() => dispatch(toggleDay(day))}
              buttonStyle={{
                backgroundColor: selectedDays[day]
                  ? Colors.light.primary
                  : "#fff",
                borderColor: selectedDays[day]
                  ? Colors.light.primary
                  : Colors.light.text,
                borderWidth: 1.5,
                justifyContent: "center",
              }}
              textStyle={{
                color: selectedDays[day] ? "#fff" : Colors.light.text,
                ...Typography.title,
              }}
              width={240}
              height={48}
            />
          ))}

          <BoldButton
            buttonText="Finish"
            onPress={handleSubmitSchedule}
            buttonStyle={{
              backgroundColor: Colors.light.primary,
              marginTop: 24,
            }}
            width={340}
          />
          <BorderedButton
            buttonText="Edit Schedule"
            onPress={handleBackPress}
            buttonStyle={{
              backgroundColor: "#fff",
              marginTop: 16,
            }}
            width={340}
          />
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
    textAlign: "center",
    flex: 1,
    ...Typography.heading2,
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
    left: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
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
    paddingTop: 40,
  },
  slideHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    gap: 6,
  },
});

export default SheetComponent;
