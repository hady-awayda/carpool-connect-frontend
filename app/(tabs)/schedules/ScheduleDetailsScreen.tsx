import BoldButton from "@/components/BoldButton";
import { Schedule } from "@/components/scheduleScreenComponents/ScheduleInterfaces";
import { Colors } from "@/constants/Variables";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { LatLng, Marker, Polyline } from "react-native-maps";

const ScheduleDetails: React.FC = () => {
  const { id, schedule } = useLocalSearchParams();

  const scheduleData: Schedule = schedule
    ? JSON.parse(schedule as string)
    : null;
  console.log(scheduleData.destinationLat, scheduleData.destinationLng);

  const [route, setRoute] = useState<LatLng[]>([]);

  const {
    scheduleType,
    departureName = "Unknown",
    destinationName = "Unknown",
    departureLat,
    departureLng,
    destinationLat,
    destinationLng,
    departureTime,
    arrivalTime,
    schedulePattern = [],
  } = scheduleData;

  const parseCoordinate = (value: string | number) => {
    const parsed = parseFloat(String(value));
    return isNaN(parsed) ? 0 : parsed;
  };

  const depLat = parseCoordinate(departureLat);
  const depLng = parseCoordinate(departureLng);
  const destLat = parseCoordinate(destinationLat);
  const destLng = parseCoordinate(destinationLng);

  const latitudeDelta = Math.abs(depLat - destLat) * 1.5;
  const longitudeDelta = Math.abs(depLng - destLng) * 1.5;

  const fetchRoute = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${depLat},${depLng}&destination=${destLat},${destLng}&key=${"AIzaSyCzduXSDjg5mbh4txUTEVVu7LN1O53_fEc"}`
      );
      const points = response.data.routes[0].overview_polyline.points;
      const decodedPoints = decodePolyline(points);
      setRoute(decodedPoints);
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  useEffect(() => {
    fetchRoute();
  }, [depLat, depLng, destLat, destLng]);

  const decodePolyline = (encoded: string): LatLng[] => {
    let points = [];
    let index = 0,
      len = encoded.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }

    return points;
  };

  const formatTime = (time: Date) => {
    const date = new Date(time);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${minutes} ${ampm}`;
  };

  if (!scheduleData) {
    return (
      <View style={styles.container}>
        <Text>Invalid schedule data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text>From: {departureName}</Text>
        <Text>To: {destinationName}</Text>
        <Text>Departure Time: {formatTime(departureTime)}</Text>
        <Text>Arrival Time: {formatTime(arrivalTime)}</Text>

        <BoldButton
          buttonText="Go to User Profile"
          onPress={() => console.log("Navigating to User Profile")}
        />
      </View>

      <View style={styles.mapSection}>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: (depLat + destLat) / 2,
              longitude: (depLng + destLng) / 2,
              latitudeDelta: latitudeDelta || 0.05,
              longitudeDelta: longitudeDelta || 0.05,
            }}
            scrollEnabled={true}
            zoomEnabled={true}
            customMapStyle={[
              {
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ]}
          >
            <Marker coordinate={{ latitude: depLat, longitude: depLng }}>
              <MaterialCommunityIcons
                name="map-marker"
                size={30}
                color={Colors.light.secondary}
              />
            </Marker>

            <Marker coordinate={{ latitude: destLat, longitude: destLng }}>
              <MaterialCommunityIcons
                name="map-marker"
                size={28}
                color={Colors.light.blue}
              />
            </Marker>
            {route.length > 0 && (
              <Polyline
                coordinates={route}
                strokeColor={Colors.light.primary}
                strokeWidth={3}
              />
            )}
          </MapView>
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  topSection: {
    flex: 1 / 3,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  mapSection: {
    flex: 2 / 3,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapContainer: {
    width: width * 0.9,
    height: width * 1.2,
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default ScheduleDetails;
