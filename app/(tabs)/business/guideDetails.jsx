import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Icons from "react-native-vector-icons/Ionicons";

const ProfilePage = () => {
  const { id, user, price, profile_pic, about, rating, location } =
    useLocalSearchParams() || {};

  if (!id || !user || !price || !location) {
    return (
      <View style={styles.container}>
        <Text>Error: Missing details for this guide.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={
              profile_pic
                ? { uri: `data:image/jpeg;base64,${profile_pic}` }
                : "https://via.placeholder.com/40"
            }
            style={styles.image}
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.name}>{user}</Text>
          <Icons name="heart" size={24} color="red" />
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Icons name="star" size={20} color="blue" />
            <Text style={styles.infoText}>{rating ?? 0}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icons name="location-sharp" size={20} color="green" />
            <Text style={styles.infoText}>{location}</Text>
          </View>
        </View>
      </View>

      <View style={styles.line} />

      <View style={styles.aboutSection}>
        <Text style={styles.aboutTitle}>About</Text>
        <Text style={styles.aboutText} numberOfLines={7} ellipsizeMode="tail">
          {about || "No information provided."}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: "/business/bookingUser",
              params: { id, user, price, location, "bookingType": 1 },
            })
          }
        >
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    paddingHorizontal: 30,
    paddingBottom: 24,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 2,
    borderColor: "#06D001",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#555",
  },
  line: {
    width: "90%",
    height: 1,
    backgroundColor: "#ddd",
    alignSelf: "center",
    marginVertical: 16,
  },
  aboutSection: {
    padding: 0,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#06D001",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

