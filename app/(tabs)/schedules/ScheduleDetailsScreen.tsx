import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import BoldButton from "../BoldButton";

const ScheduleDetails: React.FC = () => {
  const { id, schedule } = useLocalSearchParams();
  const scheduleData = JSON.parse(schedule);
  console.log(id);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text>From: {schedule.departureName}</Text>
        <Text>To: {schedule.destinationName}</Text>
        <Text>Departure Time: {schedule.departureTime}</Text>
        <Text>Arrival Time: {schedule.destinationTime}</Text>

        <BoldButton
          buttonText="Go to User Profile"
          onPress={() => navigation.navigate("UserProfile")}
        />
      </View>

      <View style={styles.mapSection}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: schedule.departureLat,
            longitude: schedule.departureLng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: schedule.departureLat,
              longitude: schedule.departureLng,
            }}
            title="Departure"
          />
          <Marker
            coordinate={{
              latitude: schedule.destinationLat,
              longitude: schedule.destinationLng,
            }}
            title="Destination"
          />
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
});

export default ScheduleDetails;
