import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditGuideProfile = () => {
  const [language, setLanguage] = useState("");
  const [location, setLocation] = useState("");
  const [preference, setPreference] = useState({
    groups: false,
    individual: false,
  });
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [availability, setAvailability] = useState(false); // Added state for availability

  const getUserId = async () => {
    try {
      const id = await AsyncStorage.getItem("userId");
      return id ? parseInt(id, 10) : null;
    } catch (error) {
      console.error("Error fetching user ID:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      if (id) {
        setUserId(id);
      }
    };
    fetchUserId();
  }, []);

  const handleSubmit = async () => {
    const formData = {
      user_id: userId,
      language,
      location,
      preference: Object.keys(preference)
        .filter((key) => preference[key])
        .join(","),
      description,
      availability, // Add availability to form data
    };

    try {
      const response = await fetch("http://10.0.2.2:8000/guide/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Guide profile updated successfully", data);
      } else {
        console.error("Error updating guide profile:", data);
      }
    } catch (error) {
      console.error("Error updating guide profile:", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Edit Guide Profile</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Language</Text>
        <Picker
          selectedValue={language}
          onValueChange={(value) => setLanguage(value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Language" value="" />
          <Picker.Item label="English" value="english" />
          <Picker.Item label="Spanish" value="spanish" />
          <Picker.Item label="French" value="french" />
        </Picker>

        <Text style={styles.label}>Location</Text>
        <Picker
          selectedValue={location}
          onValueChange={(value) => setLocation(value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Location" value="" />
          <Picker.Item label="New York" value="new_york" />
          <Picker.Item label="Los Angeles" value="los_angeles" />
          <Picker.Item label="Chicago" value="chicago" />
        </Picker>

        <Text style={styles.label}>Preference</Text>
        <View style={styles.preferenceContainer}>
          <View style={styles.checkboxRow}>
            <CheckBox
              title="Individual"
              checked={preference.individual}
              onPress={() =>
                setPreference({ ...preference, individual: !preference.individual })
              }
            />
            <CheckBox
              title="Groups"
              checked={preference.groups}
              onPress={() => setPreference({ ...preference, groups: !preference.groups })}
            />
          </View>
        </View>

        <Text style={styles.label}>Availability</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>
            {availability ? "Available" : "Unavailable"}
          </Text>
          <Switch
            value={availability}
            onValueChange={setAvailability}
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={availability ? "#00cc44" : "#f4f3f4"}
          />
        </View>

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textArea}
          multiline
          placeholder="Describe yourself as a guide"
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  preferenceContainer: {
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#00cc44",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default EditGuideProfile;
