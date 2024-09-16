import { Colors } from "@/constants/Variables";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AnimatedTextInput from "./AnimatedTextInput";
import { SheetComponentProps } from "./interfaces";

const SheetComponent: React.FC<SheetComponentProps> = ({
  closeRouteSheet,
  destination,
  setDestination,
  departure,
  setDeparture,
  setMapLocation,
  isAnimationComplete,
  destinationInputRef,
}) => {
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
          onChangeText={setDeparture}
          onMapLocationSelect={setMapLocation}
          onFocus={() => handleFocus("departure")}
          placeholder="Departure"
          isFocused={focusedField === "departure"}
          leftIcon1="search"
          leftIcon1Color="black"
          leftIcon2="radiobox-marked"
          leftIcon2Color={Colors.light.secondary}
          rightIcon1="close-circle"
          rightIcon1Color="#bbb"
          rightIcon2="map-marker-radius"
          rightIcon2Color={Colors.light.primary}
        />

        <AnimatedTextInput
          value={destination}
          onChangeText={setDestination}
          onMapLocationSelect={setMapLocation}
          onFocus={() => handleFocus("destination")}
          placeholder="Destination"
          isFocused={focusedField === "destination"}
          inputRef={destinationInputRef}
          leftIcon1="search"
          leftIcon1Color="black"
          leftIcon2="radiobox-marked"
          leftIcon2Color="#bbb"
          rightIcon1="close-circle"
          rightIcon1Color="#bbb"
          rightIcon2="map-marker-radius"
          rightIcon2Color={Colors.light.secondary}
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
