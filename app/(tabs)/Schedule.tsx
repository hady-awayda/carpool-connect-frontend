import UserSchedulesList from "@/components/scheduleScreenComponents/UserSchedulesList";
import { Colors, Typography } from "@/constants/Variables";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SchedulesScreen: React.FC = () => {
  const router = useRouter();

  const handleNavigationToNewSchedule = () => {
    router.navigate("/Home");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Schedules</Text>
        <TouchableOpacity
          style={styles.newButton}
          onPress={handleNavigationToNewSchedule}
        >
          <Text style={styles.newButtonText}>New</Text>
        </TouchableOpacity>
      </View>

      <UserSchedulesList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    ...Typography.heading,
  },
  newButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  newButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SchedulesScreen;
