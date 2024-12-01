import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const placeholderImage = require("../../../assets/images/placeholder.png");

const travels = [
  {
    id: "1",
    title: "Trip Name: Galle Bound",
    startingPoint: "Starting Point: Piliyandala",
    destination: "Destination: Galle",
    coordinates: {
      latitude: 6.0367,
      longitude: 80.217,
    },
  },
  {
    id: "2",
    title: "Trip Name: On a Gem Hunt",
    startingPoint: "Starting Point: Homagama",
    destination: "Destination: Ratnapura",
    coordinates: {
      latitude: 6.6828,
      longitude: 80.3994,
    },
  },
];

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState("Gallery");
  const [profilePic, setProfilePic] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [userId, setUserId] = useState(null);
  const router = useRouter();
  const { poster_id } = useLocalSearchParams();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        if (id) {
          setUserId(parseInt(id));
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);
  
  useEffect(() => {
    // if (!poster_id || !userId) return;
    const fetchProfileData = async () => {
      if (poster_id) {
        try {
          const response = await axios.get({ pathname: "http://10.0.2.2:8000/profile/user_profile", params: { poster_id }
        });
          const { firstname, lastname, username, profilePic, bio } =
            response.data;

          setFirstname(firstname);
          setLastname(lastname);
          setUsername(username);
          setBio(bio);

          if (profilePic) {
            setProfilePic({ uri: `data:image/jpeg;base64,${profilePic}` });
          } else {
            setProfilePic(null);
          }
        } catch (error) {
          console.error("Error fetching profile details:", error);
        }
      } else {
        Alert.alert("Error", "User ID not found");
      }
    };

    const fetchUserPosts = async () => {
      if (poster_id) {
        setLoadingPosts(true);
        try {
          const response = await axios.get(
            `http://10.0.2.2:8000/profile/posts/${poster_id}`
          );
          setPostCount(response.data.length);
          setPosts(response.data);
        } catch (error) {
          console.error("Error fetching user posts:", error);
        } finally {
          setLoadingPosts(false);
        }
      }
    };

    const fetchFollowData = async () => {
      try {
        const [followersRes, followingRes] = await Promise.all([
          axios.get(`http://10.0.2.2:8000/followers/${poster_id}`),
          axios.get(`http://10.0.2.2:8000/following/${poster_id}`),
        ]);
        setFollowersCount(followersRes.data.users.length);
        setFollowingCount(followingRes.data.users.length);

        setIsFollowing(followersRes.data.users.includes(userId));
      } catch (error) {
        console.error("Error fetching follow data:", error);
      }
    };

    fetchProfileData();
    fetchUserPosts();
    fetchFollowData();

    const intervalId = setInterval(fetchProfileData, 30000);
    const postIntervalId = setInterval(fetchUserPosts, 30000);

    return () => {
      clearInterval(intervalId);
      clearInterval(postIntervalId);
    };
  }, [poster_id, userId]);

  const renderPostItem = ({ item, index }) => {
    const imageUri =
      item.images && item.images.length > 0
        ? `data:image/jpeg;base64,${item.images[0]}`
        : null;

    return (
      <TouchableOpacity
        style={styles.postContainer}
        onPress={() =>
          router.push({
            pathname: "/profile/profile_posts",
            params: { index },
          })
        }
      >
        <Image
          source={imageUri ? { uri: imageUri } : placeholderImage}
          style={styles.postImage}
        />
      </TouchableOpacity>
    );
  };

  const renderTravelItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.startingPoint}</Text>
      <Text style={styles.cardDescription}>{item.destination}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: item.coordinates.latitude,
          longitude: item.coordinates.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
      >
        <Marker
          coordinate={item.coordinates}
          title={item.title}
          description={item.destination}
        />
      </MapView>
      <View style={styles.cardActions}>
        <TouchableOpacity>
          <FontAwesome name="heart-o" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="share" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await axios.post("http://10.0.2.2:8000/unfollow", {
          user_id: userId,
          follower_id: poster_id,
        });
        setFollowersCount((prev) => prev - 1);
      } else {
        await axios.post("http://10.0.2.2:8000/follow", {
          user_id: userId,
          follower_id: poster_id,
        });
        setFollowersCount((prev) => prev + 1);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error toggling follow status:", error);
      Alert.alert("Error", "Unable to update follow status.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileContainer1}>
          <Image
            source={profilePic ? profilePic : placeholderImage}
            style={styles.profileImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.profileName}>
              {firstname} {lastname}
            </Text>
            <Text style={styles.profileHandle}>@{username}</Text>
          </View>
        </View>

        <View style={styles.profileActions}>
          <TouchableOpacity
            style={[
              styles.followButton,
              isFollowing ? styles.followingButton : null,
            ]}
            onPress={handleFollowToggle}
          >
            <Text style={styles.followButtonText}>
              {isFollowing ? "Following" : "Follow"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text style={styles.profileBio}>{bio}</Text>
      </View>

      <View style={styles.profileStats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{postCount}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{followersCount}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{followingCount}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab("Gallery")}
          style={[
            styles.tabButton,
            activeTab === "Gallery" && styles.activeTabButton,
          ]}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "Gallery" && styles.activeTabButtonText,
            ]}
          >
            Gallery
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("Logs")}
          style={[
            styles.tabButton,
            activeTab === "Logs" && styles.activeTabButton,
          ]}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "Logs" && styles.activeTabButtonText,
            ]}
          >
            Logs
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "Gallery" && (
        <FlatList
          data={posts}
          renderItem={renderPostItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.galleryContainer}
          ListEmptyComponent={() =>
            !loadingPosts && (
              <Text style={{ textAlign: "center", marginTop: 20 }}>
                No posts available.
              </Text>
            )
          }
        />
      )}

      {activeTab === "Logs" && (
        <FlatList
          data={travels}
          renderItem={renderTravelItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.logsContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //padding: 16,
  },
  profileContainer: {
    alignItems: "center",
    padding: 16,
    flexDirection: "row",
    marginTop: 10,
    gap: 30,
    justifyContent: "space-around",
  },
  profileContainer1: {
    alignItems: "center",
    flexDirection: "row",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    //marginBottom: 8,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileHandle: {
    color: "gray",
  },
  profileBio: {
    fontSize: 14,
    marginTop: 12,
    marginLeft: 26,
    marginRight: 16,
  },
  profileStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
    marginLeft: 14,
    marginRight: 14,
    gap: 70,
  },
  textContainer: {
    marginLeft: 16,
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    color: "gray",
    fontSize: 14,
  },
  profileActions: {
    /* flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",*/
    //alignItems:'flex-start',
    flexDirection: "row",
    marginRight: 2,
  },
  followButton: {
    //backgroundColor: "green",
    //padding: 8,
    //borderRadius: 4,
    // marginTop: 16,
    backgroundColor: "#06D001",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    //marginRight: 8,
    marginLeft: "auto",
  },
  followButtonText: {
    color: "#fff",
    //fontWeight: "bold",
    fontSize: 16,
  },
  messageButton: {
    //padding: 8,
    backgroundColor: "#ccc",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginLeft: "auto",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  tabButton: {
    padding: 8,
  },
  tabButtonText: {
    fontSize: 16,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  activeTabButtonText: {
    fontWeight: "bold",
  },
  galleryContainer: {
    paddingHorizontal: 1,
  },
  postImage: {
    //width: Dimensions.get('window').width / 2 - 32,
    //height: Dimensions.get('window').width / 2 - 32,
    width: "100%",
    height: 200,
    // margin: 2,
  },
  logsContainer: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "gray",
    marginBottom: 4,
  },
  map: {
    width: "100%",
    height: 150,
    marginTop: 8,
    borderRadius: 8,
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  postContainer: {
    flex: 1,
    margin: 2,
  },
});

export default ProfileScreen;
