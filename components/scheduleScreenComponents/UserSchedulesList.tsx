import React from "react";
import { View, Button, FlatList, ActivityIndicator } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import ScheduleCard from "./ScheduleCard";
import { fetchUserSchedules } from "../../data/remote/userSchedules/read";

const UserSchedulesList = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ["userSchedules"],
    ({ pageParam = 0 }) => fetchUserSchedules({ pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? false,
    }
  );

  if (status === "loading") {
    return <ActivityIndicator size="large" />;
  }

  if (status === "error") {
    return <Text>Error: {error.message}</Text>;
  }

  const schedules = data?.pages.flatMap((page) => page.schedules);

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
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          isFetchingNextPage ? <ActivityIndicator size="large" /> : null
        }
      />
    </View>
  );
};

export default UserSchedulesList;
