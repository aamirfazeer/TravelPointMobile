import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

const DeleteAccountScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleDelete = () => {
    // Handle account deletion logic here
    console.log('Deleting account...');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TravelPoint</Text>
      <Text style={styles.subtitle}>Delete Account</Text>
      <Text style={styles.description}>
        To delete your account, please confirm your password and re-enter your
        password.
      </Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor="#666"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#F8F8F8',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 40,
      color: '#333',
      textAlign: 'left', // Align left
    },
    subtitle: {
      fontSize: 24,
      fontWeight: '600',
      marginBottom: 15,
      color: '#333',
      textAlign: 'center', // Align left
    },
    description: {
      fontSize: 16,
      marginBottom: 25,
      color: '#666',
      textAlign: 'center',
    },
    formContainer: {
      backgroundColor: '#336699',
      padding: 30,
      borderRadius: 10,
      elevation: 5,
    },
    inputContainer: {
      marginBottom: 25,
    },
    input: {
      height: 50,
      borderColor: '#fff',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
      backgroundColor: '#fff',
      color: '#333',
    },
    button: {
      backgroundColor: '#E74C3C',
      padding: 10,
      borderRadius: 5,
      elevation: 3,
      width: 200,
      alignSelf: 'center',
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 18,
      fontWeight: '600',
    },
  });
  

export default DeleteAccountScreen;
