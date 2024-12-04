import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { router } from "expo-router";

const VehicleBookingForm = () => {
  const [pickupDate, setPickupDate] = useState(new Date());
  const [dropOffDate, setDropOffDate] = useState(new Date());
  const [showPickupDatePicker, setShowPickupDatePicker] = useState(false);
  const [showDropOffDatePicker, setShowDropOffDatePicker] = useState(false);
  const [specialRequests, setSpecialRequests] = useState("");

  const calculateRentalDays = () => {
    const differenceInTime = dropOffDate.getTime() - pickupDate.getTime();
    return Math.max(0, Math.ceil(differenceInTime / (1000 * 3600 * 24)));
  };

  const handleSubmitBooking = async () => {
    // if (!fullName || !contactNumber || !pickupLocation) {
    //   Alert.alert("Error", "Please fill all required fields!");
    //   return;
    // }

    // const bookingData = {
    //   //vehicleId: vehicleDetails.id, // Assuming vehicle ID is passed from the previous screen
    //   pickupDate: pickupDate.toISOString().split("T")[0],
    //   dropOffDate: dropOffDate.toISOString().split("T")[0],
    //   rentalDays: calculateRentalDays(),
    //   specialRequests,
    // };

    router.push("./bookingPayment")

    // try {
    //   const response = await axios.post(
    //     "http://10.0.2.2:8000/vehicle/api/book", // Replace with your backend API endpoint
    //     bookingData
    //   );

    //   if (response.status === 200 || response.status === 201) {
    //     Alert.alert("Success", "Vehicle booking successful!");
    //     navigation.navigate("BookingConfirmation", {
    //       bookingDetails: response.data,
    //     });
    //   } else {
    //     Alert.alert("Error", "Failed to book the vehicle. Please try again.");
    //   }
    // } catch (error) {
    //   console.error("Error submitting booking details:", error);
    //   Alert.alert("Error", "An error occurred while booking the vehicle.");
    // }
  };

  return (
    <View style={styles.safecontainer}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Booking Dates */}

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBall}>
            <Text style={styles.progressText}>1</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressBall}>
            <Text style={styles.progressText}>2</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={[styles.progressBall, styles.inactiveProgressBall]}>
            <Text style={[styles.progressText, styles.inactiveText]}>3</Text>
          </View>
        </View>
        <Text style={styles.title}>Booking Details</Text>
        <Text style={styles.label}>Pickup Date</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowPickupDatePicker(true)}
        >
          <Text>{pickupDate.toDateString()}</Text>
        </TouchableOpacity>
        {showPickupDatePicker && (
          <DateTimePicker
            value={pickupDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowPickupDatePicker(false);
              if (selectedDate) setPickupDate(selectedDate);
            }}
          />
        )}

        <Text style={styles.label}>Drop-off Date</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDropOffDatePicker(true)}
        >
          <Text>{dropOffDate.toDateString()}</Text>
        </TouchableOpacity>
        {showDropOffDatePicker && (
          <DateTimePicker
            value={dropOffDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDropOffDatePicker(false);
              if (selectedDate) setDropOffDate(selectedDate);
            }}
          />
        )}

        {/* Days Kept */}
        <Text style={styles.label}>Number of Days Kept</Text>
        <TextInput
          style={styles.input}
          editable={false}
          value={calculateRentalDays.toString()}
        />

        <Text style={styles.label}>Special Requests</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Any special requests or instructions?"
          multiline
          value={specialRequests}
          onChangeText={setSpecialRequests}
        />

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleSubmitBooking}
        >
          <Text style={styles.nextButtonText}>payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safecontainer: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: { fontSize: 16, marginBottom: 5 },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginVertical: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  nextButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  progressBall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
  },
  inactiveProgressBall: {
    backgroundColor: "#ccc",
  },
  progressText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  progressLine: {
    width: 50,
    height: 5,
    backgroundColor: "#4CAF50",
    marginHorizontal: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginVertical: 15,
  },
});

export default VehicleBookingForm;
