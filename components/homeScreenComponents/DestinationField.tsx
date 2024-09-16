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
        <View style={styles.iconContainer}>
          <Ionicons name="search" size={22} color={Colors.light.text} />
        </View>
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
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: Colors.light.backgroundIcon,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    marginLeft: 10,
    color: Colors.light.text,
    ...Typography.subheading,
  },
});

export default DestinationField;
