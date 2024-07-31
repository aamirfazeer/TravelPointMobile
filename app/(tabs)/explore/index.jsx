// screens/SearchScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, Text, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { images } from "../../../constants";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';


const data = {
  hotels: [
    { name: 'Hotel A', profilePic: images.travel1 },
    { name: 'Hotel B', profilePic: images.travel2 },
  ],
  vehicles: [
    { name: 'Car A', profilePic: images.vehicle2 },
    { name: 'Car B', profilePic: images.vehicle1},
  ],
  travelEquipment: [
    { name: 'Backpack', profilePic: images.equipment1 },
    { name: 'Tent', profilePic: images.equipment2 },
  ],
};
const services = [
    { id: 1, type: 'hotel', latitude: 6.9021, longitude: 79.8640, name: 'Star Hotel' },
    { id: 2, type: 'restaurant', latitude: 6.9024, longitude: 79.8655, name: 'the upward' },
    { id: 3, type: 'vehicle_rental', latitude: 6.9026, longitude: 79.8665, name: 'rentit' },
    { id: 4, type: 'equipment_rental', latitude: 6.9029, longitude: 79.8630, name: 'equpify' },
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
      const filtered = data[selectedTab].filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
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
      <View style={styles.tabContainer}>
        {renderTab('hotels', 'Hotels')}
        {renderTab('vehicles', 'Vehicles')}
        {renderTab('travelEquipment', 'Travel Equipment')}
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleSelect(item.name)}>
            <Image source={item.profilePic} style={styles.profilePic} />
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
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    paddingVertical: 0,
  },
  tab: {
    padding: 10,
  },
  selectedTab: {
    backgroundColor: '#e0ffe0',
    borderBottomWidth: 2,
    borderBottomColor: '#00cc00',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  selectedTabText: {
    color: '#00cc00',
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
    //flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height ,
    //width: "100%",
    //height:"60%"
    //position: "absolute",
    //top: 0,
    //left: 0,
    //right: 0,
    //bottom: 0,
    
  },
});

export default SearchScreen;
