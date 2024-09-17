import { Colors, Typography } from "@/constants/Variables";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

const LastDestinations = () => {
  return (
    <View style={styles.suggestions}>
      <View style={styles.suggestionItem}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="airplane" size={24} />
        </View>
        <Text style={styles.suggestionText}>
          Beirut Rafic Hariri Airport (BEY)
        </Text>
      </View>
      <View style={styles.suggestionItem}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="coffee-outline" size={24} />
        </View>
        <Text style={styles.suggestionText}>Hamra</Text>
      </View>
      <View style={styles.suggestionItem}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="shopping-outline" size={24} />
        </View>
        <Text style={styles.suggestionText}>City Centre Beirut</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  suggestions: {
    marginTop: 20,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: Colors.light.backgroundIcons,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  suggestionText: {
    color: Colors.light.text,
    ...Typography.body,
  },
});

export default LastDestinations;
