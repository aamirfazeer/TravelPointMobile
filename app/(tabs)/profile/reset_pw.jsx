import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const ForgotPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleResetPassword = () => {
    if (newPassword === confirmPassword) {
      // Implement reset password logic here
      console.log('Password reset successfully');
      router.push('/profile/settings');
    } else {
      console.log('Passwords do not match');
      // You can also add an alert or notification here to inform the user
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
  formWrapper: {
    width: '100%',
    maxWidth: 380, // Slightly smaller width for better fit
    padding: 20,
    backgroundColor: '#fff', // Blue background for the container
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#28a745',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5, // For Android shadow
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // White text color
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#000', // White text color
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#28a745', // White border color
    borderRadius: 8,
    color: '#333333', // Dark grey text color
    backgroundColor: '#F5F5F5', // Light grey background for input fields
  },
  button: {
    backgroundColor: '#28a745', // Green color for the button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
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
