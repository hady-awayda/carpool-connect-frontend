import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const scheduleData = [
  {
    id: '1',
    from: 'Achrafieh',
    to: 'Hadath',
    driver: 'Ahmad Maxi',
    carModel: 'Mercedes C63 AMG',
    plate: 'G 781264',
    year: '2014',
    color: 'Black',
    time: '17-8-2024 9:55 AM',
  },
  // Add more items as needed
];

export default function ScheduleScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={scheduleData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleText}>From: {item.from}</Text>
            <Text style={styles.scheduleText}>To: {item.to}</Text>
            <Text style={styles.scheduleText}>Driver: {item.driver}</Text>
            <Text style={styles.scheduleText}>Car Model: {item.carModel}</Text>
            <Text style={styles.scheduleText}>Plate #: {item.plate}</Text>
            <Text style={styles.scheduleText}>Year & Color: {item.year} {item.color}</Text>
            <Text style={styles.scheduleText}>Time: {item.time}</Text>
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
  },
  scheduleItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  scheduleText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
