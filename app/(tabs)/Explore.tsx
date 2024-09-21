import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Rider = {
  id: string;
  name: string;
  location: string;
  gender: string;
  age: number;
  car: string;
  color: string;
};

const ridersData: Rider[] = [
  {
    id: "1",
    name: "Mohamad Ibrahim",
    location: "Nassif Al Yazgi, Beirut",
    gender: "Male",
    age: 38,
    car: "2022 BMW 335i",
    color: "Silver",
  },
];

const _onPress = (item: Rider) => {
  console.log(item);
};

const _renderItem = ({ item }: { item: Rider }) => (
  <TouchableOpacity style={styles.item} onPress={() => _onPress(item)}>
    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.details}>Location: {item.location}</Text>
    <Text style={styles.details}>Car: {item.car}</Text>
    <Text style={styles.details}>Color: {item.color}</Text>
  </TouchableOpacity>
);

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={ridersData}
        keyExtractor={(item) => item.id}
        renderItem={_renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  item: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
    color: "#555",
  },
});
