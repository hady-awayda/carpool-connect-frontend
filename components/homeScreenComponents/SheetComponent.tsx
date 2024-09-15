import { Colors } from "@/constants/Variables";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type SheetComponentProps = {
  closeRouteSheet: () => void;
  destination: string;
  setDestination: (text: string) => void;
  departure: string;
  setDeparture: (text: string) => void;
  isAnimationComplete: boolean;
};

const SheetComponent: React.FC<SheetComponentProps> = ({
  closeRouteSheet,
  destination,
  setDestination,
  departure,
  setDeparture,
  isAnimationComplete,
}) => {
  const [focusedField, setFocusedField] = useState<
    "departure" | "destination" | null
  >(null);

  const departureBorderColor = useRef(new Animated.Value(0)).current;
  const destinationBorderColor = useRef(new Animated.Value(0)).current;
  const destinationInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (isAnimationComplete) {
      destinationInputRef.current?.focus();
    }
  }, [isAnimationComplete]);

  const animateBorderColor = (
    field: "departure" | "destination",
    focused: boolean
  ) => {
    const animatedValue =
      field === "departure" ? departureBorderColor : destinationBorderColor;
    Animated.timing(animatedValue, {
      toValue: focused ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleFocus = (field: "departure" | "destination") => {
    setFocusedField(field);
    animateBorderColor(field, true);
  };

  const handleBlur = (field: "departure" | "destination") => {
    if (focusedField === field) {
      setFocusedField(null);
    }
    animateBorderColor(field, false);
  };

  const departureBorderColorAnim = departureBorderColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ccc", Colors.light.primary],
  });

  const destinationBorderColorAnim = destinationBorderColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ccc", Colors.light.primary],
  });

  return (
    <View style={styles.sheetContainer}>
      <View style={styles.routeHeader}>
        <TouchableOpacity onPress={closeRouteSheet}>
          <Ionicons name="close" size={48} />
        </TouchableOpacity>
        <Text style={styles.routeTitle}>Your route</Text>
        <TouchableOpacity>
          <Ionicons name="add" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.routeDetails}>
        <Animated.View
          style={[
            styles.inputContainer,
            { borderColor: departureBorderColorAnim },
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
            { borderColor: destinationBorderColorAnim },
          ]}
        >
          <TextInput
            placeholder="Destination"
            value={destination}
            onChangeText={setDestination}
            onFocus={() => handleFocus("destination")}
            onBlur={() => handleBlur("destination")}
            style={styles.textInput}
            autoFocus
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  routeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  routeDetails: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  textInput: {
    fontSize: 16,
  },
});

export default SheetComponent;
