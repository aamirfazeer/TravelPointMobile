import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router, Link } from "expo-router";

const ProvideServiceScreen = () => {
  const [selectedTab, setSelectedTab] = useState("serviceProvider");

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    if (tab === "index") {
      router.push("/business");
    } else if (tab === "serviceProvider") {
      router.push("/business/serviceProvider");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "index" && styles.selectedTab,
          ]}
          onPress={() => handleTabPress("index")}
        >
          <Text style={styles.tabText}>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "serviceProvider" && styles.selectedTab,
          ]}
          onPress={() => handleTabPress("serviceProvider")}
        >
          <Text style={styles.tabText}>Service Provider</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Provide a Service</Text>
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 30,
  },
  title: {
    fontSize: 18,
    color: "#3F7C9E",
    marginBottom: 10,
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
  tabContainer: {
    flexDirection: "row",
    borderRadius: 25,
    backgroundColor: "#5a7598",
    padding: 5,
    marginBottom: 20,
    marginHorizontal: 50,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedTab: {
    margin: 2,
    backgroundColor: "#7c94b6",
  },
  tabText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProvideServiceScreen;
