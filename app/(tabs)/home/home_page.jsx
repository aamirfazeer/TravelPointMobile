import React from 'react';
import { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Share, Alert} from 'react-native';
import { icons, images } from '../../../constants'; 
import Icon from 'react-native-vector-icons/Ionicons'; 

const profiles = [
  { name: 'Lewis', img: images.p1 },
  { name: 'Mile', img: images.p2 },
  { name: 'Osa', img: images.p3 },
  { name: 'Sonn', img: images.p4 },
  { name: 'Mush', img: images.p5 },
  { name: 'kush', img: images.person6},
];

const posts = [
  {
    title: 'Villa Markoni',
    location: 'Marrakesh, Morocco',
    image: images.post1,
    description: 'Escape to paradise at Villa Markoni. Indulge in luxury, tranquility, and breathtaking views at our exquisite villa for your perfect getaway retreat. Book now and make unforgettable memories!',
    hashtags: ['#VillaMarkoni', '#Morocco'],
    profileImg: icons.vector, 
  },
  {
    title: 'Tara',
    location: 'Timmendorfer, Sri Lanka',
    image: images.post2,
    description: 'Immerse yourself in pristine beaches, rich history, and vibrant culture. Timmendorfer offers an unforgettable escape into relaxation and exploration.',
    hashtags: ['#Tara', '#SriLanka'],
    profileImg: images.p2,
  },
];

export default function home_page() {
    const [liked, setLiked] = useState([]);
  
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
        Alert.alert('Error', error.message);
      }
    };
  
    const handleComment = () => {
      Alert.alert('Comment', 'Opening comment section...');
      // Implement navigation to the comment section here
    };
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>TravelPoint</Text>
        </View>
        <ScrollView horizontal contentContainerStyle={styles.profiles}>
          {profiles.map((profile, index) => (
            <View key={index} style={styles.profile}>
              <Image source={profile.img} style={styles.profileImage} />
              <Text style={styles.profileName}>{profile.name}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.feed}>
          {posts.map((post, index) => (
            <View key={index} style={styles.post}>
              <View style={styles.postHeader}>
                <Image source={post.profileImg} style={styles.postProfileImage} />
                <Text style={styles.postTitle}>{post.title}</Text>
              </View>
              <Text style={styles.postLocation}>{post.location}</Text>
              <Image source={post.image} style={styles.postImage} />
              <Text style={styles.postDescription}>{post.description}</Text>
              <Text style={styles.postHashtags}>
                {post.hashtags.map((hashtag, idx) => (
                  <Text key={idx}>{hashtag} </Text>
                ))}
              </Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleLike(index)}>
                  <Icon
                    name={liked[index] ? 'heart' : 'heart-outline'}
                    size={24}
                    color={liked[index] ? 'red' : 'black'}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleShare(post.title, post.description)}>
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
      backgroundColor: '#fff',
      padding: 10,
    },
    header: {
      paddingTop: 25,
      paddingBottom: 20,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    profiles: {
      flexDirection: 'row',
      marginTop: 60, 
      paddingVertical: 10,
    },
    profile: {
      alignItems: 'center',
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
      backgroundColor: '#f9f9f9',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    postHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    postProfileImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    postTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    postLocation: {
      fontSize: 14,
      color: '#666',
      marginBottom: 10,
    },
    postImage: {
      width: '100%',
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
      color: '#007BFF',
      marginBottom: 10,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    actionIcon: {
      width: 24,
      height: 24,
    },
  });