import { findSchedules } from "@/data/remote/findSchedules/read";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { Schedule } from "../../../components/scheduleScreenComponents/ScheduleInterfaces";
import ScheduleCard from "./ScheduleCard";

type FindSchedulesProps = {
  schedules: Schedule[];
  loading: boolean;
  error: string | null;
  refreshing: boolean;
  onRefresh: () => void;
};

const UserSchedulesList: React.FC<FindSchedulesProps> = ({
  schedules,
  loading,
  error,
  refreshing,
  onRefresh,
}) => {
  const navigateToScheduleDetails = (schedule: Schedule) => {
    router.push({
      pathname: "/(tabs)/explore/ScheduleDetailsScreen",
      params: { id: schedule.id, schedule: JSON.stringify(schedule) },
    });
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    Alert.alert("Error", error);
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={schedules}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: 16 }}>
            <ScheduleCard
              scheduleData={item}
              onPress={() => navigateToScheduleDetails(item)}
            />
          </View>
        )}
        ListFooterComponent={() => (
          <Text style={{ textAlign: "center", padding: 10 }}>End of list</Text>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default UserSchedulesList;
