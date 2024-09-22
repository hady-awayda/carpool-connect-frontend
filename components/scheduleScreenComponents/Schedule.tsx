import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BoldButton from "../BoldButton";
import UserSchedulesList from "./UserSchedulesList";
import { Colors, Typography } from "../../constants/Variables";

const SchedulesScreen: React.FC = () => {
  const router = useRouter();

  const handleNavigationToNewSchedule = () => {
    router.navigate("/Home");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Schedules</Text>

        <BoldButton
          onPress={handleNavigationToNewSchedule}
          buttonText="New"
          width={80}
          height={40}
          buttonStyle={{ backgroundColor: Colors.light.primary }}
        />
      </View>

      <UserSchedulesList />
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
