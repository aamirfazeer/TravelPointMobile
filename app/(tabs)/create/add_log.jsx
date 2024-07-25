import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";


export default function addLog() {
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TouchableOpacity style={styles.inputContainer}>
          <Text style={styles.label}>Select initial location</Text>
          <View style={styles.inputRow}>
            <Text style={styles.inputText}>Add</Text>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inputContainer}>
          <Text style={styles.label}>Add more locations</Text>
          <View style={styles.inputRow}>
            <Text style={styles.inputText}>Add</Text>
            <View style={styles.iconRow}>
              <Ionicons name="chevron-forward" size={24} color="black" />
              <Ionicons
                name="add-circle-outline"
                size={24}
                color="black"
                style={styles.addIcon}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inputContainer}>
          <Text style={styles.label}>Select final location</Text>
          <View style={styles.inputRow}>
            <Text style={styles.inputText}>Add</Text>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.doneButton}>
          <Text style={styles.doneButtonText}>Done</Text>
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
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    color: "#000",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputText: {
    fontSize: 16,
    color: "#000",
    marginRight: 5,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  addIcon: {
    marginLeft: 5,
  },
  doneButton: {
    width: 200,
    backgroundColor: "#00FF00",
    padding: 10,
    marginTop: 30,
    borderRadius: 50,
    alignItems: "center",
    alignSelf: "center",
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
