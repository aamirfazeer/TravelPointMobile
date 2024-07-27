import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { icons} from '../../../constants'

const guideForm = () => {
  const [language, setLanguage] = useState("");
  const [location, setLocation] = useState("");
  const [preference, setPreference] = useState({
    groups: false,
    individual: false,
  });
  const [description, setDescription] = useState("");
  const [document, setDocument] = useState(null);
  const [photo, setPhoto] = useState(null);

  const handleDocumentPick = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "success") {
      setDocument(result);
    }
  };

  const handlePhotoPick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log({
      language,
      location,
      preference,
      description,
      document,
      photo,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Be a Tour Guide</Text>
      <View style={styles.formContainer}>
        <Picker
          selectedValue={language}
          onValueChange={(itemValue) => setLanguage(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Language" value="" />
          <Picker.Item label="English" value="english" />
          <Picker.Item label="Spanish" value="spanish" />
          <Picker.Item label="French" value="french" />
        </Picker>
        <Picker
          selectedValue={location}
          onValueChange={(itemValue) => setLocation(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Location" value="" />
          <Picker.Item label="New York" value="new_york" />
          <Picker.Item label="Los Angeles" value="los_angeles" />
          <Picker.Item label="Chicago" value="chicago" />
        </Picker>
        <View style={styles.preferenceContainer}>
          <Text style={styles.preferenceText}>Preference</Text>
          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxContainer}>
              <Text style={styles.checkBoxLabel}>Individual</Text>
              <CheckBox
                checked={preference.individual}
                onPress={() =>
                  setPreference({
                    ...preference,
                    individual: !preference.individual,
                  })
                }
                containerStyle={styles.checkBox}
              />
            </View>
            <View style={styles.checkBoxContainer}>
              <Text style={styles.checkBoxLabel}>Groups</Text>
              <CheckBox
                checked={preference.groups}
                onPress={() =>
                  setPreference({ ...preference, groups: !preference.groups })
                }
                containerStyle={styles.checkBox}
              />
            </View>
          </View>
        </View>
        <TextInput
          style={styles.textArea}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <View style={styles.uploadContainer}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleDocumentPick}
          >
            <Image source={icons.uploadDocument} style={styles.uploadImage} />
            <Text style={styles.uploadText} numberOfLines={1}>
              Upload Document
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handlePhotoPick}
          >
            <Image source={icons.uploadImage} style={styles.uploadImage} />
            <Text style={styles.uploadText}>Upload Photo</Text>
          </TouchableOpacity>
        </View>
        <View className="items-center">
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#446482",
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#3F7C9E",
    padding: 40,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },
  picker: {
    height: 50,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 20,
  },
  preferenceContainer: {
    marginBottom: 16,
  },
  preferenceText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
  checkBoxContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  checkBoxLabel: {
    color: "white"
  },
  checkBox: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
  },
  textArea: {
    height: 100,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  uploadContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 2,
  },
  uploadImage: {
    width: 80,
    height: 80,
  },
  uploadButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: 8,
    flex: 1,
  },
  uploadText: {
    width: 115,
    textAlign: "center",
    color: "#fff",
  },
  submitButton: {
    width: 100,
    backgroundColor: "#EF4444",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },
  submitText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default guideForm;
