import BoldButton from "@/components/BoldButton";
import { Schedule } from "@/components/scheduleScreenComponents/ScheduleInterfaces";
import { Colors, Typography } from "@/constants/Variables";
import { useLocalSearchParams, useRouter, useSegments } from "expo-router";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Mapbox from "../../../components/Mapbox";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ScheduleDetails: React.FC = () => {
  const router = useRouter();
  const { id, schedule } = useLocalSearchParams();
  const currentTab = useSegments()[1];

  const scheduleData: Schedule = schedule
    ? JSON.parse(schedule as string)
    : null;

  const {
    userId,
    scheduleType,
    departureName = "Unknown",
    destinationName = "Unknown",
    departureTime,
    arrivalTime,
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={32}
            color={Colors.light.text}
          />
        </TouchableOpacity>
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
    gap: height / 128,
  },
  header: {
    marginTop: height / 40,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 28,
    paddingBottom: 10,
    backgroundColor: "#fff",
    width: width * 0.9,
  },
  title: {
    ...Typography.heading,
    marginLeft: width / 8,
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
});

export default ScheduleDetails;
