import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { images } from '../../../constants';
import { router } from "expo-router";

const data = [
  { id: '1', name: 'Mr. Manoj Kumar', dateRange: '2024.06.02 - 2024.06.08', status: 'View Info', image: images.p1 },
  { id: '2', name: 'Mr. Suresh Raina', dateRange: '2024.08.10 - 2024.08.13', status: 'View Info', image: images.p2 },
  { id: '3', name: 'Mr. Elliot', dateRange: '2024.07.28 - 2024.07.29', status: 'View Info', image: images.p3 },
  { id: '4', name: 'Mr. Sonia', dateRange: '2024.05.01 - 2024.05.03', status: 'Confirmed', image: images.p4 },
];

const BookingItem = ({ item }) => (
  <View style={styles.bookingItem}>
    <Image source={item.image} style={styles.avatar} />
    <View style={styles.info}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.dateRange}>{item.dateRange}</Text>
    </View>
    <TouchableOpacity style={[styles.button, item.status === 'Confirmed' ? styles.confirmedButton : styles.viewInfoButton]}>
      <Text style={styles.buttonText}>{item.status}</Text>
    </TouchableOpacity>
  </View>
);

const BookedEquipment = () => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>My Bookings</Text>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => router.push('/business/editGuidProfile')}
      >
        <Text style={styles.profileButtonText}>My Profile</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        renderItem={({ item }) => <BookingItem item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  </View>
);

export default function Equipment() {
  return (
    <View style={styles.container}>
      <BookedEquipment />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileButton: {
    backgroundColor: '#00cc44',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  profileButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
  },
  bookingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
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
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateRange: {
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
    backgroundColor: '#0f0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
