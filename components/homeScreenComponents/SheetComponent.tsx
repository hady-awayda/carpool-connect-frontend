import { Colors } from "@/constants/Variables";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type SheetComponentProps = {
  closeRouteSheet: () => void;
  destination: string;
  setDestination: (text: string) => void;
  departure: string;
  setDeparture: (text: string) => void;
  isAnimationComplete: boolean;
  destinationInputRef: React.RefObject<TextInput>;
};

const SheetComponent: React.FC<SheetComponentProps> = ({
  closeRouteSheet,
  destination,
  setDestination,
  departure,
  setDeparture,
  isAnimationComplete,
  destinationInputRef,
}) => {
  const [focusedField, setFocusedField] = useState<
    "departure" | "destination" | null
  >(null);

  const departureBorderOpacity = useRef(new Animated.Value(0)).current;
  const destinationBorderOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isAnimationComplete) {
      destinationInputRef.current?.focus();
    }
  }, [isAnimationComplete]);

  const animateFocus = (
    field: "departure" | "destination",
    focused: boolean
  ) => {
    const opacityAnim =
      field === "departure" ? departureBorderOpacity : destinationBorderOpacity;

    Animated.timing(opacityAnim, {
      toValue: focused ? 1 : 0,
      duration: 200,
      easing: Easing.bezier(0.42, 0, 0.58, 1),
      useNativeDriver: false,
    }).start();
  };

  const handleFocus = (field: "departure" | "destination") => {
    setFocusedField(field);
    animateFocus(field, true);
  };

  const handleBlur = (field: "departure" | "destination") => {
    if (focusedField === field) {
      setFocusedField(null);
    }
    animateFocus(field, false);
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
        <View>
          {focusedField === "departure" ? (
            <Ionicons name="search" size={20} style={styles.leftIcon} />
          ) : (
            <MaterialCommunityIcons
              name="circle"
              size={20}
              color="lightblue"
              style={styles.leftIcon}
            />
          )}

          <View
            style={[
              styles.inputContainer,
              focusedField === "departure" && styles.focusedInputContainer,
            ]}
          >
            <TextInput
              placeholder="Departure"
              value={departure}
              onChangeText={setDeparture}
              onFocus={() => handleFocus("departure")}
              onBlur={() => handleBlur("departure")}
              style={styles.textInput}
            />
          </View>

          {focusedField === "departure" && (
            <MaterialCommunityIcons
              name="map-marker"
              size={20}
              color={Colors.light.primary}
              style={styles.rightIcon}
            />
          )}

          <Animated.View
            style={[
              styles.overlayBorder,
              {
                opacity: departureBorderOpacity,
              },
            ]}
            pointerEvents="box-none"
          />
        </View>

        <View>
          {focusedField === "destination" ? (
            <Ionicons name="search" size={20} style={styles.leftIcon} />
          ) : (
            <MaterialCommunityIcons
              name="circle"
              size={20}
              color="#ddd"
              style={styles.leftIcon}
            />
          )}

          <View
            style={[
              styles.inputContainer,
              focusedField === "destination" && styles.focusedInputContainer,
            ]}
          >
            <TextInput
              ref={destinationInputRef}
              placeholder="Destination"
              value={destination}
              onChangeText={setDestination}
              onFocus={() => handleFocus("destination")}
              onBlur={() => handleBlur("destination")}
              style={styles.textInput}
            />
          </View>

          {focusedField === "destination" && (
            <MaterialCommunityIcons
              name="map-marker"
              size={20}
              color="indigo"
              style={styles.rightIcon}
            />
          )}

          <Animated.View
            style={[
              styles.overlayBorder,
              {
                opacity: destinationBorderOpacity,
              },
            ]}
            pointerEvents="box-none"
          />
        </View>
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
  inputContainer: {
    borderWidth: 1.5,
    borderColor: "transparent",
    borderRadius: 8,
    paddingLeft: 36,
    paddingRight: 36,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  focusedInputContainer: {
    backgroundColor: "#fff",
  },
  inputWrapper: {
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    marginTop: 16,
  },
  textInput: {
    fontSize: 16,
    paddingVertical: 0,
    color: "#000",
    height: 48,
  },
  overlayBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    borderRadius: 8,
  },
  leftIcon: {
    position: "absolute",
    left: 10,
    top: "50%",
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },
  rightIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },
});

export default SheetComponent;
