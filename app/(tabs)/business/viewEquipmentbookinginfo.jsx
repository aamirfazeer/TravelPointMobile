import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';

const EquipmentViewInfo = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { bookingId } = route.params; // Get the booking ID passed from the previous page
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch booking details from the API
    axios
      .get(`https://your-api-url.com/equipment-bookings/${bookingId}`)
      .then((response) => {
        setBookingDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching booking details:", error);
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
      <Text style={styles.title}>Equipment Booking Info</Text>
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
        <Text style={styles.infoText}>
          <Text style={styles.label}>Booking Type: </Text>
          {bookingDetails.bookingType === 'single' ? 'Single Item' : 'Multiple Items'}
        </Text>
      </View>

      <Text style={styles.subtitle}>Equipment Booked</Text>
      <FlatList
        data={bookingDetails.items}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemText}>
              <Text style={styles.label}>Equipment: </Text>
              {item.name}
            </Text>
            <Text style={styles.itemText}>
              <Text style={styles.label}>Quantity: </Text>
              {item.quantity}
            </Text>
          </View>
        )}
      />

      {/* Back button aligned consistently */}
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
  backButton: {
    backgroundColor: '#00b300',
    padding: 15,
    borderRadius: 10,
    marginTop: 30, // Added consistent margin from the last item
    alignItems: 'center',
    position: 'absolute',
    bottom: 380, // Aligns the button near the bottom of the screen
    left: 20,
    right: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EquipmentViewInfo;
