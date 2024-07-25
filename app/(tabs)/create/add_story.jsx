import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function addStory() {
  return (
    <View style={styles.container}>
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
    backgroundColor: "#fff",
  },
  postContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  imageContainer: {
    width: "85%",
    height: "60%",
    backgroundColor: "#2C698D",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  imageText: {
    color: "#fff",
    fontSize: 18,
  },
  postButton: {
    width: 200,
    backgroundColor: "#00FF00",
    padding: 10,
    marginTop: 55,
    borderRadius: 50,
    alignItems: "center",
    alignSelf: "center",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});