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

const vehicleList = () => {
  const vehicles = [
    {
      id: 1,
      model: "BMW M3",
      rentPrice: "2,750",
      rating: 4.8,
      reviewCount: 73,
      profilePicture: images.vehicle1,
    },
    {
      id: 2,
      model: "Toyota Hiace",
      rentPrice: "1,000",
      rating: 4.2,
      reviewCount: 7,
      profilePicture: images.vehicle2,
    },
    {
      id: 3,
      model: "Suzuki Alto",
      rentPrice: "1,500",
      rating: 3.6,
      reviewCount: 34,
      profilePicture: images.vehicle3,
    },
    {
      id: 4,
      model: "Honda Fit",
      rentPrice: "1,500",
      rating: 4.2,
      reviewCount: 17,
      profilePicture: images.vehicle4,
    },
    {
      id: 5,
      model: "Nissan March",
      rentPrice: "2,250",
      rating: 4.5,
      reviewCount: 9,
      profilePicture: images.vehicle5,
    },
    {
      id: 6,
      model: "Nissan Leaf",
      rentPrice: "1,000",
      rating: 4.0,
      reviewCount: 24,
      profilePicture: images.vehicle6,
    },
  ];
  return <VehicleList vehicles={vehicles} />;
};

const VehicleList = ({ vehicles }) => {
  return (
    <ScrollView style={styles.container}>
      {vehicles.map((vehicle) => (
        <View key={vehicle.id} style={styles.vehicleCard}>
          <Image
            source={vehicle.profilePicture}
            style={styles.profilePicture}
          />
          <View style={styles.vehicleInfo}>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={14} color="orange" />
              <Text style={styles.ratingText}>
                {vehicle.rating} ({vehicle.reviewCount})
              </Text>
            </View>
            <Text style={styles.vehicleModel}>{vehicle.model}</Text>
            <Text style={styles.rentPrice}>Rs. {vehicle.rentPrice} / day</Text>
          </View>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push("/business/vehicleDetails")}
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
  vehicleCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#06D001",
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
  vehicleInfo: {
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
  vehicleModel: {
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

export default vehicleList;
