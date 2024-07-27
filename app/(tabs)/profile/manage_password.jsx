import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

const ManagePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match.');
    } else {
      // Handle password change logic here
      Alert.alert('Success', 'Password changed successfully.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Manage Password</Text>
      <Text style={styles.infoText}>Your password must be at least 6 characters</Text>
      
      <View style={styles.content}>
        <Text style={styles.label}>Current Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={!currentPasswordVisible}
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <TouchableOpacity onPress={() => setCurrentPasswordVisible(!currentPasswordVisible)}>
            <Icon name={currentPasswordVisible ? 'eye' : 'eye-off'} size={15} color="#666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push('/profile/forget_pass')} >
          <Text style={styles.forgotPassword}>Forgotten your password?</Text>
        </TouchableOpacity>

        <Text style={styles.label}>New Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={!newPasswordVisible}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity onPress={() => setNewPasswordVisible(!newPasswordVisible)}>
            <Icon name={newPasswordVisible ? 'eye' : 'eye-off'} size={15} color="#666" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Retype New Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={!confirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            <Icon name={confirmPasswordVisible ? 'eye' : 'eye-off'} size={15} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  infoText: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  content: {
    alignItems: 'flex-start',
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: 16,
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  forgotPassword: {
    color: '#0066cc',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#28a745',
    width: '75%',
    padding: 16,
    borderRadius: 34,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ManagePassword;
