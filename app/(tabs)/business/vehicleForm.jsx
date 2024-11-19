import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { icons } from "../../../constants";
import DropdownComponent from "../../../components/Dropdown";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const vehicleForm = () => {
  const [type, setType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [milage, setMilage] = useState("");
  const [price, setPrice] = useState("");
  const [document, setDocument] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [ownerId, setOwnerId] = useState("");

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

  const types = [
    { label: "Type 1", value: "t1" },
    { label: "Type 2", value: "t2" },
    { label: "Type 3", value: "t3" },
  ];

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("owner_id", ownerId);
    formData.append("type", type);
    formData.append("capacity", capacity);
    formData.append("milage", milage);
    formData.append("price", price);

    if (document) {
      formData.append("document", {
        uri: document.uri,
        name: document.name,
        type: document.mimeType || "application/pdf",
      });
    }

    if (photo) {
      formData.append("photo", {
        uri: photo,
        name: "photo.jpg",
        type: "image/jpeg",
      });
    }

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
      <Text style={styles.headerText}>Rent out vehicles</Text>
      <View style={styles.formContainer}>
        <DropdownComponent
          data={types}
          placeholder={"Vehicle Type"}
          value={type}
          onValueChange={setType}
        />
        <TextInput
          style={styles.textArea}
          placeholder="Milage Per Litre"
          value={milage}
          onChangeText={setMilage}
        />
        <TextInput
          style={styles.textArea}
          placeholder="Capacity"
          value={capacity}
          onChangeText={setCapacity}
        />
        <TextInput
          style={styles.textArea}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
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
});

export default vehicleForm;
