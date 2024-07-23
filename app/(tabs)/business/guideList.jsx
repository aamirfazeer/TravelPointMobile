import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { images } from "../../../constants";
import { router } from "expo-router";

const guideList = () => {
  const users = [
    {
      id: 1,
      name: "Aamir Arshad",
      salary: "2,750",
      rating: 4.8,
      reviewCount: 73,
      profilePicture: images.person1,
    },
    {
      id: 2,
      name: "Marco Solo",
      salary: "1,000",
      rating: 4.2,
      reviewCount: 7,
      profilePicture: images.person2,
    },
    {
      id: 3,
      name: "Ana Bella",
      salary: "1,500",
      rating: 3.6,
      reviewCount: 34,
      profilePicture: images.person3,
    },
    {
      id: 4,
      name: "Marie Sire",
      salary: "1,500",
      rating: 4.2,
      reviewCount: 17,
      profilePicture: images.person4,
    },
    {
      id: 5,
      name: "Kamal Rathna",
      salary: "2,250",
      rating: 4.5,
      reviewCount: 9,
      profilePicture: images.person5,
    },
    {
      id: 6,
      name: "Kushan Santha",
      salary: "1,000",
      rating: 4.0,
      reviewCount: 24,
      profilePicture: images.person6,
    },
  ];
  return <GuideList users={users} />;
};

const GuideList = ({ users }) => {
  return (
    <ScrollView style={styles.container}>
      {users.map((user) => (
        <View key={user.id} style={styles.userCard}>
          <Image source={user.profilePicture} style={styles.profilePicture} />
          <View style={styles.userInfo}>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={14} color="orange" />
              <Text style={styles.ratingText}>
                {user.rating} ({user.reviewCount})
              </Text>
            </View>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.salaryText}>Rs. {user.salary} / day</Text>
          </View>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push("/business/guideDetails")}
          >
            <FontAwesome name="arrow-right" size={16} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="heart" size={16} color="black" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#e2e8f0",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginHorizontal: 25,
    marginTop: 6,
    marginBottom: 16,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#4b5563",
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
  },
  salaryText: {
    fontSize: 14,
    color: "#6b7280",
  },
  iconButton: {
    padding: 8,
  },
});

export default guideList;
