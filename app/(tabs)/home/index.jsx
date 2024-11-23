// import React from 'react';
// import { useState } from 'react';
// import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Share, Alert } from 'react-native';
// import { icons, images } from '../../../constants'; 
// import Icon from 'react-native-vector-icons/Ionicons'; 
// import { router } from 'expo-router';

// const profiles = [
//   { name: 'Lewis', img: images.p1 },
//   { name: 'Mile', img: images.p2 },
//   { name: 'Osa', img: images.p3 },
//   { name: 'Sonn', img: images.p4 },
//   { name: 'Mush', img: images.p5 },
//   { name: 'kush', img: images.person6},
// ];

// const posts = [
//   {
//     title: 'Villa Markoni',
//     location: 'Marrakesh, Morocco',
//     image: images.post1,
//     description: 'Escape to paradise at Villa Markoni. Indulge in luxury, tranquility, and breathtaking views at our exquisite villa for your perfect getaway retreat. Book now and make unforgettable memories!',
//     hashtags: ['#VillaMarkoni', '#Morocco'],
//     profileImg: icons.vector, 
//   },
//   {
//     title: 'Tara',
//     location: 'Timmendorfer, Sri Lanka',
//     image: images.post2,
//     description: 'Immerse yourself in pristine beaches, rich history, and vibrant culture. Timmendorfer offers an unforgettable escape into relaxation and exploration.',
//     hashtags: ['#Tara', '#SriLanka'],
//     profileImg: images.p2,
//   },
// ];

// export default function HomePage() {
//     const [liked, setLiked] = useState([]);
  
//     const handleLike = (index) => {
//       setLiked((prev) => {
//         const newLiked = [...prev];
//         newLiked[index] = !newLiked[index];
//         return newLiked;
//       });
//     };
  
//     const handleShare = async (title, description) => {
//       try {
//         await Share.share({
//           message: `${title}\n\n${description}`,
//         });
//       } catch (error) {
//         Alert.alert('Error', error.message);
//       }
//     };
  
//     const handleComment = () => {
//       router.push('/home/comments')
//       // Implement navigation to the comment section here
//     };
  
//     return (
//       <ScrollView contentContainerStyle={styles.container}>
//         <ScrollView horizontal contentContainerStyle={styles.profiles}>
//           {profiles.map((profile, index) => (
//             <View key={index} style={styles.profile}>
//               <Image source={profile.img} style={styles.profileImage} />
//               <Text style={styles.profileName}>{profile.name}</Text>
//             </View>
//           ))}
//         </ScrollView>
//         <View style={styles.feed}>
//           {posts.map((post, index) => (
//             <View key={index} style={styles.post}>
//               <View style={styles.postHeader}>
//                 <Image source={post.profileImg} style={styles.postProfileImage} />
//                 <View style={styles.headerTextContainer}>
//                   <Text style={styles.postTitle}>{post.title}</Text>
//                   <Text style={styles.postLocation}>{post.location}</Text>
//                 </View>
//               </View>
//               <Image source={post.image} style={styles.postImage} />
//               <Text style={styles.postDescription}>{post.description}</Text>
//               <Text style={styles.postHashtags}>
//                 {post.hashtags.map((hashtag, idx) => (
//                   <Text key={idx}>{hashtag} </Text>
//                 ))}
//               </Text>
//               <View style={styles.actions}>
//                 <TouchableOpacity onPress={() => handleLike(index)}>
//                   <Icon
//                     name={liked[index] ? 'heart' : 'heart-outline'}
//                     size={24}
//                     color={liked[index] ? 'red' : 'black'}
//                   />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => handleShare(post.title, post.description)}>
//                   <Icon name="share-social-outline" size={24} color="black" />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={handleComment}>
//                   <Icon name="chatbubble-outline" size={24} color="black" />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     );
//   }
  
//   const styles = StyleSheet.create({
//     container: {
//       flexGrow: 1,
//       backgroundColor: '#fff',
//       padding: 15,
//     },
//     profiles: {
//       flexDirection: 'row',
//     },
//     profile: {
//       alignItems: 'center',
//       marginRight: 10,
//     },
//     profileImage: {
//       width: 70,
//       height: 70,
//       borderRadius: 35,
//       marginBottom: 5,
//     },
//     profileName: {
//       fontSize: 14,
//     },
//     feed: {
//       marginTop: 20,
//     },
//     post: {
//       marginBottom: 20,
//       padding: 20,
//       backgroundColor: '#f9f9f9',
//       borderRadius: 10,
//       borderWidth: 1,
//       borderColor: '#ddd',
//     },
//     postHeader: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       marginBottom: 10,
//     },
//     postProfileImage: {
//       width: 40,
//       height: 40,
//       borderRadius: 20,
//       marginRight: 10,
//     },
//     headerTextContainer: {
//       flexDirection: 'column',
//     },
//     postTitle: {
//       fontSize: 18,
//       fontWeight: 'bold',
//     },
//     postLocation: {
//       fontSize: 14,
//       color: '#666',
//     },
//     postImage: {
//       width: '100%',
//       height: 200,
//       borderRadius: 10,
//       marginBottom: 10,
//     },
//     postDescription: {
//       fontSize: 14,
//       marginBottom: 10,
//     },
//     postHashtags: {
//       fontSize: 12,
//       color: '#007BFF',
//       marginBottom: 10,
//     },
//     actions: {
//       flexDirection: 'row',
//       justifyContent: 'space-around',
//     },
//   });

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
import { icons, images } from "../../../constants";
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";
import axios from "axios";

const profiles = [
  { name: "Lewis", img: images.p1 },
  { name: "Mile", img: images.p2 },
  { name: "Osa", img: images.p3 },
  { name: "Sonn", img: images.p4 },
  { name: "Mush", img: images.p5 },
  { name: "kush", img: images.person6 },
];

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState([]);

  // Fetch posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:8000/get_all_posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
        Alert.alert("Error", "Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

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
    router.push("/home/comments");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Horizontal Profiles Scroll */}
      <ScrollView horizontal contentContainerStyle={styles.profiles}>
        {profiles.map((profile, index) => (
          <View key={index} style={styles.profile}>
            <Image source={profile.img} style={styles.profileImage} />
            <Text style={styles.profileName}>{profile.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Feed Section */}
      <View style={styles.feed}>
        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : posts.length > 0 ? (
          posts.map((post, index) => (
            <View key={index} style={styles.post}>
              <View style={styles.postHeader}>
                <Image
                  source={{
                    uri: post.profile_pic
                      ? `data:image/jpeg;base64,${post.profile_pic}`
                      : "https://via.placeholder.com/40", // Fallback URL for missing profile pictures
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
                  source={{ uri: `data:image/jpeg;base64,${post.images[0]}` }}
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
                  onPress={() => handleShare(post.caption, post.description)}
                >
                  <Icon name="share-social-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleComment}>
                  <Icon name="chatbubble-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          ))
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
});

