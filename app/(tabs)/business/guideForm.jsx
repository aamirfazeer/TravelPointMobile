import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { icons } from "../../../constants";
import { router } from "expo-router";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";

const guideForm = () => {
  const [language, setLanguage] = useState("");
  const [location, setLocation] = useState("");
  const [preference, setPreference] = useState({
    groups: false,
    individual: false,
  });
  const [saved, setSaved] = useState(false);
  const [description, setDescription] = useState("");
  const [document, setDocument] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [userId, setUserId] = useState("");

  const getUserId = async () => {
    try {
      const id = await AsyncStorage.getItem("userId");
      return id !== null ? parseInt(id) : null;
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

  const handleDocumentPick = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (result.assets[0].name) {
      setDocument(result);
    }
  };

  const handlePhotoPick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.assets[0]);
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("language", language);
    formData.append("location", location);
    formData.append(
      "preference",
      Object.keys(preference)
        .filter((key) => preference[key])
        .join(",")
    );
    formData.append("description", description);

    if (document) {
      console.log(document);
      formData.append("document", {
        uri: document.assets[0].uri,
        name: document.assets[0].name,
        type: document.assets[0].mimeType || "application/pdf",
      });
    }

    if (photo) {
      formData.append("photo", {
        uri: photo.uri,
        type: "image/jpeg",
        name: `photo_${Date.now()}.jpg`,
      });
    }

    console.log(formData);

    axios
      .post("http://10.0.2.2:8000/guide/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setChangesSaved(true);
        setTimeout(() => setChangesSaved(false), 2000);
      })
      .catch((error) => {
        console.error(
          "Error submitting form:",
          error.response || error.message
        );
      });
  };

  return (
    <View style={styles.safecontainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerText}>Be a Tour Guide</Text>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Language</Text>
          <View style={styles.pickerBox}>
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
          </View>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your location"
            value={location}
            onChangeText={setLocation}
          />
          <Text style={styles.label}>Preference</Text>
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
          <Text style={styles.label}>Description</Text>
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
              <TouchableOpacity style={styles.changeButton}>
                <Feather name="plus" size={10} color="white" />
              </TouchableOpacity>
              <Text style={styles.uploadText} numberOfLines={1}>
                Upload Document
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handlePhotoPick}
            >
              <Image source={icons.uploadImage} style={styles.uploadImage} />
              <TouchableOpacity style={styles.changeButton}>
                <Feather name="plus" size={10} color="white" />
              </TouchableOpacity>
              <Text style={styles.uploadText}>Upload Photo</Text>
            </TouchableOpacity>
          </View>
          <View className="items-center">
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
            {saved && <Text style={styles.savedText}>Changes Saved!</Text>}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safecontainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
  },
  pickerBox: {
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "gray",
    alignContent: "center",
  },
  picker: {
    color: "gray",
  },
  preferenceContainer: {
    marginBottom: 16,
  },
  preferenceText: {
    color: "black",
    fontSize: 16,
    marginBottom: 8,
  },
  checkBoxContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  checkBoxLabel: {
    color: "black",
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
    borderWidth: 2,
    borderColor: "gray",
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    textAlignVertical: "top",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "gray",
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
    fontWeight: "bold",
    marginTop: 10,
  },
  submitButton: {
    width: 100,
    backgroundColor: "#06D001",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  submitText: {
    color: "white",
    fontWeight: "bold",
  },
  changeButton: {
    position: "absolute",
    bottom: 35,
    right: 35,
    backgroundColor: "green",
    borderRadius: 15,
    padding: 5,
  },
  label: {
    width: "100%",
    textAlign: "left",
    marginVertical: 5,
    fontWeight: "bold",
  },
  savedText: {
    color: "#28a745",
    marginTop: 10,
  },
});

export default guideForm;
