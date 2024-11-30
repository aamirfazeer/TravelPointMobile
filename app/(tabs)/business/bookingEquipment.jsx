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

const EquipmentDetailsForm = () => {
  const [serviceDate, setServiceDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [showServiceDatePicker, setShowServiceDatePicker] = useState(false);
  const [showDeliveryDatePicker, setShowDeliveryDatePicker] = useState(false);
  const [numEquipments, setNumEquipments] = useState("");

  const calculateDaysKept = () => {
    const differenceInTime = deliveryDate.getTime() - serviceDate.getTime();
    return Math.max(0, Math.ceil(differenceInTime / (1000 * 3600 * 24)));
  };

  const handleProceedToPayment = async () => {
    const equipmentDetails = {
      serviceDate: serviceDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
      deliveryDate: deliveryDate.toISOString().split("T")[0],
      daysKept: calculateDaysKept(),
      numEquipments: parseInt(numEquipments, 10),
    };

    try {
      const response = await axios.post(
        "http://10.0.2.2:8000/user/api/equipment-details", // Replace with your backend endpoint
        equipmentDetails
      );

      if (response.status === 200 || response.status === 201) {
        Alert.alert("Success", "Equipment details saved successfully!");
        navigation.navigate("PaymentPage", { equipmentDetails });
      } else {
        Alert.alert("Error", "Failed to save equipment details. Try again.");
      }
    } catch (error) {
      console.error("Error submitting equipment details:", error);
      Alert.alert("Error", "An error occurred while submitting details.");
    }
  };

  return (
    <View style={styles.safecontainer}>
      <ScrollView contentContainerStyle={styles.container}>
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

        <Text style={styles.title}>Equipment Details</Text>

        {/* Service Date */}
        <Text style={styles.label}>Service Date</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowServiceDatePicker(true)}
        >
          <Text>{serviceDate.toDateString()}</Text>
        </TouchableOpacity>
        {showServiceDatePicker && (
          <DateTimePicker
            value={serviceDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowServiceDatePicker(false);
              if (selectedDate) setServiceDate(selectedDate);
            }}
          />
        )}

        {/* Delivery Date */}
        <Text style={styles.label}>Delivery Date</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDeliveryDatePicker(true)}
        >
          <Text>{deliveryDate.toDateString()}</Text>
        </TouchableOpacity>
        {showDeliveryDatePicker && (
          <DateTimePicker
            value={deliveryDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDeliveryDatePicker(false);
              if (selectedDate) setDeliveryDate(selectedDate);
            }}
          />
        )}

        {/* Days Kept */}
        <Text style={styles.label}>Number of Days Kept</Text>
        <TextInput
          style={styles.input}
          editable={false}
          value={calculateDaysKept().toString()}
        />

        {/* Number of Equipments */}
        <Text style={styles.label}>Number of Equipments</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number of equipments"
          keyboardType="number-pad"
          value={numEquipments}
          onChangeText={(text) => setNumEquipments(text)}
        />

        {/* Proceed to Payment Button */}
        <TouchableOpacity
          style={styles.nextButton}
          //onPress={handleProceedToPayment}
          onPress={() => router.push("./bookingPayment")}
        >
          <Text style={styles.nextButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </ScrollView>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
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
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
});

export default EquipmentDetailsForm;
