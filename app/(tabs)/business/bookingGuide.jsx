import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { router } from "expo-router";

const TourDetailsForm = () => {
  // const [tourType, setTourType] = useState("");
  const [numTravelers, setNumTravelers] = useState("");
  // const [startDate, setStartDate] = useState(new Date());
  //const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [duration, setDuration] = useState(""); // Selected duration
  const [isDurationModalVisible, setIsDurationModalVisible] = useState(false); // Modal visibility
  const [description, setDescription] = useState("");

  const durations = ["2 Hours", "Half-Day (6 hrs)", "Full-Day (12 hrs)"]; // Options for tour duration

  const handleProceedToPayment = async () => {
    const tourDetails = {
      tourType,
      numTravelers: parseInt(numTravelers, 10),
      startDate: startDate.toISOString().split("T")[0],
      duration,
      description,
    };

    try {
      const response = await axios.post(
        "http://10.0.2.2:8000/api/tour-details", // Replace with your backend endpoint
        tourDetails
      );

      if (response.status === 200 || response.status === 201) {
        Alert.alert("Success", "Tour details saved successfully!");
        navigation.navigate("PaymentPage", { tourDetails });
      } else {
        Alert.alert("Error", "Failed to save tour details. Try again.");
      }
    } catch (error) {
      console.error("Error submitting tour details:", error);
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

        <Text style={styles.title}>Tour Details</Text>

        {/* Tour Type */}
        {/* <Text style={styles.label}>Tour Type</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter tour type"
          value={tourType}
          onChangeText={(text) => setTourType(text)}
        /> */}

        {/* Number of Travelers */}
        <Text style={styles.label}>Number of Travelers</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number of travelers"
          keyboardType="number-pad"
          value={numTravelers}
          onChangeText={(text) => setNumTravelers(text)}
        />

        {/* Preferred Start Date */}
        {/* <Text style={styles.label}>Preferred Start Date</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowStartDatePicker(true)}
        >
          <Text>{startDate.toDateString()}</Text>
        </TouchableOpacity>
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowStartDatePicker(false);
              if (selectedDate) setStartDate(selectedDate);
            }}
          />
        )} */}

        {/* Tour Duration Dropdown */}
        <Text style={styles.label}>Tour Duration</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setIsDurationModalVisible(true)}
        >
          <Text>{duration || "Select duration"}</Text>
        </TouchableOpacity>

        {/* Modal for Tour Duration */}
        <Modal
          visible={isDurationModalVisible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <FlatList
                data={durations}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setDuration(item);
                      setIsDurationModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsDurationModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Special Instructions */}
        <Text style={styles.label}>Special Instructions/Requests</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter any special instructions or requests"
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline
          numberOfLines={4}
        />

        {/* Proceed to Payment Button */}
        <TouchableOpacity
          style={styles.nextButton}
          //onPress={handleProceedToPayment}
          onPress={() => router.push("/business/paymentProceedingsTour")}
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
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "80%",
    padding: 20,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalItemText: {
    fontSize: 16,
    fontWeight: "500",
  },
  closeButton: {
    marginTop: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#007BFF",
    fontWeight: "bold",
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
  progressLine: {
    width: 50,
    height: 5,
    backgroundColor: "#4CAF50",
    marginHorizontal: 5,
  },
});

export default TourDetailsForm;
