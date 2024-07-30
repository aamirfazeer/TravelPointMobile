import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  SafeAreaView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { images } from "../../../constants";
import MapView, { Marker, UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';



const data = [
  {
    username: "dehaaaaan.w",
    fullName: "Dehan Welihinda",
    profilePic: images.person1,
  },
  {
    username: "dilanii.perera",
    fullName: "Dilani Perera",
    profilePic: images.person2,
  },
  {
    username: "duxxa_",
    fullName: "Dushean Nelaka Gamage",
    profilePic: images.person3,
  },
  {
    username: "dssc.official",
    fullName: "D.S. Senanayake College",
    profilePic: images.person4,
  },
  {
    username: "dilsha.njay",
    fullName: "Dilshan Jayasinghe",
    profilePic: images.profile1,
  },
];

const services = [
  {
    id: 1,
    type: "hotel",
    latitude: 37.78825,
    longitude: -122.4324,
    name: "Hotel Example",
  },
  {
    id: 2,
    type: "restaurant",
    latitude: 37.78925,
    longitude: -122.4334,
    name: "Restaurant Example",
  },
  {
    id: 3,
    type: "vehicle_rental",
    latitude: 37.78725,
    longitude: -122.4344,
    name: "Vehicle Rental Example",
  },
  {
    id: 4,
    type: "equipment_rental",
    latitude: 37.78625,
    longitude: -122.4354,
    name: "Equipment Rental Example",
  },
];

const AutoCompleteSearchBar = () => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  const handleInputChange = (text) => {
    setQuery(text);
    if (text) {
      const filtered = data.filter((item) =>
        item.username.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  const handleClearInput = () => {
    setQuery("");
    setFilteredData([]);
  };

  const handleSelect = (username) => {
    setQuery(username);
    setFilteredData([]);
  };

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={handleInputChange}
          placeholder="Search"
        />
        {query.length > 0 && (
          <TouchableOpacity
            onPress={handleClearInput}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color="#ccc" />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.username}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleSelect(item.username)}
          >
            <Image source={item.profilePic} style={styles.profilePic} />
            <View style={styles.textContainer}>
              <Text style={styles.usernameText}>{item.username}</Text>
              <Text style={styles.fullNameText}>{item.fullName}</Text>
            </View>
          </TouchableOpacity>
        )}
        style={styles.resultsContainer}
        keyboardShouldPersistTaps="always"
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <UrlTile
          urlTemplate="https://api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{y}.png?key=GNm0ArrZEgJaGp4XHgMViE2E11PXa7G8"
          maximumZ={19}
        />
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="You are here"
          pinColor="blue"
        />
        {services.map((service) => (
          <Marker
            key={service.id}
            coordinate={{
              latitude: service.latitude,
              longitude: service.longitude,
            }}
            title={service.name}
            description={service.type}
            pinColor={
              service.type === "hotel"
                ? "red"
                : service.type === "restaurant"
                ? "green"
                : service.type === "vehicle_rental"
                ? "orange"
                : "purple"
            }
          />
        ))}
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  clearButton: {
    marginLeft: 10,
  },
  resultsContainer: {
    //marginTop: 10,
    maxHeight: 200,
    //position: "absolute",

  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#e0e0e0",
  },
  textContainer: {
    flex: 1,
  },
  usernameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  fullNameText: {
    fontSize: 14,
    color: "#888",
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height ,
    //flex: 1
  },
});

export default AutoCompleteSearchBar;
