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
import { icons } from "../../../constants";

const findEquipment = () => {
  const equipments = [
    { label: "Equipment 1", value: "e1" },
    { label: "Equipment 2", value: "e2" },
    { label: "Equipment 3", value: "e3" },
  ];

  const location = [
    { label: "Location 1", value: "l1" },
    { label: "Location 2", value: "l2" },
    { label: "Location 3", value: "l3" },
  ];

  const [equipment, setEquipment] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    try {
      // const response = await axios.get("https://your-api-endpoint/equipment", {
      //   params: {
      //     equipment,
      //     location: selectedLocation,
      //     minPrice,
      //     maxPrice,
      //   },
      // });
      // console.log("Search Results:", response.data);
      router.push("/business/equipmentList");
    } catch (error) {
      console.error("Error fetching equipment:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find your Travel Equipment!</Text>
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <DropdownComponent
            data={equipments}
            placeholder={"Equipment"}
            onSelect={(value) => setEquipment(value)}
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

export default findEquipment;
