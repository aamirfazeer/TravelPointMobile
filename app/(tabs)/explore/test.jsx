// screens/SearchScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedTab, setSelectedTab] = useState('hotels');
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

  const handleInputChange = (text) => {
    setQuery(text);
    if (text) {
      const filtered = services.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase()) && item.type === selectedTab
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  const handleClearInput = () => {
    setQuery('');
    setFilteredData([]);
  };

  const handleSelect = (name) => {
    setQuery(name);
    setFilteredData([]);
    router.back();
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const renderTab = (tabName, displayName) => (
    <TouchableOpacity
      style={[styles.tab, selectedTab === tabName && styles.selectedTab]}
      onPress={() => setSelectedTab(tabName)}
    >
      <Text style={[styles.tabText, selectedTab === tabName && styles.selectedTabText]}>{displayName}</Text>
    </TouchableOpacity>
  );

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {renderTab('hotel', 'Hotels')}
        {renderTab('restaurant', 'Restaurants')}
        {renderTab('vehicle_rental', 'Vehicles')}
        {renderTab('equipment_rental', 'Travel Equipment')}
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={handleInputChange}
          placeholder={`Search ${selectedTab}`}
          ref={inputRef}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClearInput} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#ccc" />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleSelect(item.name)}>
            <Image source={images[item.type]} style={styles.profilePic} />
            <View style={styles.textContainer}>
              <Text style={styles.nameText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyboardShouldPersistTaps="always"
      />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
  },
  tab: {
    padding: 10,
    borderRadius: 5,
  },
  selectedTab: {
    backgroundColor: '#e0ffe0', // Light green background for selected tab
    borderBottomWidth: 2,
    borderBottomColor: '#00cc00', // Green bottom border for selected tab
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  selectedTabText: {
    color: '#00cc00', // Green text for selected tab
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  clearButton: {
    marginLeft: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#e0e0e0',
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
  },
});

export default SearchScreen;
