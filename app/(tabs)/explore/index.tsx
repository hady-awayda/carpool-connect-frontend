import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Typography } from "../../../constants/Variables";
import BoldButton from "../../../components/BoldButton";
import UserSchedulesList from "./SchedulesListScreen";
import { useState } from "react";

const SchedulesScreen: React.FC = () => {
  const [departureTimeFlexibility, setDepartureTimeFlexibility] =
    useState<number>(0.5);
  const [destinationTimeFlexibility, setDestinationTimeFlexibility] =
    useState<number>(0.5);
  const [departureDistanceProximity, setDepartureDistanceProximity] =
    useState<number>(1);
  const [destinationDistanceProximity, setDestinationDistanceProximity] =
    useState<number>(1);

  const handleFilters = () => {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Schedules</Text>

        <BoldButton
          onPress={handleFilters}
          buttonText="Filters"
          width={80}
          height={40}
          buttonStyle={{ backgroundColor: Colors.light.primary }}
        />
      </View>

      <UserSchedulesList
        {...{
          departureTimeFlexibility,
          destinationTimeFlexibility,
          departureDistanceProximity,
          destinationDistanceProximity,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  title: {
    ...Typography.heading,
  },
});

export default SchedulesScreen;
