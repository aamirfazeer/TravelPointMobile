import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddPost() {
  const [caption, setCaption] = useState("");
  const [images, setImages] = useState([]);
  const [posterId, setPosterId] = useState("");
  const [location, setLocation] = useState(""); // New state for location

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
    const fetchPosterId = async () => {
      const id = await getUserId();
      if (id) {
        setPosterId(id);
      }
    };
    fetchPosterId();
  }, []);

  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages(result.assets.map((asset) => asset.uri));
    }
  };

  const handlePost = async () => {
    if (!posterId) {
      Alert.alert("Error", "User ID not found. Please sign in again.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("poster_id", posterId);
      formData.append("caption", caption || "");
      formData.append("video_url", ""); // Can be updated to allow video uploading
      formData.append("location", location || ""); // Pass location to the backend

      images.forEach((imageUri, index) => {
        const fileName = `image${index}.jpg`;
        const imageObj = {
          uri: imageUri,
          type: "image/jpeg",
          name: fileName,
        };
        formData.append("images", imageObj);
      });

      console.log("Posting data:", formData);

      await axios.post("http://10.0.2.2:8000/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Alert.alert("Success", "Your post was created successfully!");
      router.push("/home");
    } catch (error) {
      console.error(
        "Error creating post:",
        error.response?.data || error.message
      );
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "There was an issue creating your post."
      );
    }
  };

  const removeImage = (imageUri) => {
    setImages(images.filter((image) => image !== imageUri));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={handleSelectImage}
        >
          <Ionicons name="image-outline" size={24} color="black" />
          <Text style={styles.imageText}>Add Image</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
        {images.length > 0 && (
          <View style={styles.imageContainer}>
            <ScrollView horizontal>
              {images.map((image, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{ uri: image }} style={styles.selectedImage} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => removeImage(image)}
                  >
                    <Ionicons name="close-circle" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        <View style={styles.descriptionInput}>
          <View style={styles.descriptionContent}>
            <Ionicons name="brush-outline" size={24} color="black" />
            <Text style={[styles.imageText, { marginLeft: 95 }]}>Caption</Text>
          </View>
          <TextInput
            style={styles.textArea}
            value={caption}
            onChangeText={setCaption}
            multiline
          />
        </View>
        
        {/* Replace the location picker with a text input */}
        <View style={styles.locationInput}>
          <Ionicons name="location-outline" size={24} color="black" />
          <TextInput
            style={styles.locationTextInput}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter Location"
          />
        </View>

        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Post</Text>
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
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  imageText: {
    fontSize: 16,
    color: "#000",
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginRight: 10,
  },
  imageWrapper: {
    position: "relative",
  },
  removeImageButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 15,
    padding: 5,
  },
  descriptionInput: {
    height: 220,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "#fff",
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
    textAlignVertical: "top",
    marginBottom: 25,
    marginHorizontal: 17,
  },
  locationInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ddd",
    marginBottom: 25,
  },
  locationTextInput: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  postButton: {
    width: 200,
    backgroundColor: "#00cc44",
    padding: 10,
    marginTop: 5,
    borderRadius: 50,
    alignItems: "center",
    alignSelf: "center",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
