import { fetchUserSchedules } from "@/data/remote/userSchedules/read";
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

const UserSchedulesList: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetchUserSchedules();
      setSchedules(response);
      setLoading(false);
      setRefreshing(false);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigateToScheduleDetails = (schedule: Schedule) => {
    router.push({
      pathname: "/(tabs)/schedules/ScheduleDetailsScreen",
      params: { id: schedule.id, schedule: JSON.stringify(schedule) },
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

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
        data={schedules.reverse()}
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
