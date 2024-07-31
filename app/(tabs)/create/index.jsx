import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function AddPost() {
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
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
      const formData = new FormData();
      formData.append("description", description);

      if (selectedImage) {
        formData.append("image", {
          uri: selectedImage,
          type: "image/jpeg",
          name: "photo.jpg",
        });
      }

      const response = await axios.post(
        "http://10.0.2.2:8000/user_management/post",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Post created:", response.data);
      router.push("/posts");
    } catch (error) {
      console.error("Error creating post:", error);
    }
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
        <View style={styles.descriptionInput}>
          <View style={styles.descriptionContent}>
            <Ionicons name="brush-outline" size={24} color="black" />
            <Text style={[styles.imageText, { marginLeft: 95 }]}>
              Description
            </Text>
          </View>
          <TextInput
            style={styles.textArea}
            value={description}
            onChangeText={setDescription}
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
  descriptionInput: {
    height: 220,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    backgroundColor: "white",
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
    backgroundColor: "white",
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
