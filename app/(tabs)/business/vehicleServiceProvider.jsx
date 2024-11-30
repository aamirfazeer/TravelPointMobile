import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';

// Sample data
const bookingRequests = [
  {
    id: '1',
    customerName: 'Mr. Manoj Kumar',
    vehicleModel: 'Honda Civic',
    vehicleNumber: 'CAF 2334',
    status: 'View Info',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: '2',
    customerName: 'Mr. Suresh Raina',
    vehicleModel: 'Honda GL',
    vehicleNumber: 'CAO 4434',
    status: 'View Info',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: '3',
    customerName: 'Mr. Elliot',
    vehicleModel: 'Honda Civic',
    vehicleNumber: 'CAJ 4334',
    status: 'View Info',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: '4',
    customerName: 'Mr. Sonia',
    vehicleModel: 'Toyota Axio',
    vehicleNumber: 'CAD 2334',
    status: 'Confirmed',
    image: 'https://via.placeholder.com/50',
  },
];

const vehicleServiceProvider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add a Vehicle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/manage-vehicles')}
        >
          <Text style={styles.buttonText}>Manage Vehicles</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Booking Requests</Text>

      <FlatList
        data={bookingRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.customerName}</Text>
              <Text style={styles.vehicle}>
                {item.vehicleModel} - {item.vehicleNumber}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.statusButton,
                item.status === 'Confirmed'
                  ? styles.confirmed
                  : styles.viewInfo,
              ]}
            >
              <Text style={styles.statusText}>
                {item.status === 'Confirmed' ? 'Confirmed' : 'View Info'}
              </Text>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00b300',
    padding: 10,
    borderRadius: 10,
    marginTop: 40,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 15,
    textAlign: 'center',
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
  name: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  vehicle: {
    fontSize: 13,
    color: '#666',
  },
  statusButton: {
    padding: 10,
    borderRadius: 10,
  },
  viewInfo: {
    backgroundColor: '#007bff',
    width: 120,
    fontWeight: 'bold',
  },
  confirmed: {
    backgroundColor: '#28a745',
    width: 120,
    fontWeight: 'bold',
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default vehicleServiceProvider;
