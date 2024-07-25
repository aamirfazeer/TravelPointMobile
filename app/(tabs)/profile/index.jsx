import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';


const settings= () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TravelPoint</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/profile/edit_profile')} >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/profile/change_pw')}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/profile/privacy')}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#002d42',
    padding: 15,
    width: '80%',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default settings;
