import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { images } from '../../../constants'

const ChangePW = () => {
  const [existingPassword, setExistingPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = () => {
    // Logic to change password (e.g., API call)
    if (newPassword === confirmPassword) {
      // Password change successful
      setExistingPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      // Passwords do not match
      alert('Passwords do not match');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>TravelPoint</Text>
      <View style={styles.profileCard}>
        <TextInput
          style={styles.input}
          placeholder="Existing Password"
          value={existingPassword}
          onChangeText={setExistingPassword}
          secureTextEntry
          marginBottom={10} // Add margin bottom
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          marginBottom={10} // Add margin bottom
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          marginBottom={20} // Add margin bottom
        />
        <TouchableOpacity style={styles.saveButton} onPress={handlePasswordChange}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'left',
  },
  profileCard: {
    width: '80%',
    backgroundColor: '#336699',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    height: 40,
  },
  saveButton: {
    backgroundColor: '#EE4235',
    borderRadius: 5,
    padding: 10,
    marginVertical: 20, // Add margin top and bottom
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ChangePW;