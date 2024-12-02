import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome"; 

const EditEquipment = ({ route }) => {
  // Initial equipment data passed from the previous page
  const router = useRouter();
  const { equipmentData } = route.params;

  // Form state
  const [equipmentName, setEquipmentName] = useState(equipmentData.name);
  const [quantity, setQuantity] = useState(equipmentData.quantity?.toString() || "");
  const [price, setPrice] = useState(equipmentData.price?.toString() || "");  
  const [description, setDescription] = useState(equipmentData.description);
  const [image, setImage] = useState(equipmentData.image); // Assuming the image is a URI or base64 string

 

  // Function to handle image selection (camera or gallery)
  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: false,
        maxWidth: 1024,
        maxHeight: 1024,
        quality: 1,
      },
      (response) => {
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
    launchCamera(
      {
        mediaType: "photo",
        includeBase64: false,
        maxWidth: 1024,
        maxHeight: 1024,
        quality: 1,
      },
      (response) => {
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
      formData.append("quantity", parseInt(quantity, 10)); 
      formData.append("price", parseFloat(price));
      formData.append("description", description);

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

      // API call to update equipment
      const response = await axios.put(`https://example.com/api/equipment/${equipmentData.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Alert.alert("Success", "Equipment updated successfully!");
      // Reset form fields
      setEquipmentName("");
      setQuantity("");
      setPrice("");
      setDescription("");
      setImage(null);

      // Navigate to the list page or another appropriate page
      router.push("/business/EquipmentListProvider");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update equipment.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Equipment</Text>
      <ScrollView>
        <View style={styles.card}>
          <TextInput
            style={styles.textInput}
            placeholder="Equipment Name"
            value={equipmentName}
            onChangeText={setEquipmentName}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Quantity"
            value={quantity}
            keyboardType="numeric"
            onChangeText={setQuantity}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Price"
            value={price}
            keyboardType="numeric"
            onChangeText={setPrice}
          />
          <TextInput
            style={[styles.textInput, { height: 100 }]}
            placeholder="Description (optional)"
            value={description}
            multiline
            onChangeText={setDescription}
          />

          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Icon name="camera" size={20} color="#333" />
            <Text style={styles.imageButtonText}>Add Photos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.imageButton} onPress={captureImage}>
            <Icon name="photo" size={20} color="#333" />
            <Text style={styles.imageButtonText}>Capture Photo</Text>
          </TouchableOpacity>

          {image && (
            <View style={styles.imagePreview}>
              <Image source={{ uri: image.uri }} style={styles.image} />
            </View>
          )}

          <TouchableOpacity style={styles.goButton} onPress={handleSubmit}>
            <Text style={styles.goButtonText}>Update</Text>
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
    width: 100,
    marginTop: "10px",
    textAlign: "center",
    justifyContent: "center",
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
    flexDirection: "row",
    alignItems: "center",
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

export default EditEquipment;
