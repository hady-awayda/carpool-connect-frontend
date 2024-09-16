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

  const departureBorderColor = useRef(new Animated.Value(0)).current;
  const destinationBorderColor = useRef(new Animated.Value(0)).current;
  const departureOpacity = useRef(new Animated.Value(0)).current;
  const destinationOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isAnimationComplete) {
      destinationInputRef.current?.focus();
    }
  }, [isAnimationComplete]);

  const animateFocus = (
    field: "departure" | "destination",
    focused: boolean
  ) => {
    const borderColorAnim =
      field === "departure" ? departureBorderColor : destinationBorderColor;
    const opacityAnim =
      field === "departure" ? departureOpacity : destinationOpacity;

    Animated.parallel([
      Animated.timing(borderColorAnim, {
        toValue: focused ? 1 : 0,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: focused ? 1 : 0,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
    ]).start();
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

  const departureBorderColorAnim = departureBorderColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ccc", Colors.light.primary],
  });

  const destinationBorderColorAnim = destinationBorderColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ccc", Colors.light.primary],
  });

  const departureOpacityAnim = departureOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const destinationOpacityAnim = destinationOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

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
        <Animated.View
          style={[
            styles.inputContainer,
            {
              borderColor: departureBorderColorAnim,
              opacity: departureOpacityAnim,
            },
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
        </Animated.View>

        <Animated.View
          style={[
            styles.inputContainer,
            {
              borderColor: destinationBorderColorAnim,
              opacity: destinationOpacityAnim,
            },
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
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    height: height - 620,
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
  inputContainer: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 10,
    paddingLeft: 32,
    marginTop: 4,
  },
  textInput: {
    fontSize: 16,
  },
});

export default SheetComponent;
