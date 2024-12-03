import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DropdownComponent from "../../../components/Dropdown";
import axios from "axios";
import { icons } from "../../../constants";

const findGuide = () => {
  const languages = [
    { label: "English", value: "en" },
    { label: "Sinhala", value: "sh" },
    { label: "Tamil", value: "tm" },
  ];

  const location = [
    { label: "Location 1", value: "l1" },
    { label: "Location 2", value: "l2" },
    { label: "Location 3", value: "l3" },
  ];

  const [language, setLanguage] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    // Validate price range
    if (!minPrice || !maxPrice || isNaN(minPrice) || isNaN(maxPrice) || Number(minPrice) > Number(maxPrice)) {
      setErrorMessage("Please enter a valid price range.");
      return;
    }

    // Clear error message if validation passes
    setErrorMessage("");
    try {
      router.push({ pathname: "/business/guideList", params: {
          language,
          location: selectedLocation,
          minPrice,
          maxPrice,
        }});
    } catch (error) {
      console.error("Error fetching guides:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find your Tour Guide!</Text>
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <DropdownComponent
            data={languages}
            placeholder={"Language"}
            onSelect={(value) => setLanguage(value)}
          />
          <DropdownComponent
            data={location}
            placeholder={"Location"}
            onSelect={(value) => setSelectedLocation(value)}
          />

          <Text style={styles.label}>Price Range</Text>
          <View style={styles.priceRangeContainer}>
            <TextInput
              style={[styles.textInput, styles.priceInput]}
              placeholder="Min Price"
              keyboardType="numeric"
              value={minPrice}
              onChangeText={(text) => setMinPrice(text)}
            />
            <Text style={styles.separator}>-</Text>
            <TextInput
              style={[styles.textInput, styles.priceInput]}
              placeholder="Max Price"
              keyboardType="numeric"
              value={maxPrice}
              onChangeText={(text) => setMaxPrice(text)}
            />
          </View>
        </View>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.goButton} onPress={handleSearch}>
            <Text style={styles.goButtonText}>Go</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "black",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 24,
    marginTop: 48,
    width: 320,
  },
  inputContainer: {
    marginBottom: 24,
    gap: 8,
  },
  label: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 8,
        color: "black",
      },
  priceRangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "gray",
    padding: 8,
  },
  textInput: {
    flex: 1,
    padding: 8,
    color: "gray",
  },
  priceInput: {
    flex: 0.5,
    textAlign: "center",
  },
  separator: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 8,
    color: "black",
  },
  buttonContainer: {
    alignItems: "center",
  },
  goButton: {
    borderRadius: 25,
    backgroundColor: "#06D001",
    padding: 12,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: "auto",
    width: 100,
  },
  goButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 8,
  },
});

export default findGuide;