import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Typography } from "../../../constants/Variables";
import ConversationsList from "./ConversationsList";

const SchedulesScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>

      <ConversationsList />
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
