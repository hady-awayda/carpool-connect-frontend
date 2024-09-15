import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SheetComponentProps = {
  isSheetVisible: boolean;
  showRouteSheet: () => void;
  closeRouteSheet: () => void;
  destination: string;
  setDestination: (text: string) => void;
  departure: string;
  setDeparture: (text: string) => void;
};

const SheetComponent: React.FC<SheetComponentProps> = ({
  isSheetVisible,
  showRouteSheet,
  closeRouteSheet,
  destination,
  setDestination,
  departure,
  setDeparture,
}) => {
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
          style={[styles.destinationInput, { borderColor: "#49E99C" }]}
          placeholder="Destination"
          value={destination}
          onChangeText={setDestination}
          autoFocus
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    padding: 10,
  },
  input: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default SheetComponent;
