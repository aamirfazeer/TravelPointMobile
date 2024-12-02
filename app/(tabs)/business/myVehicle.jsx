import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { images } from '../../../constants';
import { router } from "expo-router";

const vehicles = [
  { name: 'BMW M3', price: 2750, rating: 4.8, reviews: 73, image: images.vehicle1 },
  { name: 'Toyota Hiace', price: 1000, rating: 4.2, reviews: 7, image: images.vehicle2 },
  { name: 'Suzuki Alto', price: 1500, rating: 3.6, reviews: 34, image: images.vehicle3 },
  { name: 'Honda Fit', price: 1500, rating: 4.2, reviews: 17, image: images.vehicle4 },
  { name: 'Nissan March', price: 2250, rating: 4.5, reviews: 9, image: images.vehicle5 },
  { name: 'Nissan Leaf', price: 2000, rating: 4.0, reviews: 24, image: images.vehicle1 },
];

const VehicleItem = ({ name, price, rating, reviews, image }) => (
  <View style={styles.vehicleItem}>
    <Image source={image} style={styles.vehicleImage} />
    <View style={styles.vehicleInfo}>
      <Text style={styles.vehicleName}>{name}</Text>
      <Text style={styles.vehiclePrice}>Rs. {price} / day</Text>
      <View style={styles.ratingContainer}>
        <Icon name="star" size={20} color="#ffcc00" />
        <Text style={styles.vehicleRating}>{rating} ({reviews})</Text>
      </View>
    </View>
    <View style={styles.actions}>
      <TouchableOpacity style={styles.actionButton} onPress={() => router.push("/business/vehicleDetails")}>
        <Icon name="arrow-forward" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={() => router.push("/business/editVehicle")}>
        <Icon name="edit" size={22} color="#000" marginTop={15} />
      </TouchableOpacity>
    </View>
  </View>
);

const VehicleList = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Vehicle</Text>
        <TouchableOpacity style={styles.addVehicleButton} onPress={() => router.push("/business/addVehicle")}>
          <Text style={styles.addVehicleText}>Add Vehicle</Text>
        </TouchableOpacity>
      </View>
      {vehicles.map((vehicle, index) => (
        <VehicleItem
          key={index}
          name={vehicle.name}
          price={vehicle.price}
          rating={vehicle.rating}
          reviews={vehicle.reviews}
          image={vehicle.image}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',  // Aligns title and button horizontally
    justifyContent: 'space-between',  // Ensures space between the buttons
    alignItems: 'center',
    marginBottom: 10,  // Reduced space between title and button
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,  // Reduced margin to make the gap smaller
    marginRight: 15,
  },
  addVehicleButton: {
    backgroundColor: '#00cc44',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight : 12,  // Adds a little space between buttons
  },
  addVehicleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  vehicleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  vehicleImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  vehicleInfo: {
    flex: 1,
    marginLeft: 16,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  vehiclePrice: {
    fontSize: 14,
    color: '#888',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  vehicleRating: {
    fontSize: 14,
    marginLeft: 4,
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 8,
  },
});

export default VehicleList;
