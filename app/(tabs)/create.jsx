import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { images } from '../../constants';

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={images.person1}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Dia</Text>
        <Text style={styles.tagline}>Traveling is my therapy</Text>
      </View>
      
      <View style={styles.buttonsContainer}>
        <Button
          title="Follow"
          buttonStyle={styles.followButton}
        />
        <Button
          title="Message"
          buttonStyle={styles.messageButton}
        />
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>Logs</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.galleryContainer}>
        <Image source={images.travel1} style={styles.galleryImage} />
        <Image source={images.travel2} style={styles.galleryImage} />
        <Image source={images.travel3} style={styles.galleryImage} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#777',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  followButton: {
    backgroundColor: '#FF6347',
    width: 120,
  },
  messageButton: {
    backgroundColor: '#FF6347',
    width: 120,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  menuButton: {
    backgroundColor: '#2F4F4F',
    padding: 10,
    borderRadius: 20,
    width: 100,
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
  },
  galleryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  galleryImage: {
    width: '30%',
    height: 120,
    marginVertical: 10,
  },
});

export default ProfileScreen;


