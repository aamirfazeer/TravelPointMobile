import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images } from "../../../constants"
import { router } from "expo-router";

const businessPage = () => {
  return (
    <View style={styles.container}>
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
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    color: "#446482",
  },
  card: {
    width: "100%",
    marginBottom: 20,
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
});

export default businessPage;
