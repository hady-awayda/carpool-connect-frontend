import { Colors, Typography } from "@/constants/Variables";
import {
  setDeparture,
  setDestination,
} from "@/data/redux/addressListSlice/slice";
import { RootState } from "@/data/redux/store";
import { setFocusedField, UIState } from "@/data/redux/UIStateSlice/slice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIconsName } from "./AnimatedTextInput";
import { Address } from "./interfaces";

const defaultAddresses: Address[] = [
  {
    name: "Beirut Rafic Hariri Airport (BEY)",
    icon: "airplane",
    coords: {
      latitude: 33.82627465906504,
      longitude: 35.492483507841825,
      latitudeDelta: 0.004,
      longitudeDelta: 0.004,
    },
  },
  {
    name: "Hamra",
    icon: "coffee-outline",
    coords: {
      latitude: 33.896242816294034,
      longitude: 35.483034420758486,
      latitudeDelta: 0.004,
      longitudeDelta: 0.004,
    },
  },
  {
    name: "City Centre Beirut",
    icon: "shopping-outline",
    coords: {
      latitude: 33.8532428,
      longitude: 35.5340779,
      latitudeDelta: 0.004,
      longitudeDelta: 0.004,
    },
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
      coords: item.coords,
    };

    if (uiState === "expanded") {
      dispatch(setDestination(locationData));
      animateToState("full");
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
    ...Typography.text,
    fontSize: 16,
  },
});

export default LastDestinations;
