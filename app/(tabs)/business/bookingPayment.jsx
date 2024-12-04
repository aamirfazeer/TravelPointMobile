import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; // For selecting expiry date
import { Redirect, router } from "expo-router";

const PaymentPage = ({ navigation, route }) => {
  //const { equipmentDetails } = route.params;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Credit/Debit Card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [cvv, setCvv] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [upiId, setUpiId] = useState("");

  const handleCompleteBooking = async () => {
    // const paymentData = {
    //   equipmentDetails,
    //   paymentMethod: selectedPaymentMethod,
    //   paymentDetails:
    //     selectedPaymentMethod === "Credit/Debit Card"
    //       ? { cardNumber, expiryDate, cvv }
    //       : { upiId },
    // };

    // try {
    //   const response = await axios.post(
    //     "http://your-backend-url.com/api/complete-booking",
    //     paymentData
    //   );

    //   if (response.status === 200 || response.status === 201) {
    //     Alert.alert("Success", "Booking completed successfully!");
    //     navigation.navigate("ConfirmationPage");
    //   } else {
    //     Alert.alert("Error", "Payment failed. Please try again.");
    //   }
    // } catch (error) {
    //   console.error("Error completing booking:", error);
    //   Alert.alert("Error", "An error occurred during payment.");
    // }
    Alert.alert("Success", "Booking Confirmed!");
    router.push("./business");
  };

  return (
    <View style={styles.safecontainer}>
      <View style={styles.container}>
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
          <View style={styles.progressBall}>
            <Text style={styles.progressText}>3</Text>
          </View>
        </View>

        {/* Booking Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Book Now</Text>
          <Text style={styles.summaryPrice}>Rs. 4500.00</Text>
          <TouchableOpacity>
            <Text style={styles.cancellationPolicy}>
              See Cancellation Policy
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.paymentTitle}>Pay With:</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              selectedPaymentMethod === "Credit/Debit Card" &&
                styles.radioButtonSelected,
            ]}
            onPress={() => setSelectedPaymentMethod("Credit/Debit Card")}
          >
            <Text style={styles.radioLabel}>Credit/Debit Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioButton,
              selectedPaymentMethod === "Cash Pay" &&
                styles.radioButtonSelected,
            ]}
            onPress={() => setSelectedPaymentMethod("Cash Pay")}
          >
            <Text style={styles.radioLabel}>Cash Pay</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.completeButton}
          onPress={handleCompleteBooking}
        >
          <Text style={styles.completeButtonText}>Complete Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safecontainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
  },
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
    inactiveText: {
    color: "#666",
    },
    progressLine: {
    width: 50,
    height: 5,
    backgroundColor: "#4CAF50",
    marginHorizontal: 5,
    },
    summarySection: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
    },
    summaryTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    },
    summaryPrice: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#28a745",
    marginBottom: 10,
    },
    cancellationPolicy: {
    color: "#007bff",
    textDecorationLine: "underline",
    },
  paymentTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 10,
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: "#28a745",
    borderColor: "#28a745",
  },
  radioLabel: {
    fontSize: 14,
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  completeButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  completeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PaymentPage;