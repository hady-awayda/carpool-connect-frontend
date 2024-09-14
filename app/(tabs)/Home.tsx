import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function HomeTab() {
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState('');
  const [departure, setDeparture] = useState('');

  useEffect(() => {
    // Fetch user's current location logic here
    setLocation({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={location}>
        {location && <Marker coordinate={location} />}
      </MapView>
      <TextInput
        style={styles.input}
        placeholder="Where to?"
        value={destination}
        onChangeText={setDestination}
      />
      <Button title="Set Departure" onPress={() => console.log('Set Departure')} />
      <Button title="Schedule" onPress={() => console.log('Set Schedule')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
});
