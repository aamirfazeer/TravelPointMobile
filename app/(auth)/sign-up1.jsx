import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import axios from "axios";

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nicPassport, setNicPassport] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const validateContactNumber = (number) => {
    const regex = /^[0-9]+$/;
    return regex.test(number);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignUp = async () => {
    if (
      !firstName ||
      !lastName ||
      !nicPassport ||
      !email ||
      !contactNumber ||
      !location ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (!validateContactNumber(contactNumber)) {
      Alert.alert("Error", "Please enter a valid contact number");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      Alert.alert("Error", "You must agree to the terms and conditions");
      return;
    }

    const userDetails = {
      firstName,
      lastName,
      nicPassport,
      email,
      contactNumber,
      location,
      password,
    };

    try {
      const response = await axios.post(
        "https://your-backend-endpoint.com/api/signup",
        userDetails
      );

      if (response.status === 200) {
        Alert.alert("Success", "Account created successfully");
        router.push("/preference");
      } else {
        Alert.alert("Error", response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to create account");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Set up your account</Text>
        <Text style={styles.subHeader}>
          Please complete all information to create an account on TravelPoint
        </Text>
        <View style={styles.inputContainer}>
          <Icon name="person" size={20} color="#444" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="person" size={20} color="#444" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="credit-card" size={20} color="#444" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="NIC / Passport Number"
            value={nicPassport}
            onChangeText={setNicPassport}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="#444" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="phone" size={20} color="#444" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            value={contactNumber}
            onChangeText={setContactNumber}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="location-on" size={20} color="#444" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#444" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#444" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={agreeTerms ? "checked" : "unchecked"}
            onPress={() => setAgreeTerms(!agreeTerms)}
            color="#00cc44"
          />
          <Text style={styles.checkboxLabel}>
            I agree to <Text style={styles.link}>Terms of Use</Text> and{" "}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, { opacity: agreeTerms ? 1 : 0.6 }]}
          onPress={handleSignUp}
          disabled={!agreeTerms}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 0,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
    color: "#666",
  },
  link: {
    color: "#1e90ff",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#00cc44",
    paddingVertical: 15,
    borderRadius: 34,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default SignUpScreen;