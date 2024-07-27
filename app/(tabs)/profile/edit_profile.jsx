import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'; // Import the Feather library
import { images } from '../../../constants';

const EditProfile = () => {
  const [username, setUsername] = useState('Susan');
  const [email, setEmail] = useState('susan89@gmail.com');
  const [contactInfo, setContactInfo] = useState('+94778873878');
  const [dateOfBirth, setDateOfBirth] = useState('2001/11/21');
  const [editableField, setEditableField] = useState(null);
  const [changesSaved, setChangesSaved] = useState(false);

  const handleSaveChanges = () => {
    setChangesSaved(true);
    setEditableField(null);
    setTimeout(() => setChangesSaved(false), 2000);
  };

  const handleProfilePicChange = () => {
    // Logic to handle profile picture change
    alert('Change Profile Picture');
  };

  const renderEditableTextInput = (value, onChangeText, fieldName) => {
    return (
      <View style={styles.inputContainer}>
        {editableField === fieldName ? (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            onBlur={() => setEditableField(null)}
            autoFocus
          />
        ) : (
          <Text style={styles.inputText}>{value}</Text>
        )}
        <TouchableOpacity onPress={() => setEditableField(fieldName)} style={styles.editButton}>
          <Text>
            <Feather name="edit-2" size={14} color="black" />
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>TravelPoint</Text>
      <View style={styles.profileCard}>
        <View style={styles.profileImageContainer}>
          <Image
            source={images.person4} 
            style={styles.profileImage}
          />
          <TouchableOpacity onPress={handleProfilePicChange} style={styles.profilePicChangeButton}>
            <Feather name="plus" size={10} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Username</Text>
        {renderEditableTextInput(username, setUsername, 'username')}
        <Text style={styles.label}>Email Address</Text>
        {renderEditableTextInput(email, setEmail, 'email')}
        <Text style={styles.label}>Contact Info</Text>
        {renderEditableTextInput(contactInfo, setContactInfo, 'contactInfo')}
        <Text style={styles.label}>Date of Birth</Text>
        {renderEditableTextInput(dateOfBirth, setDateOfBirth, 'dateOfBirth')}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
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
  },
  profileCard: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  profilePicChangeButton: {
    position: 'absolute',
    bottom: 18,
    right: 5,
    backgroundColor: 'green',
    borderRadius: 15,
    padding: 5,
  },
  label: {
    width: '100%',
    textAlign: 'left',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    color: '#000',
  },
  inputText: {
    flex: 1,
    color: '#000',
  },
  editButton: {
    padding: 5,
  },
  saveButton: {
    backgroundColor: '#28a745',
    borderRadius: 34,
    padding: 10,
    marginVertical: 10,
    width: '75%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  savedText: {
    color: '#28a745',
    marginTop: 10,
  },
});

export default EditProfile;
