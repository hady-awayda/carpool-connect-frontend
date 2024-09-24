import BoldButton from "@/components/BoldButton";
import Mapbox from "@/components/Mapbox";
import { ScheduleCardProps } from "@/components/scheduleScreenComponents/ScheduleInterfaces";
import { Colors, Typography } from "@/constants/Variables";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ScheduleCard = ({ scheduleData, onPress }: ScheduleCardProps) => {
  const {
    scheduleType,
    departureName = "Unknown",
    destinationName = "Unknown",
    departureTime,
    arrivalTime,
    isDefault,
    schedulePattern = [],
  } = scheduleData;

  const formatTime = (time: Date) => {
    const date = new Date(time);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${minutes} ${ampm}`;
  };

  const { width, height } = Dimensions.get("window");

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.card}
    >
      <View style={styles.mapContainer}>
        <Mapbox {...{ scheduleData: scheduleData, mapSize: "mini" }} />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {scheduleType[0].toUpperCase() + scheduleType.slice(1)}
          </Text>
          {isDefault && (
            <BoldButton
              buttonText="Main"
              width={width / 7}
              height={height / 34}
              buttonStyle={{ backgroundColor: Colors.light.primary }}
              textStyle={Typography.text2}
            />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.leftText}>From:</Text>
          <Text style={styles.text}>
            {departureName?.split(" ").slice(0, 3).join(" ")}
          </Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.leftText}>Departure:</Text>
          <Text style={styles.text}>{formatTime(departureTime)}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.leftText}>To:</Text>
          <Text style={styles.text}>
            {destinationName?.split(" ").slice(0, 3).join(" ")}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.leftText}>Arrival:</Text>
          <Text style={styles.text}>{formatTime(arrivalTime)}</Text>
        </View>
        <View style={styles.weekdayContainer}>
          {schedulePattern && schedulePattern.length > 0 ? (
            daysOfWeek.map((day, index) => (
              <View
                key={index}
                style={[
                  styles.dayCircle,
                  schedulePattern[index] && styles.highlightedDay,
                ]}
              >
                <Text style={styles.dayText}>{day}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.text}></Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get("window");

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
  mapContainer: {
    width: width / 2.75,
    height: width / 2.75,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 16,
    marginLeft: 2,
  },
  infoContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    ...Typography.subheading,
    marginBottom: 8,
    color: Colors.light.primary,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  leftText: {
    ...Typography.title,
    color: Colors.light.text,
  },
  text: {
    ...Typography.text,
    overflow: "hidden",
    height: 20,
  },
  weekdayContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  dayCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 3,
  },
  highlightedDay: {
    backgroundColor: "#4CAF50",
  },
  dayText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default ScheduleCard;
