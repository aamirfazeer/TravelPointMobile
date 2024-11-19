import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const placeholderImage = require('../../../assets/images/placeholder.png');

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [bio, setBio] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [profilePic, setProfilePic] = useState(null);
  const [editableField, setEditableField] = useState(null);
  const [changesSaved, setChangesSaved] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve user ID from AsyncStorage
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(parseInt(storedUserId, 10));
        }
      } catch (error) {
        console.error("Error retrieving user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId !== null) {
      axios
        .get(`http://10.0.2.2:8000/profile/${userId}`)
        .then((response) => {
          const { username, email, contactInfo, dateOfBirth, profilePic, bio } =
            response.data;

          setUsername(username);
          setEmail(email);
          setContactInfo(contactInfo);
          setBio(bio);

          if (dateOfBirth) {
            setDateOfBirth(new Date(dateOfBirth));
          } else {
            setDateOfBirth(new Date()); // Fallback to current date if it's null or undefined
          }

          if (profilePic) {
            setProfilePic({ uri: `data:image/jpeg;base64,${profilePic}` });
          } else {
            setProfilePic(null);
          }
        })
        .catch((error) => {
          console.error("Error fetching profile details:", error);
        });
    }
  }, [userId]);

  const handleSaveChanges = () => {
    if (userId === null) {
      Alert.alert("Error", "User ID is not available");
      return;
    }

    const formData = new FormData();
    formData.append("id", userId.toString());
    formData.append("username", username);
    formData.append("email", email);
    formData.append("contactInfo", contactInfo);
    formData.append("dateOfBirth", dateOfBirth.toISOString().split('T')[0]);
    formData.append("bio", bio);
    if (profilePic) {
      formData.append("profilePic", {
        uri: profilePic.uri,
        type: 'image/jpeg',
        name: 'profile_pic.jpg',
      });
    }
    console.log("Form data:", formData);
    axios
      .post("http://10.0.2.2:8000/profile/update", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setChangesSaved(true);
        setEditableField(null);
        setTimeout(() => setChangesSaved(false), 2000);
      })
      .catch((error) => {
        console.error("Error saving profile changes:", error);
      });
  };

  const handleProfilePicChange = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0]);
    } else {
      Alert.alert("Profile Picture Change", "You did not select any image.");
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios'); // Hide the picker for Android once a date is selected
    setDateOfBirth(currentDate);
  };

  const renderEditableTextInput = (value, onChangeText, fieldName) => {
    return (
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setEditableField(fieldName)}
      >
        {editableField === fieldName ? (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            onBlur={() => setEditableField(null)}
            autoFocus
          />
        ) : (
          <Text style={styles.inputText}>{value}</Text>
        )}
        <TouchableOpacity
          onPress={() => setEditableField(fieldName)}
          style={styles.editButton}
        >
          <Text>
            <Feather name="edit-2" size={14} color="black" />
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.safecontainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerText}>Profile</Text>
        <View style={styles.profileCard}>
          <TouchableOpacity
            onPress={handleProfilePicChange}
            style={styles.profileImageContainer}
          >
            <Image
              source={profilePic ? profilePic : placeholderImage}
              style={styles.profileImage}
            />
            <TouchableOpacity
              onPress={handleProfilePicChange}
              style={styles.profilePicChangeButton}
            >
              <Feather name="plus" size={10} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>
          <Text style={styles.label}>Username</Text>
          {renderEditableTextInput(username, setUsername, "username")}
          <Text style={styles.label}>Email Address</Text>
          {renderEditableTextInput(email, setEmail, "email")}
          <Text style={styles.label}>Contact Info</Text>
          {renderEditableTextInput(contactInfo, setContactInfo, "contactInfo")}
          <Text style={styles.label}>Bio</Text>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setEditableField(bio)}
          >
            {editableField === bio ? (
              <TextInput
                style={styles.textArea}
                value={bio}
                onChangeText={setBio}
                onBlur={() => setEditableField(null)}
                autoFocus
              />
            ) : (
              <Text style={styles.inputText}>{bio}</Text>
            )}
            <TouchableOpacity
              onPress={() => setEditableField(bio)}
              style={styles.editButton}
            >
              <Text>
                <Feather name="edit-2" size={14} color="black" />
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{dateOfBirth.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateOfBirth}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveChanges}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
          {changesSaved && <Text style={styles.savedText}>Changes Saved!</Text>}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safecontainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 5,
  },
  profileCard: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  profileImageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  profilePicChangeButton: {
    position: "absolute",
    bottom: 18,
    right: 5,
    backgroundColor: "green",
    borderRadius: 15,
    padding: 5,
  },
  label: {
    width: "100%",
    textAlign: "left",
    marginVertical: 5,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    borderColor: "#ccc",
    borderWidth: 1,
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
  input: {
    flex: 1,
    color: "#000",
  },
  inputText: {
    flex: 1,
    color: "#000",
  },
  editButton: {
    padding: 5,
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginVertical: 5,
    textAlign: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    height: 47,
  },
  saveButton: {
    backgroundColor: "#28a745",
    borderRadius: 34,
    padding: 10,
    marginVertical: 10,
    width: "75%",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  savedText: {
    color: "#28a745",
    marginTop: 10,
  },
});

export default EditProfile;
