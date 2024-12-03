import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

const BorrowerDetailsForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [email, setEmail] = useState("");
  const { bookingType } = useLocalSearchParams()

  const fetchProfileData = async () => {
      const userId = await AsyncStorage.getItem("userId");

      if (userId) {
        axios
          .get(`http://10.0.2.2:8000/profile/${userId}`)
          .then((response) => {
            const { firstname, lastname, contactInfo, email } = response.data;

            setFirstname(firstname);
            setLastname(lastname);
            setContactInfo(contactInfo);
            setEmail(email);
          })
          .catch((error) => {
            console.error("Error fetching profile details:", error);
          });
      } else {
        Alert.alert("Error", "User ID not found");
      }
    };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleNext = async () => {
    try {
      const userType = await AsyncStorage.getItem("userType");

      if (bookingType) {
        switch (bookingType) {
          case "2":
            router.push("./bookingGuide");
            break;
          case "3":
            router.push("./bookingEquipment");
            break;
          case "4":
            router.push("./bookingVehicle");
            break;
          default:
            Alert.alert("Error", "Invalid user type");
            break;
        }
      } else {
        Alert.alert("Error", "User type not found");
      }
    } catch (error) {
      console.error("Error navigating to the next step:", error);
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
          <View style={[styles.progressBall, styles.inactiveProgressBall]}>
            <Text style={[styles.progressText, styles.inactiveText]}>2</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={[styles.progressBall, styles.inactiveProgressBall]}>
            <Text style={[styles.progressText, styles.inactiveText]}>3</Text>
          </View>
        </View>

        <Text style={styles.title}>Borrower Details</Text>

        {/* First Name Input */}
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your first name"
          value={firstname}
          onChangeText={(text) => setFirstName(text)}
        />

        {/* Last Name Input */}
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your last name"
          value={lastname}
          onChangeText={(text) => setLastName(text)}
        />

        {/* Phone Number Input */}
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.phoneNumberContainer}>
          <Text style={styles.countryCode}>+94</Text>
          <TextInput
            style={styles.phoneNumberInput}
            placeholder="Enter phone number"
            keyboardType="number-pad"
            value={contactInfo.toString()}
            onChangeText={(text) => setContactInfo(text)}
          />
        </View>

        {/* Email Input */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safecontainer:{
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
  phoneNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 5,
    color: "#555",
  },
  phoneNumberInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  
});

export default BorrowerDetailsForm;