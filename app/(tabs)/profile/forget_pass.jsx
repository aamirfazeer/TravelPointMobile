import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('ro***********@gmail.com');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TravelPoint</Text>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.description}>
          Please select your email address associated with your account to reset
          your password.
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            editable={false} // Make the input non-editable
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
    position: 'relative', // Enable positioning for header
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#083759',
    position: 'absolute', // Position the header absolutely
    top: 20, // Distance from the top
    left: 20, // Distance from the left
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 30,
    borderRadius: 15,
    backgroundColor: '#083759',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginTop: 100, // Add margin to push the container down from the top
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20, // Increase the margin to add space between title and description
  },
  description: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 30, // Add margin to provide space before the input fields
  },
  inputContainer: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#FFF',
    color: '#333',
    textAlign: 'center',
  },
});

export default ForgotPasswordScreen;
