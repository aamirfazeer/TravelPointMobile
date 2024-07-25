import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function TravelPoint() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tabButton, styles.selectedTab]} onPress={()=>router.push('/create/add_story')}>
            <Text style={styles.tabText}>Story</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton} onPress={()=>router.push('/create')}>
            <Text style={styles.tabText}>Post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton} onPress={()=>router.push('/create/add_log')}>
            <Text style={styles.tabText}>Log</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.postContainer}>
        <TouchableOpacity style={styles.imageContainer}>
          <Text style={styles.imageText}>Add Image +</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  tabButton: {
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  selectedTab: {
    borderColor: '#ff5e57',
  },
  tabText: {
    fontSize: 16,
  },
  postContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '80%',
    height: '60%',
    backgroundColor: '#2C698D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  imageText: {
    color: '#fff',
    fontSize: 18,
  },
  postButton: {
    marginTop: 20,
    backgroundColor: '#ff5e57',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});