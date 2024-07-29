import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";

export default function HomePage() {
  const [profiles, setProfiles] = useState([]);
  const [posts, setPosts] = useState([]);
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    // Fetch profiles and posts from the backend
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(
          "https://your-backend-api.com/api/profiles"
        );
        setProfiles(response.data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://your-backend-api.com/api/posts"
        );
        setPosts(response.data);
        setLiked(new Array(response.data.length).fill(false));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchProfiles();
    fetchPosts();
  }, []);

  const handleLike = (index) => {
    setLiked((prev) => {
      const newLiked = [...prev];
      newLiked[index] = !newLiked[index];
      return newLiked;
    });
  };

  const handleShare = async (title, description) => {
    try {
      await Share.share({
        message: `${title}\n\n${description}`,
      });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleComment = () => {
    Alert.alert("Comment", "Opening comment section...");
    // Implement navigation to the comment section here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.profiles}>
        {profiles.map((profile, index) => (
          <View key={index} style={styles.profile}>
            <Image source={{ uri: profile.img }} style={styles.profileImage} />
            <Text style={styles.profileName}>{profile.name}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.feed}>
        {posts.map((post, index) => (
          <View key={index} style={styles.post}>
            <View style={styles.postHeader}>
              <Image
                source={{ uri: post.profileImg }}
                style={styles.postProfileImage}
              />
              <View style={styles.headerTextContainer}>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postLocation}>{post.location}</Text>
              </View>
            </View>
            <Image source={{ uri: post.image }} style={styles.postImage} />
            <Text style={styles.postDescription}>{post.description}</Text>
            <Text style={styles.postHashtags}>
              {post.hashtags.map((hashtag, idx) => (
                <Text key={idx}>{hashtag} </Text>
              ))}
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleLike(index)}>
                <Icon
                  name={liked[index] ? "heart" : "heart-outline"}
                  size={24}
                  color={liked[index] ? "red" : "black"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleShare(post.title, post.description)}
              >
                <Icon name="share-social-outline" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleComment}>
                <Icon name="chatbubble-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  profiles: {
    flexDirection: "row",
  },
  profile: {
    alignItems: "center",
    marginRight: 10,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 5,
  },
  profileName: {
    fontSize: 14,
  },
  feed: {
    marginTop: 20,
  },
  post: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  postProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerTextContainer: {
    flexDirection: "column",
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postLocation: {
    fontSize: 14,
    color: "#666",
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  postDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  postHashtags: {
    fontSize: 12,
    color: "#007BFF",
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
