import BoldButton from "@/components/BoldButton";
import { Schedule } from "@/components/scheduleScreenComponents/ScheduleInterfaces";
import { Typography } from "@/constants/Variables";
import { useLocalSearchParams, useSegments } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Mapbox from "../../../components/Mapbox";

const ScheduleDetails: React.FC = () => {
  const { id, schedule } = useLocalSearchParams();
  const currentTab = useSegments()[1];

  const scheduleData: Schedule = schedule
    ? JSON.parse(schedule as string)
    : null;

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
      <View>
        <Text style={styles.title}>Schedule Details</Text>
      </View>
      <View style={styles.scheduleCard}>
        <View>
          {currentTab !== "schedules" && (
            <BoldButton
              buttonText="Go to User Profile"
              onPress={() => console.log("Navigating to User Profile")}
            />
          )}
        </View>
        <View>
          <Text>From: {departureName}</Text>
          <Text>To: {destinationName}</Text>
          <Text>Departure Time: {formatTime(departureTime)}</Text>
          <Text>Arrival Time: {formatTime(arrivalTime)}</Text>
        </View>
      </View>

      <Mapbox {...{ scheduleData, mapSize: "normal" }} />
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: height / 30,
  },
  title: {
    marginTop: height / 16,
    ...Typography.heading,
  },
  scheduleCard: {
    height: height / 5,
    marginBottom: height / 200,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    width: width * 0.9,
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
