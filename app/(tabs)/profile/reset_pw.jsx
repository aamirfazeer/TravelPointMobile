import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

const ForgotPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    // Implement reset password logic here
    console.log('Reset Password button pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>TravelPoint</Text>
        <View style={styles.formWrapper}>
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>Enter New Password</Text>

          <TextInput
            style={styles.input}
            placeholder="New Password"
            onChangeText={setNewPassword}
            value={newPassword}
            secureTextEntry={true}
            placeholderTextColor="#B0B0B0" // Light grey for placeholder
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry={true}
            placeholderTextColor="#B0B0B0" // Light grey for placeholder
          />

          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff', // Light background for the entire screen
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#083759',
    position: 'absolute', // Position the header absolutely
    top: 20, // Distance from the top
    left: 20, // Distance from the left
  },
  formWrapper: {
    width: '100%',
    maxWidth: 380, // Slightly smaller width for better fit
    padding: 20,
    backgroundColor: '#083759', // Blue background for the container
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5, // For Android shadow
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text color
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF', // White text color
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FFFFFF', // White border color
    borderRadius: 8,
    color: '#333333', // Dark grey text color
    backgroundColor: '#F5F5F5', // Light grey background for input fields
  },
  button: {
    backgroundColor: '#f05050', // Green color for the button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF', // White text for the button
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
