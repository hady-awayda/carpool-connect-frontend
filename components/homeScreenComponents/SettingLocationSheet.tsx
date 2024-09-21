import { Colors } from "@/constants/Variables";
import {
  setDeparture,
  setDestination,
} from "@/data/redux/addressListSlice/slice";
import { RootState } from "@/data/redux/store";
import { UIState } from "@/data/redux/UIStateSlice/slice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const { height } = Dimensions.get("window");

type SettingLocationSheetProps = {
  animateToState: (animateTo: UIState) => void;
};

const SettingLocationSheet: React.FC<SettingLocationSheetProps> = ({
  animateToState,
}) => {
  const uiState = useSelector((state: RootState) => state.uiState.uiState);
  const dispatch = useDispatch();
  const [locationOptions, setLocationOptions] = useState([]);

  const findPlaceByName = async (name: string) => {
    const encodedName = encodeURIComponent(name);
    const apiKey = "AIzaSyCzduXSDjg5mbh4txUTEVVu7LN1O53_fEc";
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodedName}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      if (data.status === "OK" && data.results.length > 0) {
        const places = data.results.map((item: any) => ({
          name: item.name,
          address: item.formatted_address,
          coords: {
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng,
            latitudeDelta: 0.004,
            longitudeDelta: 0.004,
          },
        }));
        setLocationOptions(places);
      } else {
        console.log("No results found.");
        setLocationOptions([]);
      }
    } catch (error) {
      console.error("Error fetching places:", error);
      setLocationOptions([]);
    }
  };

  const handleConfirmLocation = (place: any) => {
    if (uiState === "setting-departure") {
      dispatch(setDeparture({ name: place.name, coords: place.coords }));
    } else if (uiState === "setting-destination") {
      dispatch(setDestination({ name: place.name, coords: place.coords }));
    }
    animateToState("full");
  };

  useEffect(() => {
    findPlaceByName("Your Current Location");
  }, []);

  return (
    <Animated.View style={styles.sheetContainer}>
      <TouchableOpacity onPress={() => animateToState("full")}>
        <MaterialCommunityIcons
          name="close"
          size={24}
          color={Colors.light.text}
        />
      </TouchableOpacity>
      <Text style={styles.title}>
        {uiState === "setting-departure" ? "Set Departure" : "Set Destination"}
      </Text>

      {locationOptions.map((place, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleConfirmLocation(place)}
        >
          <Text style={styles.placeName}>{place.name}</Text>
          <Text style={styles.placeAddress}>{place.address}</Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    position: "absolute",
    top: 0,
    height: height * 0.7,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 20,
    zIndex: 3,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
    color: Colors.light.text,
  },
  placeName: {
    fontSize: 16,
    color: Colors.light.primary,
    marginVertical: 8,
  },
  placeAddress: {
    fontSize: 12,
    color: Colors.light.secondary,
  },
});

export default SettingLocationSheet;
