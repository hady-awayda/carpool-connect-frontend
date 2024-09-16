import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Typography } from "@/constants/Variables";

type DestinationFieldProps = {
  destination: string;
  setDestination: (text: string) => void;
  showRouteSheet: () => void;
};

const DestinationField: React.FC<DestinationFieldProps> = ({
  showRouteSheet,
}) => {
  return (
    <TouchableOpacity onPress={showRouteSheet}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color={Colors.light.text} />
        <Text style={styles.placeholderText}>{"Where to?"}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    padding: 12,
  },
  placeholderText: {
    marginLeft: 10,
    color: Colors.light.text,
    ...Typography.subheading,
  },
});

export default DestinationField;
