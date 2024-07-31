import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { images } from '../../../constants';

const data = [
  { id: '1', name: 'Mr. Manoj Kumar', car: 'Honda Civic - CAF 2334', status: 'View Info', image: images.p1 },
  { id: '2', name: 'Mr. Suresh Raina', car: 'Toyota GL - CAO 4434', status: 'View Info', image: images.p2 },
  { id: '3', name: 'Mr. Elliot', car: 'Honda Civic - CAJ 4334', status: 'View Info', image: images.p3 },
  { id: '4', name: 'Mr. Sonia', car: 'Toyota Axio - CAD 2334', status: 'Confirmed', image: images.p4 },
];

const BookingItem = ({ item }) => (
  <View style={styles.bookingItem}>
    <Image source={item.image} style={styles.avatar} />
    <View style={styles.info}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.car}>{item.car}</Text>
    </View>
    <TouchableOpacity style={[styles.button, item.status === 'Confirmed' ? styles.confirmedButton : styles.viewInfoButton]}>
      <Text style={styles.buttonText}>{item.status}</Text>
    </TouchableOpacity>
  </View>
);

const BookedVehicle = () => (
  <View style={styles.container}>
    <View style={styles.headerButtons}>
      <TouchableOpacity style={styles.headerButton} onPress={() => router.push("/business/addVehicle")}>
        <Text style={styles.headerButtonText}>Add a vehicle</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerButton} onPress={() => router.push("/business/manageVehicle")}>
        <Text style={styles.headerButtonText}>Manage Vehicles</Text>
      </TouchableOpacity>
    </View>
    <Text style={styles.title}>Booking Requests</Text>
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        renderItem={({ item }) => <BookingItem item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  </View>
);

export default function Vehicle() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome name="bars" style={styles.icon} />
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <FontAwesome name="bell" style={styles.icon} />
        </TouchableOpacity> */}
      </View>
      <BookedVehicle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 24,
    color: '#000',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerButton: {
    backgroundColor: '#00cc44',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  headerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignItems: 'center'
  },
  listContainer: {
    flex: 1,
  },
  bookingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  car: {
    fontSize: 14,
    color: '#888',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  viewInfoButton: {
    backgroundColor: '#00f',
  },
  confirmedButton: {
    backgroundColor: '#00cc44',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});