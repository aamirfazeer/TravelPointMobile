import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const TravelerBookings = () => {
  const [bookings, setBookings] = useState([]); // Default to an empty array
  const [filter, setFilter] = useState('all'); // 'all', 'equipment', 'vehicles', 'guides'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching with a timeout
    const dummyData = [
      {
        providerName: 'Mushahid Mohamad',
        providerContact: '0770093478',
        type: 'equipment',
        bookings: [
          {
            startDate: '2024-12-03',
            endDate: '2024-12-05',
            equipmentName: 'Tent',
            quantity: 2,
            price: 50,
          },
        ],
      },
      {
        providerName: 'Usama Fuward',
        providerContact: '+948765321',
        type: 'vehicles',
        bookings: [
          {
            startDate: '2024-12-02',
            endDate: '2024-12-07',
            vehicleName: 'SUV',
            seatingCapacity: 7,
            price: 200,
          },
        ],
      },
      {
        providerName: 'Aamir Fazeer',
        providerContact: '0719669348',
        type: 'guides',
        bookings: [
          {
            startDate: '2024-12-04',
            endDate: '2024-12-04',
            bookingType: 'group',
            isSingleDay: true,
            hours: 5,
          },
        ],
      },
    ];

    // Simulate an async operation
    setTimeout(() => {
      setBookings(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  const filterOptions = ['all', 'equipment', 'vehicles', 'guides'];

  const renderProviderDetails = ({ item }) => {
    const safeBookings = item.bookings || []; // Default to empty array if undefined

    return (
      <View style={styles.providerCard}>
        <Text style={styles.providerName}>{item.providerName || 'Unknown Provider'}</Text>
        <Text style={styles.contactText}>
          Contact: {item.providerContact || 'Not Available'}
        </Text>
        {safeBookings.length > 0 ? (
          safeBookings.map((booking, index) => (
            <View key={index} style={styles.bookingCard}>
              <Text style={styles.bookingText}>
                <Text style={styles.label}>Date Range: </Text>
                {booking.startDate || 'N/A'} - {booking.endDate || 'N/A'}
              </Text>
              {filter === 'equipment' && (
                <>
                  <Text style={styles.bookingText}>
                    <Text style={styles.label}>Equipment: </Text>
                    {booking.equipmentName || 'Unknown'} (Qty: {booking.quantity || 0})
                  </Text>
                  <Text style={styles.bookingText}>
                    <Text style={styles.label}>Price: </Text>${booking.price || 0}
                  </Text>
                </>
              )}
              {filter === 'vehicles' && (
                <>
                  <Text style={styles.bookingText}>
                    <Text style={styles.label}>Vehicle: </Text>
                    {booking.vehicleName || 'Unknown'} (Seating: {booking.seatingCapacity || 'N/A'})
                  </Text>
                  <Text style={styles.bookingText}>
                    <Text style={styles.label}>Price: </Text>${booking.price || 0}
                  </Text>
                </>
              )}
              {filter === 'guides' && (
                <>
                  <Text style={styles.bookingText}>
                    <Text style={styles.label}>Booking Type: </Text>
                    {booking.bookingType === 'individual' ? 'Individual' : 'Group'}
                  </Text>
                  {booking.isSingleDay && (
                    <Text style={styles.bookingText}>
                      <Text style={styles.label}>Hours: </Text>
                      {booking.hours || 'N/A'} hours
                    </Text>
                  )}
                </>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.noBookingText}>No bookings available.</Text>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00b300" />
      </View>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No bookings found.</Text>
      </View>
    );
  }

  const filteredBookings =
    filter === 'all'
      ? bookings
      : bookings.filter((item) => item.type === filter); // Safely filter data

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {filterOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.filterButton,
              filter === option && styles.filterButtonActive,
            ]}
            onPress={() => setFilter(option)}
          >
            <Text
              style={[
                styles.filterText,
                filter === option && styles.filterTextActive,
              ]}
            >
              {option === 'all'
                ? 'All Bookings'
                : option.charAt(0).toUpperCase() + option.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredBookings}
        keyExtractor={(item, index) => `${item.providerName || 'Unknown'}-${index}`}
        renderItem={renderProviderDetails}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', fontSize: 16 },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  filterButton: { padding: 10, borderRadius: 5 },
  filterButtonActive: { backgroundColor: '#00b300' },
  filterText: { color: '#000' },
  filterTextActive: { color: '#fff' },
  providerCard: { marginBottom: 15, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 8 },
  providerName: { fontSize: 18, fontWeight: 'bold' },
  contactText: { fontSize: 14, marginBottom: 10 },
  bookingCard: { padding: 10, backgroundColor: '#eaf4e7', borderRadius: 8, marginTop: 10 },
  bookingText: { fontSize: 14, marginBottom: 5 },
  noBookingText: { fontSize: 14, color: '#999', fontStyle: 'italic' },
  label: { fontWeight: 'bold' },
});

export default TravelerBookings;
