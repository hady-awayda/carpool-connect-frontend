import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const ridersData = [
  {
    id: '1',
    name: 'Mohamad Ibrahim',
    location: 'Nassif Al Yazgi, Beirut',
    gender: 'Male',
    age: 38,
    car: '2022 BMW 335i',
    color: 'Silver',
  },
  // Add more items as needed
];

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={ridersData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.riderItem}>
            <Text style={styles.riderName}>{item.name}</Text>
            <Text style={styles.riderDetails}>Location: {item.location}</Text>
            <Text style={styles.riderDetails}>Gender: {item.gender}, Age: {item.age}</Text>
            <Text style={styles.riderDetails}>Car: {item.car}, Color: {item.color}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  riderItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  riderName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  riderDetails: {
    fontSize: 16,
  },
});
