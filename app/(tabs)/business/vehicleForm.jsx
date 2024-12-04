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
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { icons } from "../../../constants";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const vehicleForm = () => {
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [milage, setMilage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [document, setDocument] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [ownerId, setOwnerId] = useState("");
  const [saved, setSaved] = useState(false);

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
    const fetchOwnerId = async () => {
      const id = await getUserId();
      if (id) {
        setOwnerId(id);
      }
    };
    fetchOwnerId();
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
  

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("owner_id", ownerId);
    formData.append("type", type);
    formData.append("location", location);
    formData.append("capacity", capacity);
    formData.append("milage", milage);
    formData.append("price", price);
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

    try {
      const response = await axios.post(
        "http://10.0.2.2:8000/vehicle/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error.response || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container1}>
        <Text style={styles.headerText}>Rent out vehicles</Text>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Model Name</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Model"
            value={capacity}
            onChangeText={setType}
          />
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Location"
            value={capacity}
            onChangeText={setLocation}
          />
          <Text style={styles.label}>Milage</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Milage Per Litre"
            value={milage}
            onChangeText={setMilage}
          />
          <Text style={styles.label}>Capacity</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Capacity"
            value={capacity}
            onChangeText={setCapacity}
          />
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textArea1}
            value={description}
            placeholder="description"
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
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  container1: {
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "black",
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
  },
  textArea: {
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
    marginBottom: 30,
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
  pickerBox: {
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "gray",
  },
  picker: {
    color: "gray",
  },
  label: {
    width: "100%",
    textAlign: "left",
    marginVertical: 5,
    fontWeight: "bold",
  },
  textArea1: {
    height: 150,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    textAlignVertical: "top",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "gray",
  },
  savedText: {
    color: "#28a745",
    marginTop: 10,
  },
});

export default vehicleForm;
