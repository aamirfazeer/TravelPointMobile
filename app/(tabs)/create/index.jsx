import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

export default function addPost() {
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TouchableOpacity style={styles.imageContainer}>
          <Ionicons name="image-outline" size={24} color="black" />
          <Text style={styles.imageText}>Add Image</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.descriptionInput}>
          <View style={styles.descriptionContent}>
            <Ionicons name="brush-outline" size={24} color="black" />
            <Text style={[styles.imageText, { marginLeft: 95 }]}>
              Description
            </Text>
          </View>
          <TextInput
            style={styles.textArea}
            // value={description}
            // onChangeText={setDescription}
            multiline
          />
        </View>
        <TouchableOpacity style={styles.imageContainer}>
          <Ionicons name="person-outline" size={24} color="black" />
          <Text style={styles.imageText}>Tag People</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageContainer}>
          <Ionicons name="location-outline" size={24} color="black" />
          <Text style={styles.imageText}>Location</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
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
    paddingHorizontal: 30,
  },
  formContainer: {
    marginTop: 20,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    marginBottom: 25,
  },
  imageText: {
    fontSize: 16,
    color: "#000",
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 25,
    fontSize: 16,
    height: 300,
  },
  descriptionInput: {
    height: 220,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    backgroundColor: "white",
    textAlignVertical: "top",
    marginBottom: 25,
  },
  descriptionContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textArea: {
    height: 150,
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    backgroundColor: "white",
    textAlignVertical: "top",
    marginBottom: 25,
    marginHorizontal: 17
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 25,
  },
  postButton: {
    width: 200,
    backgroundColor: "#00FF00",
    padding: 10,
    marginTop: 30,
    borderRadius: 50,
    alignItems: "center",
    alignSelf: "center",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
