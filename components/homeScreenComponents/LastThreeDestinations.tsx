import { Colors, Typography } from "@/constants/Variables";
import { RootState } from "@/data/redux/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { MaterialCommunityIconsName } from "./AnimatedTextInput";
import { Address } from "./interfaces";

const defaultAddresses: Address[] = [
  {
    name: "Beirut Rafic Hariri Airport (BEY)",
    icon: "airplane",
  },
  {
    name: "Hamra",
    icon: "coffee-outline",
  },
  {
    name: "City Centre Beirut",
    icon: "shopping-outline",
  },
];

const getIconName = (name: string) => {
  if (name.toLowerCase().includes("airport")) {
    return "airplane";
  } else if (name.toLowerCase().includes("coffee")) {
    return "coffee-outline";
  } else if (name.toLowerCase().includes("shopping")) {
    return "shopping-outline";
  }
  return "map-marker";
};

const LastDestinations = () => {
  const addresses: Address[] = useSelector(
    (state: RootState) => state.address.addressList
  );

  const dataToRender: Address[] =
    addresses && addresses.length > 0 ? addresses : defaultAddresses;

  return (
    <View style={styles.suggestions}>
      {dataToRender.map((item, index) => (
        <View key={index} style={styles.suggestionItem}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={
                (item.icon as MaterialCommunityIconsName) ||
                getIconName(item.name)
              }
              size={24}
              color={Colors.light.text}
            />
          </View>
          <Text style={styles.suggestionText}>{item.name}</Text>
        </View>
      ))}
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
