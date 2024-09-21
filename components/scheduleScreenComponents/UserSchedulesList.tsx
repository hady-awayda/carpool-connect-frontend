import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Text, Alert } from "react-native";
import ScheduleCard from "./ScheduleCard";
import { Schedule } from "./Schedule";
import { fetchUserSchedules } from "@/data/remote/userSchedules/read";

const UserSchedulesList: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserSchedules();
        setSchedules(response.schedules);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

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
      />
    </View>
  );
};

export default UserSchedulesList;
