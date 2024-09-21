import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

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

  console.log({ depLat, depLng, destLat, destLng });

  const formatTime = (time: Date) => {
    const date = new Date(time);
    return `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: (depLat + destLat) / 2,
            longitude: (depLng + destLng) / 2,
            latitudeDelta: 0.004,
            longitudeDelta: 0.004,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
        >
          <Marker
            coordinate={{ latitude: depLat, longitude: depLng }}
            title="Departure"
          />
          <Marker
            coordinate={{ latitude: destLat, longitude: destLng }}
            title="Destination"
          />
          <Polyline
            coordinates={[
              { latitude: depLat, longitude: depLng },
              { latitude: destLat, longitude: destLng },
            ]}
            strokeColor="#000"
            strokeWidth={3}
          />
        </MapView>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{scheduleType} Schedule</Text>
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
            <Text style={styles.text}>No schedule</Text>
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
