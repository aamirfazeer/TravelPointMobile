import React, {useState} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images } from "../../../constants"
import { router } from "expo-router";

const businessPage = ( ) => {
  const [selectedTab, setSelectedTab] = useState("index");

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
      <Text style={styles.title}>What are you looking for?</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/business/findGuide")}
      >
        <Image source={images.guide_} style={styles.image} />
        <Text style={styles.cardText}>Tour Guides</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/business/findVehicle")}
      >
        <Image source={images.vehicle_} style={styles.image} />
        <Text style={styles.cardText}>Vehicle Rentals</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/business/findEquipment")}
      >
        <Image source={images.equipment_} style={styles.image} />
        <Text style={styles.cardText}>Travel Equipments</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 35,
    color: "#3F7C9E",
  },
  card: {
    width: "100%",
    marginBottom: 25,
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 150,
    opacity: 0.75,
  },
  cardText: {
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    position: "absolute",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
    width: "100%",
    top: "73%",
    left: "14%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  tabContainer: {
    flexDirection: "row",
    borderRadius: 25,
    backgroundColor: "#5a7598",
    padding: 5,
    marginBottom: 24,
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

export default businessPage;
