import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SheetComponentProps = {
  closeRouteSheet: () => void;
  destination: string;
  setDestination: (text: string) => void;
  departure: string;
  setDeparture: (text: string) => void;
  destinationInputRef: React.RefObject<TextInput>;
};

const SheetComponent: React.FC<SheetComponentProps> = ({
  closeRouteSheet,
  destination,
  setDestination,
  departure,
  setDeparture,
  destinationInputRef,
}) => {
  useEffect(() => {
    if (destinationInputRef && destinationInputRef.current) {
      destinationInputRef.current.focus();
    }
  }, []);

  return (
    <View style={styles.sheetContainer}>
      <View style={styles.routeHeader}>
        <TouchableOpacity onPress={closeRouteSheet}>
          <Ionicons name="close" size={24} />
        </TouchableOpacity>
        <Text style={styles.routeTitle}>Your route</Text>
        <TouchableOpacity>
          <Ionicons name="add" size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.routeDetails}>
        <TextInput
          style={[styles.destinationInput, { borderColor: "#49E99C" }]}
          placeholder="Departure"
          value={departure}
          onChangeText={setDeparture}
        />
        <TextInput
          ref={destinationInputRef}
          style={[styles.destinationInput, { borderColor: "#49E99C" }]}
          placeholder="Destination"
          value={destination}
          onChangeText={setDestination}
          autoFocus={false}
        />
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
  destinationInput: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
});

export default SheetComponent;
