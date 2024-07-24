import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function add_post() {
  return (
    <View style={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tabButton } onPress={()=>router.push('/create/add_story')}>
            <Text style={styles.tabText}>Story</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabButton, styles.selectedTab]} onPress={()=>router.push('/create')}>
            <Text style={styles.tabText}>Post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton }onPress={()=>router.push('/create/add_log')}>
            <Text style={styles.tabText}>Log</Text>
          </TouchableOpacity>
        </View>
      <View style={styles.postContainer}>
        <View style={styles.imageRow}>
          <TouchableOpacity style={styles.imageContainer}>
            <Text style={styles.imageText}>Add Image +</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageContainer}>
            <Text style={styles.imageText}>Add Image +</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageContainer}>
            <Text style={styles.imageText}>Add Image +</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.addMoreContainer}>
          <TouchableOpacity style={styles.addMoreButton}>
            <Text style={styles.addMoreText}>Add more images</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Description"
          multiline={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Tag People"
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
        />
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
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
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
    color: '#000',
  },
  selectedTabText: {
    color: '#fff',
  },
  postContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#2C698D',
    borderRadius: 10,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '30%',
    height: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  imageText: {
    color: '#2C698D',
  },
  addMoreContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  addMoreButton: {
    width: '40%',
    height: 40,
    backgroundColor: '#002F43',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  addMoreText: {
    color: '#fff',
    fontSize: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
    color: '#000',
  },
  descriptionInput: {
    height: 100,
  },
  postButton: {
    marginTop: 10,
    backgroundColor: '#ff5e57',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
