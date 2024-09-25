import Filter from "@/components/exploreScreenComponents/Filter";
import { Schedule } from "@/components/scheduleScreenComponents/ScheduleInterfaces";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BoldButton from "../../../components/BoldButton";
import { Colors, Typography } from "../../../constants/Variables";
import UserSchedulesList from "./SchedulesListScreen";
import { findSchedules } from "@/data/remote/findSchedules/read";

const SchedulesScreen: React.FC = () => {
  const [departureTimeFlexibility, setDepartureTimeFlexibility] =
    useState<number>(0.5);
  const [destinationTimeFlexibility, setDestinationTimeFlexibility] =
    useState<number>(0.5);
  const [departureDistanceProximity, setDepartureDistanceProximity] =
    useState<number>(1);
  const [destinationDistanceProximity, setDestinationDistanceProximity] =
    useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      const response = await findSchedules(
        departureTimeFlexibility,
        destinationTimeFlexibility,
        departureDistanceProximity,
        destinationDistanceProximity,
        undefined
      );
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

  const onClose = () => {
    setIsOpen(false);
  };

  const handleApplyFilters = () => {
    setIsOpen(false);
    fetchData();
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData(true);
  }, [
    departureTimeFlexibility,
    destinationTimeFlexibility,
    departureDistanceProximity,
    destinationDistanceProximity,
  ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Schedules</Text>
        <BoldButton
          onPress={() => setIsOpen(true)}
          buttonText="Filters"
          width={80}
          height={40}
          buttonStyle={{ backgroundColor: Colors.light.primary }}
        />
        <Filter
          {...{
            isOpen,
            onClose,
            setDepartureTimeFlexibility,
            setDestinationTimeFlexibility,
            setDepartureDistanceProximity,
            setDestinationDistanceProximity,
            onApply: handleApplyFilters,
          }}
        />
      </View>

      <UserSchedulesList
        {...{
          schedules,
          loading,
          error,
          refreshing,
          onRefresh: handleRefresh,
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
