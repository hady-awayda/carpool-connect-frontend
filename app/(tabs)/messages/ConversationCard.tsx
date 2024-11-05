import { Colors } from "@/constants/Variables";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";

const ConversationCard = (conversation: any) => {
  const navigateToConversation = (conversation: any) => {
    router.push({
      pathname: "/(tabs)/schedules/ScheduleDetailsScreen",
      params: { id: conversation.id, schedule: JSON.stringify(conversation) },
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => navigateToConversation(conversation)}
      style={styles.card}
    >
      Conversation
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderColor: Colors.light.backgroundIcon,
    borderBottomWidth: 1,
    width: "100%",
    paddingBottom: 0,
    paddingTop: 12,
    alignSelf: "center",
  },
});
export default ConversationCard;
