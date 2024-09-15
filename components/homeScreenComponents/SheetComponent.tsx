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
};

const SheetComponent: React.FC<SheetComponentProps> = ({
  isSheetVisible,
  showRouteSheet,
  closeRouteSheet,
  destination,
  setDestination,
  departure,
}) => {
  return (
    <View style={styles.sheetContainer}>
      {isSheetVisible ? (
        <>
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
            <Text>{departure}</Text>
            <TextInput
              style={[styles.destinationInput, { borderColor: "#49E99C" }]}
              placeholder="Destination"
              value={destination}
              onChangeText={setDestination}
              autoFocus
            />
          </View>
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={showRouteSheet}
            style={styles.searchContainer}
          >
            <Ionicons name="search" size={24} />
            <TextInput
              style={styles.input}
              placeholder="Where to?"
              value={destination}
              onChangeText={setDestination}
            />
          </TouchableOpacity>
        </>
      )}
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
