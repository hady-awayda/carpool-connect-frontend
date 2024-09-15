import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type DestinationFieldProps = {
  destination: string;
  setDestination: (text: string) => void;
  showRouteSheet: () => void;
};

const DestinationField: React.FC<DestinationFieldProps> = ({
  destination,
  setDestination,
  showRouteSheet,
}) => {
  return (
    <TouchableOpacity onPress={showRouteSheet}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} />
        <TextInput
          style={styles.input}
          placeholder="Where to?"
          value={destination}
          onChangeText={setDestination}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default DestinationField;
