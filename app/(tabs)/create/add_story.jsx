import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

export default function AddStory() {
  const [media, setMedia] = useState(null); // Holds selected image or video
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false); // Controls camera visibility
  const router = useRouter();

  // Request permissions
  React.useEffect(() => {
    (async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();
      const { status: galleryStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(
        cameraStatus === "granted" && galleryStatus === "granted"
      );
    })();
  }, []);

  // Open the camera
  const openCamera = async () => {
    setIsCameraOpen(true);
  };

  // Open image or video picker
  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // Allow images and videos
      allowsEditing: true,
      aspect: [4, 5], // Aspect ratio for stories
      quality: 1,
    });

    if (!result.canceled) {
      setMedia(result.assets[0]);
    }
  };

  // Handle camera capture (if camera opened)
  const handleCapture = async (camera) => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setMedia(photo);
      setIsCameraOpen(false);
    }
  };

  if (isCameraOpen) {
    return (
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back} // Access `Type` properly
        ref={(ref) => (this.camera = ref)} // Use a ref to access the camera
      >
        <View style={styles.cameraControls}>
          <TouchableOpacity
            onPress={() => setIsCameraOpen(false)}
            style={styles.cameraButton}
          >
            <Text style={styles.cameraButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              if (this.camera) {
                const photo = await this.camera.takePictureAsync();
                setMedia(photo); // Save captured photo
                setIsCameraOpen(false);
              }
            }}
            style={styles.cameraButton}
          >
            <Text style={styles.cameraButtonText}>Capture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    );
  }


  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        <TouchableOpacity style={styles.imageContainer} onPress={pickMedia}>
          {media ? (
            <Image source={{ uri: media.uri }} style={styles.preview} />
          ) : (
            <Text style={styles.imageText}>Add Image/Video +</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageContainer} onPress={openCamera}>
          <Text style={styles.imageText}>Open Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  postContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  imageContainer: {
    width: "85%",
    height: "60%",
    backgroundColor: "#2C698D",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  imageText: {
    color: "#fff",
    fontSize: 18,
  },
  preview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  postButton: {
    width: 200,
    backgroundColor: "#00cc44",
    padding: 10,
    marginTop: 15,
    borderRadius: 50,
    alignItems: "center",
    alignSelf: "center",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  cameraButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
  },
  cameraButtonText: {
    color: "#fff",
  },
});
