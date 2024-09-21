import { Colors, Typography } from "@/constants/Variables";
import { RootState } from "@/data/redux/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIconsName } from "./AnimatedTextInput";
import { Address } from "./interfaces";
import {
  setDeparture,
  setDestination,
} from "@/data/redux/addressListSlice/slice";
import {
  setUIState,
  setFocusedField,
  UIState,
} from "@/data/redux/UIStateSlice/slice";

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

const LastDestinations = ({
  animateToState,
}: {
  animateToState: (state: UIState) => void;
}) => {
  const dispatch = useDispatch();

  const addresses: Address[] = useSelector(
    (state: RootState) => state.address.addressList
  );
  const departure = useSelector((state: RootState) => state.address.departure);
  const destination = useSelector(
    (state: RootState) => state.address.destination
  );
  const focusedField = useSelector(
    (state: RootState) => state.uiState.focusedField
  );
  const uiState = useSelector((state: RootState) => state.uiState.uiState);

  const dataToRender: Address[] =
    addresses && addresses.length > 0 ? addresses : defaultAddresses;

  const handleAddressPress = (item: Address) => {
    const locationData = {
      name: item.name,
      coords: null,
    };

    if (uiState === "expanded") {
      if (!destination.name) {
        dispatch(setDestination(locationData));
      }
      dispatch(setUIState("full"));
      return;
    }

    if (focusedField === "departure") {
      dispatch(setDeparture(locationData));
      if (!destination.name) {
        dispatch(setFocusedField("destination"));
      } else {
        animateToState("sheet-expanded");
      }
    } else if (focusedField === "destination") {
      dispatch(setDestination(locationData));
      if (!departure.name) {
        dispatch(setFocusedField("departure"));
      } else {
        animateToState("sheet-expanded");
      }
    }
  };

  return (
    <View style={styles.suggestions}>
      {dataToRender.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.suggestionItem}
          onPress={() => handleAddressPress(item)}
        >
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
        </TouchableOpacity>
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
