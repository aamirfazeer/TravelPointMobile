import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

const GuideList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState([]);

  // Fetch guide list from API
  const fetchGuideList = async () => {
    try {
      const response = await axios.get("http://10.0.2.2:8000/guides_all");
      setUsers(response.data); // Assuming the API returns an array of guides
      setLiked(new Array(response.data.length).fill(false)); // Initialize liked state
    } catch (error) {
      console.error("Error fetching guides:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuideList();
  }, []);

  const handleLike = (index) => {
    setLiked((prev) => {
      const newLiked = [...prev];
      newLiked[index] = !newLiked[index];
      return newLiked;
    });
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#06D001" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {users.map((user, index) => (
        <View key={user.id} style={styles.userCard}>
          <Image
            source={{ uri: user.profile_pic }}
            style={styles.profilePicture}
          />
          <View style={styles.userInfo}>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={14} color="orange" />
              <Text style={styles.ratingText}>{0}</Text>
            </View>
            <Text style={styles.userName}>
              {user.first_name} {user.last_name}
            </Text>
            <Text style={styles.salaryText}>Rs. {user.price} / day</Text>
          </View>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={router.push({
              pathname: "/business/guideDetails",
              params: {
                id: user.id,
                user: user.first_name + " " + user.last_name,
                price: user.price,
                profile_pic: user.profile_pic,
                about: user.about,
                rating: 0,
                location: user.location,
              },
            })}
          >
            <FontAwesome name="arrow-right" size={16} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLike(index)}>
            <Icon
              name={liked[index] ? "heart" : "heart-outline"}
              size={24}
              color={liked[index] ? "red" : "black"}
            />
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
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#06D001",
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

export default GuideList;
