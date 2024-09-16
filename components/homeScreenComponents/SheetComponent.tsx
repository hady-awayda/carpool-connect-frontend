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

const { height } = Dimensions.get("window");

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
      duration: 500,
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

      <View style={styles.routeDetails}>
        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Departure"
              value={departure}
              onChangeText={setDeparture}
              onFocus={() => handleFocus("departure")}
              onBlur={() => handleBlur("departure")}
              style={styles.textInput}
            />
          </View>
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

        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
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
    height: height * 0.25,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 16,
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
  routeDetails: {
    marginTop: 10,
  },
  inputWrapper: {
    position: "relative",
    marginTop: 4,
  },
  inputContainer: {
    borderWidth: 1.5,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingLeft: 32,
    justifyContent: "center",
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
  textInput: {
    fontSize: 16,
    height: 28,
  },
});

export default SheetComponent;
