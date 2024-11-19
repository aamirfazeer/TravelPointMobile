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
import axios from "axios";
import { icons } from "../../../constants";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const equipmentForm = () => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
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

  const handlePhotoPick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("owner_id", ownerId);
    formData.append("type", type);
    formData.append("description", description);

    if (photo) {
      formData.append("photo", {
        uri: photo.uri,
        type: "image/jpeg",
        name: `photo_${Date.now()}.jpg`,
      });
    }

    console.log("Form data:", formData);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        "http://10.0.2.2:8000/equipment/create", formData, config
      );

      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error.response || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Rent Out Equipment</Text>
      <View style={styles.formContainer}>
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Type" value="" />
            <Picker.Item label="Type_1" value="t1" />
            <Picker.Item label="Type_2" value="t2" />
            <Picker.Item label="Type_3" value="t3" />
          </Picker>
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
  picker: {
    height: 50,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 20,
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
});

export default equipmentForm;
