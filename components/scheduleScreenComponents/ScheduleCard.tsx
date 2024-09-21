import { Colors } from "@/constants/Variables";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MapView, { LatLng, Marker, Polyline } from "react-native-maps";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type Schedule = {
  id: number;
  scheduleType: string;
  departureName?: string | null;
  destinationName?: string | null;
  departureLat: number;
  departureLng: number;
  destinationLat: number;
  destinationLng: number;
  departureTime: Date;
  arrivalTime: Date;
  schedulePattern?: boolean[] | null;
};

type ScheduleCardProps = {
  schedule: Schedule;
  onPress: () => void;
};

const ScheduleCard = ({ schedule, onPress }: ScheduleCardProps) => {
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
  } = schedule;

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
    return `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.card}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: (depLat + destLat) / 2,
            longitude: (depLng + destLng) / 2,
            latitudeDelta: latitudeDelta || 0.05,
            longitudeDelta: longitudeDelta || 0.05,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
        >
          <Marker coordinate={{ latitude: depLat, longitude: depLng }}>
            <MaterialCommunityIcons
              name="map-marker"
              size={30}
              color={Colors.light.primary}
            />
          </Marker>

          <Marker coordinate={{ latitude: destLat, longitude: destLng }}>
            <MaterialCommunityIcons
              name="map-marker"
              size={30}
              color={Colors.light.primary}
            />
          </Marker>
          {route.length > 0 && (
            <Polyline
              coordinates={route}
              strokeColor={Colors.light.secondary}
              strokeWidth={6}
            />
          )}
        </MapView>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{scheduleType}</Text>
        <Text style={styles.text}>From: {departureName}</Text>
        <Text style={styles.text}>To: {destinationName}</Text>
        <Text style={styles.text}>Departure: {formatTime(departureTime)}</Text>
        <Text style={styles.text}>Arrival: {formatTime(arrivalTime)}</Text>
        <View style={styles.weekdayContainer}>
          {schedulePattern && schedulePattern.length > 0 ? (
            daysOfWeek.map((day, index) => (
              <View
                key={index}
                style={[
                  styles.dayCircle,
                  schedulePattern[index] && styles.highlightedDay,
                ]}
              >
                <Text style={styles.dayText}>{day}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.text}></Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginVertical: 10,
    width: width - 40,
    height: 160,
    padding: 10,
    alignSelf: "center",
  },
  mapContainer: {
    width: 140,
    height: 140,
    borderRadius: 10,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    marginVertical: 2,
  },
  weekdayContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  dayCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 3,
  },
  highlightedDay: {
    backgroundColor: "#4CAF50",
  },
  dayText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default ScheduleCard;
