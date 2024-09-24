import BorderedButton from "@/components/BorderedButton";
import { Schedule } from "@/components/scheduleScreenComponents/ScheduleInterfaces";
import { Colors, Typography } from "@/constants/Variables";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
import { setDefaultSchedule } from "@/data/remote/userSchedules/setDefault";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ScheduleDetails: React.FC = () => {
  const router = useRouter();
  const { schedule } = useLocalSearchParams();
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

  const handleProfileNavigation = (userId: number) => {
    router.push({
      pathname: "/(profiles)(userProfile)[id]",
      params: { id: userId, schedule: JSON.stringify(schedule) },
    });
  };

  const handleSetDefault = async () => {
    try {
      const res = await setDefaultSchedule(scheduleData.id);
      console.log(res);
    } catch (err) {
      console.log(err);
      alert("Failed to set default schedule");
    }
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
            size={28}
            color={Colors.light.text}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule Details</Text>
      </View>

      <View style={styles.scheduleCard}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>
            {scheduleType[0].toUpperCase() + scheduleType.slice(1)}
          </Text>
          <View>
            {currentTab === "explore" ? (
              <BorderedButton
                buttonText="User Profile"
                width={width / 4}
                height={height / 30}
                textStyle={{ ...Typography.text2 }}
                borderColor={Colors.light.secondary}
                textColor={Colors.light.secondary}
                onPress={() => handleProfileNavigation(userId)}
              />
            ) : (
              <BorderedButton
                buttonText="Set as Main"
                width={width / 4}
                height={height / 34}
                textStyle={Typography.text2}
                onPress={handleSetDefault}
              />
            )}
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.leftText}>From:</Text>
            <Text style={styles.text}>
              {departureName?.split(" ").slice(0, 3).join(" ")}
            </Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.leftText}>Departure:</Text>
            <Text style={styles.text}>{formatTime(departureTime)}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.leftText}>To:</Text>
            <Text style={styles.text}>
              {destinationName?.split(" ").slice(0, 3).join(" ")}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.leftText}>Arrival:</Text>
            <Text style={styles.text}>{formatTime(arrivalTime)}</Text>
          </View>
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
  headerTitle: {
    ...Typography.heading,
    marginLeft: width / 7.5,
  },
  scheduleCard: {
    height: height / 5,
    marginBottom: height / 200,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ddd",
    width: width * 0.95,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: width * 0.8,
    marginBottom: 4,
  },
  infoContainer: {
    flex: 1,
    width: width * 0.8,
  },
  title: {
    ...Typography.subheading,
    marginBottom: 12,
    color: Colors.light.primary,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  leftText: {
    ...Typography.title,
    color: Colors.light.text,
  },
  text: {
    ...Typography.text,
    overflow: "hidden",
    height: 20,
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

export default ScheduleDetails;
