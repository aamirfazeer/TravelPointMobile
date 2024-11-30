import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { register } from "../services/auth.jsx";
import axios from "axios";

const EmailVerification = () => {
  const { email } = useLocalSearchParams();
  const [code, setCode] = useState("");

  const handleVerifyCode = async () => {
    console.log(code, email)
    try {
      const response = await register(email, code)
      if (response === 200) {
        router.push("/preference");
        Alert.alert("Success", "Account created successfully");
      } else {
        Alert.alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to create account");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email Verification</Text>

      <>
        <Text style={styles.label}>Enter the verification code</Text>
        <TextInput
          style={styles.input}
          placeholder="123456"
          keyboardType="number-pad"
          maxLength={6}
          value={code}
          onChangeText={setCode}
        />
        <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EmailVerification;
