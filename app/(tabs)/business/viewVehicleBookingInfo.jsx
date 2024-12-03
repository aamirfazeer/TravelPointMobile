import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';

const ViewInfoVehiclePage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { bookingId } = route.params; // Booking ID passed from the previous page
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch booking details from the API
    axios
      .get(`https://your-api-url.com/vehicle-bookings/${bookingId}`)
      .then((response) => {
        console.log('API Response:', response.data); // Debugging API response
        setBookingDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching booking details:', error);
        setLoading(false);
      });
  }, [bookingId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00b300" />
      </View>
    );
  }

  if (!bookingDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load booking details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehicle Booking Info</Text>
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Name: </Text>
          {bookingDetails.name}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Phone Number: </Text>
          {bookingDetails.phoneNumber}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Date Range: </Text>
          {bookingDetails.startDate} - {bookingDetails.endDate}
        </Text>
      </View>

      <View style={styles.vehicleInfoContainer}>
        <Text style={styles.subtitle}>Vehicles Booked</Text>
        {Array.isArray(bookingDetails.vehicles) && bookingDetails.vehicles.length > 0 ? (
          bookingDetails.vehicles.map((vehicle, index) => (
            <View key={`${vehicle.vehicleName}-${index}`} style={styles.itemCard}>
              <Text style={styles.itemText}>
                <Text style={styles.label}>Vehicle: </Text>
                {vehicle.vehicleName}
              </Text>
              <Text style={styles.itemText}>
                <Text style={styles.label}>Seating Capacity: </Text>
                {vehicle.seatingCapacity}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noVehiclesText}>No vehicles booked.</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back to Bookings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  vehicleInfoContainer: {
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemCard: {
    backgroundColor: '#E4FAE4',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
  noVehiclesText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#777',
  },
  backButton: {
    backgroundColor: '#00b300',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ViewInfoVehiclePage;
