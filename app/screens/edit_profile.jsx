import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>TravelPoint</Text>
      <View style={styles.profileCard}>
        <Image
          source={{  }} 
          style={styles.profileImage}
        />
        <TextInput style={styles.input} placeholder="Susan" />
        <TextInput style={styles.input} placeholder="Sukumali" />
        <TextInput style={styles.input} placeholder="susan89@gmail.com" />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
        <Text style={styles.savedText}>Changes Saved!</Text>
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
  },
  button: {
    backgroundColor: '#445566',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  savedText: {
    color: '#fff',
    marginTop: 20,
  },
});

export default ProfileScreen;
