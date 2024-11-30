import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function AddLog() {
  const [initialLocation, setInitialLocation] = useState(null);
  const [moreLocations, setMoreLocations] = useState([]);
  const [finalLocation, setFinalLocation] = useState(null);

  const handleAddLocation = (location) => {
    setMoreLocations((prevLocations) => [...prevLocations, location]);
  };

  const handleRemoveLocation = (index) => {
    setMoreLocations((prevLocations) =>
      prevLocations.filter((_, i) => i !== index)
    );
  };

  const renderLocationPicker = (label, onLocationSelect) => (
    <>
      <Text style={styles.label}>{label}</Text>
      <GooglePlacesAutocomplete
        placeholder="Type to search location"
        onPress={(data, details = null) => {
          const locationData = {
            name: details.formatted_address,
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          };
          onLocationSelect(locationData);
        }}
        query={{
          key: "AIzaSyBR1ihl1Vc1y1PRMVe8ztvC2cyQBgVynqc",
          language: "en",
        }}
        fetchDetails={true}
        enablePoweredByContainer={false}
        styles={autocompleteStyles}
      />
    </>
  );

  return (
    <View style={styles.container}>
      {renderLocationPicker("Select Initial Location", setInitialLocation)}
      {initialLocation && (
        <Text style={styles.selectedText}>
          Selected: {initialLocation.name}
        </Text>
      )}

      <Text style={[styles.label, { marginTop: 20 }]}>Add More Locations</Text>
      <GooglePlacesAutocomplete
        placeholder="Search for more locations"
        onPress={(data, details = null) => {
          const locationData = {
            name: details.formatted_address,
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          };
          handleAddLocation(locationData);
        }}
        query={{
          key: "YOUR_GOOGLE_PLACES_API_KEY",
          language: "en",
        }}
        fetchDetails={true}
        enablePoweredByContainer={false}
        styles={autocompleteStyles}
      />
      <FlatList
        data={moreLocations}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.locationRow}>
            <Text style={styles.locationText}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleRemoveLocation(index)}>
              <Ionicons name="close-circle" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      {renderLocationPicker("Select Final Location", setFinalLocation)}
      {finalLocation && (
        <Text style={styles.selectedText}>Selected: {finalLocation.name}</Text>
      )}

      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => console.log("Done")}
      >
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  selectedText: {
    fontSize: 14,
    color: "#007BFF",
    marginTop: 5,
  },
  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  locationText: {
    fontSize: 16,
    color: "#333",
  },
  doneButton: {
    marginTop: 30,
    backgroundColor: "#00cc44",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

const autocompleteStyles = {
  textInput: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  container: {
    flex: 0,
    marginBottom: 10,
  },
};
