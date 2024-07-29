import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

export default function AddLog() {
  const [initialLocation, setInitialLocation] = useState(null);
  const [moreLocations, setMoreLocations] = useState([]);
  const [finalLocation, setFinalLocation] = useState(null);

  const handleSelectInitialLocation = () => {
    router.push("/location-picker?type=initial");
  };

  const handleAddMoreLocations = () => {
    router.push("/location-picker?type=more");
  };

  const handleSelectFinalLocation = () => {
    router.push("/location-picker?type=final");
  };

  const handleDone = () => {
    console.log("Log created:", {
      initialLocation,
      moreLocations,
      finalLocation,
    });
    router.push("/logs");
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={handleSelectInitialLocation}
        >
          <Text style={styles.label}>Select initial location</Text>
          <View style={styles.inputRow}>
            <Text style={styles.inputText}>
              {initialLocation ? initialLocation.name : "Add"}
            </Text>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={handleAddMoreLocations}
        >
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
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={handleSelectFinalLocation}
        >
          <Text style={styles.label}>Select final location</Text>
          <View style={styles.inputRow}>
            <Text style={styles.inputText}>
              {finalLocation ? finalLocation.name : "Add"}
            </Text>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </ScrollView>
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
    borderRadius: 20,
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
    backgroundColor: "#00cc44",
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
