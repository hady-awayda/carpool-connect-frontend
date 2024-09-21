import UserSchedulesList from "@/components/scheduleScreenComponents/UserSchedulesList";
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
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  newButton: {
    backgroundColor: "#4CAF50",
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
