import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router, Link } from "expo-router";

const ProvideServiceScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.subHeaderText}>Provide a Service</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/business/guideForm")}
      >
        <Text style={styles.buttonText}>Be a Tour Guide</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/business/vehicleForm")}
      >
        <Text style={styles.buttonText}>Rent Out Vehicles</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/business/equipmentForm")}
      >
        <Text style={styles.buttonText}>Rent Out Equipment</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/business/authorityForm")}
      >
        <Text style={styles.buttonText}>Other</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 25,
  },
  subHeaderText: {
    fontSize: 18,
    color: "#3F7C9E",
    marginBottom: 35,
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    backgroundColor: "#002F43",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 35,
    margin: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default ProvideServiceScreen;
