import React, { useState } from "react";
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
import * as FileSystem from "expo-file-system";
import axios from "axios";


export default function AddPost() {
  const [caption, setCaption] = useState("");
  const [images, setImages] = useState([]); // Array to hold multiple images

  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Keep this for multiple selection
      quality: 1, // Enable multiple selection
    });

    if (!result.canceled) {
      setImages(result.assets.map((asset) => asset.uri));
    }
  };

  const handleTagPeople = () => {
    router.push("/tag-people");
  };

  const handleSelectLocation = () => {
    router.push("/location-picker");
  };

  const handlePost = async () => {
    try {
      // Create a new FormData instance
      const formData = new FormData();

      // Append the caption and other data
      formData.append("poster_id", 6);
      formData.append("caption", caption || "");
      formData.append("video_url", "");
      formData.append("location", "");

      // Append each image as a file
      images.forEach((image, index) => {
        formData.append("images", {
          uri: image,
          type: "image/jpeg", // Change this if your images have a different type
          name: `image${index}.jpg`, // Name each image uniquely
        });
      });

      const response = await axios.post(
        "http://10.0.2.2:8000/posts/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Posts created:", response.data);
      Alert.alert("Success", "Your posts were created successfully!");
      router.push("/posts");
    } catch (error) {
      console.error(
        "Error creating posts:",
        error.response ? error.response.data : error.message
      );
      Alert.alert(
        "Error",
        error.response
          ? error.response.data.message ||
              "There was an issue creating your posts."
          : "There was an issue creating your posts."
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
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={handleTagPeople}
        >
          <Ionicons name="person-outline" size={24} color="black" />
          <Text style={styles.imageText}>Tag People</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={handleSelectLocation}
        >
          <Ionicons name="location-outline" size={24} color="black" />
          <Text style={styles.imageText}>Location</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
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
    marginBottom: 30,
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
  postButton: {
    width: 200,
    backgroundColor: "#00cc44",
    padding: 10,
    marginTop: 30,
    borderRadius: 50,
    alignItems: "center",
    alignSelf: "center",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
