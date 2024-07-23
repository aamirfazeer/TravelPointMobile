import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { images } from "../../../constants";
import { router } from "expo-router";

const equipmentList = () => {
  const equipments = [
    {
      id: 1,
      model: "Gas Kettle",
      rentPrice: "2,750",
      rating: 4.8,
      reviewCount: 73,
      profilePicture: images.equipment1,
    },
    {
      id: 2,
      model: "Backpack",
      rentPrice: "1,000",
      rating: 4.2,
      reviewCount: 7,
      profilePicture: images.equipment2,
    },
    {
      id: 3,
      model: "Nightlight",
      rentPrice: "1,500",
      rating: 3.6,
      reviewCount: 34,
      profilePicture: images.equipment3,
    },
    {
      id: 4,
      model: "Camping Bag",
      rentPrice: "1,500",
      rating: 4.2,
      reviewCount: 17,
      profilePicture: images.equipment4,
    },
    {
      id: 5,
      model: "Gas Furnace",
      rentPrice: "2,250",
      rating: 4.5,
      reviewCount: 9,
      profilePicture: images.equipment5,
    },
    {
      id: 6,
      model: "Flashlight",
      rentPrice: "1,000",
      rating: 4.0,
      reviewCount: 24,
      profilePicture: images.equipment6,
    },
  ];
  return <EquipmentList equipments={equipments} />;
};

const EquipmentList = ({ equipments }) => {
  return (
    <ScrollView style={styles.container}>
      {equipments.map((equipment) => (
        <View key={equipment.id} style={styles.equipmentCard}>
          <Image
            source={equipment.profilePicture}
            style={styles.profilePicture}
          />
          <View style={styles.equipmentInfo}>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={14} color="orange" />
              <Text style={styles.ratingText}>
                {equipment.rating} ({equipment.reviewCount})
              </Text>
            </View>
            <Text style={styles.equipmentModel}>{equipment.model}</Text>
            <Text style={styles.rentPrice}>
              Rs. {equipment.rentPrice} / day
            </Text>
          </View>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push("/business/equipmentDetails")}
          >
            <FontAwesome name="arrow-right" size={16} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="heart" size={16} color="black" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  equipmentCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#e2e8f0",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginHorizontal: 25,
    marginTop: 6,
    marginBottom: 16,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  equipmentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#4b5563",
  },
  equipmentModel: {
    fontSize: 18,
    fontWeight: "600",
  },
  rentPrice: {
    fontSize: 14,
    color: "#6b7280",
  },
  iconButton: {
    padding: 8,
  },
});

export default equipmentList;
