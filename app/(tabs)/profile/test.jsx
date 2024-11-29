import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";

const placeholderImage = require("../../../assets/images/placeholder.png");

const ProfileScreen = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const router = useRouter();
  const local = useLocalSearchParams();
  const poster_id = local.poster_id;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8000/profile/${poster_id}`
        );
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
    };

    const fetchFollowData = async () => {
      try {
        const [followersRes, followingRes] = await Promise.all([
          axios.get(`http://10.0.2.2:8000/followers/${poster_id}`),
          axios.get(`http://10.0.2.2:8000/following/${poster_id}`),
        ]);
        setFollowersCount(followersRes.data.users.length);
        setFollowingCount(followingRes.data.users.length);

        const currentUserId = 1; // Replace with the logged-in user's ID.
        setIsFollowing(followersRes.data.users.includes(currentUserId));
      } catch (error) {
        console.error("Error fetching follow data:", error);
      }
    };

    fetchProfileData();
    fetchFollowData();
  }, [poster_id]);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await axios.post("http://10.0.2.2:8000/unfollow", {
          user_id: poster_id,
          follower_id: 1, // Replace with the logged-in user's ID.
        });
        setFollowersCount((prev) => prev - 1);
      } else {
        await axios.post("http://10.0.2.2:8000/follow", {
          user_id: poster_id,
          follower_id: 1, // Replace with the logged-in user's ID.
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

      <Text style={styles.profileBio}>{bio}</Text>

      <View style={styles.profileStats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{followersCount}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{followingCount}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileHandle: {
    color: "gray",
  },
  profileBio: {
    textAlign: "center",
    margin: 20,
    fontSize: 14,
    color: "gray",
  },
  profileStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
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
  followButton: {
    alignSelf: "center",
    backgroundColor: "#06D001",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  followingButton: {
    backgroundColor: "#ccc",
  },
  followButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ProfileScreen;
