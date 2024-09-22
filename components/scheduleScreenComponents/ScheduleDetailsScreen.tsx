import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/native";
import BoldButton from "../BoldButton";
import { useNavigation } from "@react-navigation/native";

const ScheduleDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Top third: Schedule information */}
      <View style={styles.topSection}>
        <Text>From: {schedule.departureName}</Text>
        <Text>To: {schedule.destinationName}</Text>
        <Text>Departure Time: {schedule.departureTime}</Text>
        <Text>Arrival Time: {schedule.destinationTime}</Text>

        {/* Button to navigate to User Profile */}
        <BoldButton
          buttonText="Go to User Profile"
          onPress={() => navigation.navigate("UserProfile")}
        />
      </View>

      {/* Bottom two-thirds: Scrollable Map */}
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
