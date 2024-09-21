import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  Alert,
  RefreshControl,
} from "react-native";
import ScheduleCard from "./ScheduleCard";
import { Schedule } from "./Schedule";
import { fetchUserSchedules } from "@/data/remote/userSchedules/read";

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

  useEffect(() => console.log(schedules), [schedules]);

  useEffect(() => {
    fetchData();
  }, []);

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
        data={schedules}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ScheduleCard
            schedule={item}
            onPress={() => console.log("Pressed schedule", item.id)}
          />
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
