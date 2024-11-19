import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
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
  const [editableField, setEditableField] = useState(null);
  const [changesSaved, setChangesSaved] = useState(false);
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
    if (result.type === "success") {
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

  const handleSubmit = async () => {
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
      formData.append("document", {
        uri: document.uri,
        name: document.name,
        type: document.mimeType || "application/pdf",
      });
    }

    if (photo) {
      formData.append("photo", {
        uri: photo.uri,
        name: `photo_${Date.now()}.jpg`,
        type: "image/jpeg",
      });
    }

    console.log([...formData]);

    axios
      .post("http://10.0.2.2:8000/guide/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setChangesSaved(true);
        setEditableField(null);
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
    <View style={styles.container}>
      <Text style={styles.headerText}>Be a Tour Guide</Text>
      <View style={styles.formContainer}>
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
        <View style={styles.pickerBox}>
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
        </View>
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
            <TouchableOpacity
              style={styles.profilePicChangeButton}
            >
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
            <TouchableOpacity
              style={styles.profilePicChangeButton}
            >
              <Feather name="plus" size={10} color="white" />
            </TouchableOpacity>
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
    backgroundColor: "#06D001",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  submitText: {
    color: "white",
    fontWeight: "bold",
  },
  profilePicChangeButton: {
    position: "absolute",
    bottom: 18,
    right: 35,
    backgroundColor: "green",
    borderRadius: 15,
    padding: 5,
  },
});

export default guideForm;
