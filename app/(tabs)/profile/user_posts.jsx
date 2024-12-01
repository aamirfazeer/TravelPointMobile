import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfilePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState([]);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);

  const {index, poster_id} = useLocalSearchParams();

  console.log("Index:", index);

  const getUserId = async () => {
    try {
      const id = await AsyncStorage.getItem("userId");
      return id !== null ? parseInt(id) : null;
    } catch (error) {
      console.error("Error fetching user ID:", error);
      return null;
    }
  };

  // Fetch posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      if (poster_id) {
        setLoading(true);
        axios
          .get(`http://10.0.2.2:8000/profile/posts/${poster_id}`)
          .then((response) => {
            setPosts(response.data); // Set posts data
            // Set the initial post to focus if index is passed as a parameter
            if (index !== undefined) {
              setSelectedPostIndex(Number(index));
            }
          })
          .catch((error) => {
            console.error("Error fetching user posts:", error);
          })
          .finally(() => setLoading(false));
      }
    };

    fetchPosts();
  }, [index, poster_id]);

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
    router.push("/home/comments");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.feed}>
        {loading ? (
          <ActivityIndicator size="200" color="#007BFF" />
        ) : posts.length > 0 ? (
          <>
            {/* Render focused post first */}
            {selectedPostIndex !== null && posts[selectedPostIndex] && (
              <View key={`focused-${selectedPostIndex}`} style={styles.post}>
                <View style={styles.postHeader}>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: `/profile/${posts[selectedPostIndex].poster_id}`,
                        params: { index },
                      })
                    }
                  >
                    <Image
                      source={{
                        uri: posts[selectedPostIndex].profile_pic
                          ? `data:image/jpeg;base64,${posts[selectedPostIndex].profile_pic}`
                          : "https://via.placeholder.com/40",
                      }}
                      style={styles.postProfileImage}
                    />
                  </TouchableOpacity>
                  <View style={styles.headerTextContainer}>
                    <Text style={styles.postUsername}>
                      {posts[selectedPostIndex].username}
                    </Text>
                    <Text style={styles.postLocation}>
                      {posts[selectedPostIndex].location || "Unknown Location"}
                    </Text>
                  </View>
                </View>

                {/* Post Image */}
                {posts[selectedPostIndex].images[0] && (
                  <Image
                    source={{
                      uri: `data:image/jpeg;base64,${posts[selectedPostIndex].images[0]}`,
                    }}
                    style={styles.postImage}
                  />
                )}

                <Text style={styles.postDescription}>
                  {posts[selectedPostIndex].caption || "No caption provided."}
                </Text>

                {/* Actions */}
                <View style={styles.actions}>
                  <TouchableOpacity
                    onPress={() => handleLike(selectedPostIndex)}
                  >
                    <Icon
                      name={
                        liked[selectedPostIndex] ? "heart" : "heart-outline"
                      }
                      size={24}
                      color={liked[selectedPostIndex] ? "red" : "black"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      handleShare(
                        posts[selectedPostIndex].caption,
                        posts[selectedPostIndex].description
                      )
                    }
                  >
                    <Icon name="share-social-outline" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleComment}>
                    <Icon name="chatbubble-outline" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Render other posts */}
            {posts.map((post, index) => {
              if (index === selectedPostIndex) return null; // Skip the focused post
              return (
                <View key={index} style={styles.post}>
                  <View style={styles.postHeader}>
                    <Image
                      source={{
                        uri: post.profile_pic
                          ? `data:image/jpeg;base64,${post.profile_pic}`
                          : "https://via.placeholder.com/40",
                      }}
                      style={styles.postProfileImage}
                    />
                    <View style={styles.headerTextContainer}>
                      <Text style={styles.postUsername}>{post.username}</Text>
                      <Text style={styles.postLocation}>
                        {post.location || "Unknown Location"}
                      </Text>
                    </View>
                  </View>

                  {/* Post Image */}
                  {post.images[0] && (
                    <Image
                      source={{
                        uri: `data:image/jpeg;base64,${post.images[0]}`,
                      }}
                      style={styles.postImage}
                    />
                  )}

                  <Text style={styles.postDescription}>
                    {post.caption || "No caption provided."}
                  </Text>

                  {/* Actions */}
                  <View style={styles.actions}>
                    <TouchableOpacity onPress={() => handleLike(index)}>
                      <Icon
                        name={liked[index] ? "heart" : "heart-outline"}
                        size={24}
                        color={liked[index] ? "red" : "black"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        handleShare(post.caption, post.description)
                      }
                    >
                      <Icon
                        name="share-social-outline"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleComment}>
                      <Icon name="chatbubble-outline" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </>
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No posts available.
          </Text>
        )}
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
  feed: {
    marginTop: 0,
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
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 8,
  },
  postDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  postUsername: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
