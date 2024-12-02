import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView
} from "react-native";
import axios from "axios";
import { router } from "expo-router";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome Icon

const AddEquipment = () => {
  // Form state
  const [equipmentName, setEquipmentName] = useState(""); // Equipment name
  const [quantity, setQuantity] = useState(""); // Quantity
  const [price, setPrice] = useState(""); // Price
  const [description, setDescription] = useState(""); // Description (optional)
  const [image, setImage] = useState(null); // Image state

  // Function to handle image selection (camera or gallery)
  const pickImage = () => {
    console.log("pickImage called");
    launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: false,
        maxWidth: 1024,
        maxHeight: 1024,
        quality: 1,
      },
      (response) => {
        console.log("Image Picker Response:", response); // Log full response
        if (response.didCancel) {
          Alert.alert("Image selection canceled");
        } else if (response.errorCode) {
          Alert.alert("Error", response.errorMessage);
        } else {
          setImage(response.assets[0]);
        }
      }
    );
  };
  
  const captureImage = () => {
    console.log("captureImage called");
    launchCamera(
      {
        mediaType: "photo",
        includeBase64: false,
        maxWidth: 1024,
        maxHeight: 1024,
        quality: 1,
      },
      (response) => {
        console.log("Camera Response:", response); // Log full response
        if (response.didCancel) {
          Alert.alert("Camera capture canceled");
        } else if (response.errorCode) {
          Alert.alert("Error", response.errorMessage);
        } else {
          setImage(response.assets[0]);
        }
      }
    );
  };
  
  // Submit handler
  const handleSubmit = async () => {
    if (!equipmentName || !quantity || !price) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    try {
      // Prepare data for form submission
      const formData = new FormData();
      formData.append("name", equipmentName);
      formData.append("quantity", parseInt(quantity, 10)); // Convert quantity to number
      formData.append("price", parseFloat(price)); // Convert price to number
      formData.append("description", description);

      // If there's an image, add it to the form data
      if (image) {
        const fileUri = image.uri;
        const fileName = fileUri.split("/").pop();
        const fileType = fileName.split(".").pop();
        const file = {
          uri: fileUri,
          name: fileName,
          type: `image/${fileType}`,
        };
        formData.append("image", file);
      }

      // API call to add equipment with image
      const response = await axios.post("https://example.com/api/equipment", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Alert.alert("Success", "Equipment added successfully!");
      // Reset form fields
      setEquipmentName("");
      setQuantity("");
      setPrice("");
      setDescription("");
      setImage(null); // Reset image

      // Navigate to EquipmentListProvider page
      router.push("/business/EquipmentListProvider");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to add equipment.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Page Title */}
      <Text style={styles.title}>Add New Equipment</Text>
      <ScrollView>
      <View style={styles.card}>
        {/* Equipment Name Input */}
        <TextInput
          style={styles.textInput}
          placeholder="Equipment Name"
          value={equipmentName}
          onChangeText={setEquipmentName}
        />
        {/* Quantity Input */}
        <TextInput
          style={styles.textInput}
          placeholder="Quantity"
          value={quantity}
          keyboardType="numeric"
          onChangeText={setQuantity}
        />
        {/* Price Input */}
        <TextInput
          style={styles.textInput}
          placeholder="Price"
          value={price}
          keyboardType="numeric"
          onChangeText={setPrice}
        />
        {/* Description Input */}
        <TextInput
          style={[styles.textInput, { height: 100 }]} // Taller input for multiline
          placeholder="Description (optional)"
          value={description}
          multiline
          onChangeText={setDescription}
        />

        {/* Add Photo Button */}
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Icon name="camera" size={20} color="#333" />
          <Text style={styles.imageButtonText}>Add Photos</Text>
        </TouchableOpacity>

        {/* OR Capture Photo Button */}
        <TouchableOpacity style={styles.imageButton} onPress={captureImage}>
          <Icon name="photo" size={20} color="#333" />
          <Text style={styles.imageButtonText}>Capture Photo</Text>
        </TouchableOpacity>

        {/* Display selected image */}
        {image && (
          <View style={styles.imagePreview}>
            <Image source={{ uri: image.uri }} style={styles.image} />
          </View>
        )}

        {/* Submit Button */}
        <TouchableOpacity style={styles.goButton} onPress={handleSubmit}>
          <Text style={styles.goButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    width: 300,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "black",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 24,
    marginTop: 48,
    width: 320,
    borderRadius: 8,
    elevation: 2,
  },
  textInput: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "grey",
    marginBottom: 16,
    borderRadius: 8,
    padding: 8,
    color: "black",
  },
  goButton: {
    borderRadius: 25,
    backgroundColor: "#06D001",
    padding: 12,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10px",
    marginBottom: "10px",
    width: 100,
  },
  goButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  imageButton: {
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#ddd",
    padding: 12,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  imageButtonText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  imagePreview: {
    marginTop: 16,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: "cover",
  },
});

export default AddEquipment;