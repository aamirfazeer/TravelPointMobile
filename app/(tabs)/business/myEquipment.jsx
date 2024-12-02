import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

// Sample data
const items = [
  { id: '1', title: 'Gas Kettle', rating: 4.8, reviews: 73, price: 2750, image: 'https://via.placeholder.com/50' },
  { id: '2', title: 'Backpack', rating: 4.2, reviews: 7, price: 1000, image: 'https://via.placeholder.com/50' },
  { id: '3', title: 'Nightlight', rating: 3.6, reviews: 34, price: 1500, image: 'https://via.placeholder.com/50' },
  { id: '4', title: 'Camping Bag', rating: 4.2, reviews: 17, price: 1500, image: 'https://via.placeholder.com/50' },
  { id: '5', title: 'Gas Furnace', rating: 4.5, reviews: 9, price: 2250, image: 'https://via.placeholder.com/50' },
  { id: '6', title: 'Flashlight', rating: 4.0, reviews: 24, price: 2000, image: 'https://via.placeholder.com/50' },
];

const myEquipment = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Title */}
        <Text style={styles.headerTitle}>My Equipments</Text>
        
        {/* Add Equipment Button */}
        <TouchableOpacity style={styles.addButton} onPress={() => router.push("./addEquipment")}>
          <Text style={styles.addButtonText}>Add Equipment</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <View style={styles.titleRow}>
                <Text style={styles.titleText}>{item.title}</Text>
                <FontAwesome name="star" size={16} color="gold" style={styles.icon} />
                <Text style={styles.rating}>{item.rating} ({item.reviews})</Text>
              </View>
              <Text style={styles.price}>Rs. {item.price} / day</Text>
            </View>
            <View style={styles.actions}>
              {/* View Details Button */}
              <TouchableOpacity style={styles.arrowButton} onPress={() => router.push(`/business/equipmentDetails/${item.id}`)}>
                <FontAwesome name="arrow-right" size={20} color="black" />
              </TouchableOpacity>

              {/* Edit Icon Button */}
              <TouchableOpacity style={styles.editButton} onPress={() => router.push(`/business/editEquipment/${item.id}`)}>
                <FontAwesome name="edit" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fffff',  // Green background for header
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',  // Adding shadow for a more elevated look
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // White text for header
  },
  addButton: {
    backgroundColor: '#00b300',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 5,
    marginRight: 5,
  },
  rating: {
    fontSize: 16,
    color: '#666',
  },
  price: {
    fontSize: 16,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowButton: {
    padding: 10,
  },
  editButton: {
    padding: 10,
    marginLeft: 10,
  },
});

export default myEquipment;
