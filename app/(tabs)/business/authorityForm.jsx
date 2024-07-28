import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { icons } from "../../../constants";

const authorityForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [document, setDocument] = useState(null);

  const handleDocumentPick = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "success") {
      setDocument(result);
    }
  };

  const handleSubmit = () => {
    console.log({
      name,
      description,
      location,
      document,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Be an Authority</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textArea}
          placeholder="Authority Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.textArea}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={styles.descreptionArea}
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
            <Text style={styles.uploadText} numberOfLines={1}>
              Upload Document
            </Text>
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
    height: 40,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 20,
  },
  preferenceContainer: {
    marginBottom: 16,
  },
  preferenceText: {
    fontSize: 16,
    marginBottom: 8,
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkBoxLabel: {
    marginLeft: 8,
    marginRight: 16,
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
  descreptionArea: {
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
});

export default authorityForm;
