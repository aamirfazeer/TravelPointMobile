// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { images } from "../../../constants";


const services = [
  { id: 1, type: 'hotel', latitude: 6.9022, longitude: 79.8640, name: 'Hotel Example' },
  { id: 2, type: 'restaurant', latitude: 37.78925, longitude: -122.4334, name: 'Restaurant Example' },
  { id: 3, type: 'vehicle_rental', latitude: 37.78725, longitude: -122.4344, name: 'Vehicle Rental Example' },
  { id: 4, type: 'equipment_rental', latitude: 37.78625, longitude: -122.4354, name: 'Equipment Rental Example' },
];

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.searchContainer} onPress={() => router.push({ pathname: '../explore/search', params: { autoFocus: true } })}>
        <TextInput
          style={styles.input}
          placeholder="Search Other Travellers"
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
       // provider='default'
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >

        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="You are here"
          pinColor="blue"
        />
        {services.map(service => (
          <Marker
            key={service.id}
            coordinate={{
              latitude: service.latitude,
              longitude: service.longitude,
            }}
            title={service.name}
            description={service.type}
            pinColor={service.type === 'hotel' ? 'red' : service.type === 'restaurant' ? 'green' : service.type === 'vehicle_rental' ? 'orange' : 'purple'}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  map: {
    flex: 1,
  },
});

export default HomeScreen;
