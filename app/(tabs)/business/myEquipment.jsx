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
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>{item.title}</Text>
                <FontAwesome name="star" size={16} color="gold" style={styles.icon} />
                <Text style={styles.rating}>{item.rating} ({item.reviews})</Text>
              </View>
              <Text style={styles.price}>Rs. {item.price} / day</Text>
            </View>
            <TouchableOpacity style={styles.arrowButton}>
              <FontAwesome name="arrow-right" size={20} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop:60
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
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
  title: {
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
  arrowButton: {
    padding: 10,
  },
});

export default myEquipment;
