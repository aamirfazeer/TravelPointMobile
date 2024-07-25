import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { images } from '../../../constants'
import { router } from 'expo-router';


const ProfileScreen = () => {
  const [firstName, setFirstName] = useState('Susan');
  const [lastName, setLastName] = useState('Sukumali');
  const [email, setEmail] = useState('susan89@gmail.com');
  const [editableField, setEditableField] = useState(null);
  const [changesSaved, setChangesSaved] = useState(false);

  const handleSaveChanges = () => {
    // Logic to save changes (e.g., API call)
    setChangesSaved(true);
    setEditableField(null);
    setTimeout(() => setChangesSaved(false), 2000); // Hide message after 2 seconds
  };

  const renderEditableTextInput = (value, onChangeText, fieldName) => {
    return editableField === fieldName ? (
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onBlur={() => setEditableField(null)}
        autoFocus
      />
    ) : (
      <TouchableOpacity onPress={() => setEditableField(fieldName)} style={styles.input}>
        <Text style={styles.inputText}>{value}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>TravelPoint</Text>
      <View style={styles.profileCard}>
        <Image
          source={images.profile1} 
          style={styles.profileImage}
        />
        {renderEditableTextInput(firstName, setFirstName, 'firstName')}
        {renderEditableTextInput(lastName, setLastName, 'lastName')}
        {renderEditableTextInput(email, setEmail, 'email')}
        <TouchableOpacity style={styles.changePasswordButton} onPress={() => router.push('/profile/change_pw')}>
          <Text style={styles.changePasswordText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        {changesSaved && <Text style={styles.savedText}>Changes Saved!</Text>}
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    height: 40, // Set a fixed height for both Text and TextInput
  },
  inputText: {
    color: '#000',
    lineHeight: 20, // Align the text vertically
    height: 20,
  },
  changePasswordButton: {
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  changePasswordText: {
    color: '#ffff',
  },
  saveButton: {
    backgroundColor: '#EE4235',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  savedText: {
    color: '#fff',
    marginTop: 20,
  },
});

export default ProfileScreen;