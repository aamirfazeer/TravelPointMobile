// screens/ProfileScreen.js
import React, { useState}  from "react";
import {  View,  Text,  StyleSheet,  Image,FlatList,  TouchableOpacity,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../../constants";
//import { LuMessageCircle } from "react-icons/lu";
import Icon from 'react-native-vector-icons/AntDesign';



const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('Gallery');
  const posts = [images.travel1, images.travel2, images.travel3];

  const ProfileHeader = () => {
    return (
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <View style={styles.profileInfo}>
            <Image source={images.profile1} style={styles.profileImage} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>Dia Kumaran</Text>
              <Text style={styles.username}>@dia_kumaran</Text>
            </View>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.buttonText}>+ Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton}>
            <Icon name="message1" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.bio}>Traveling is my therapy</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>232</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>112.5k</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>112.5k</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  const TabBar = () => {
    return (
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Gallery' && styles.activeTab]}
          onPress={() => setActiveTab('Gallery')}
        >
          <Text style={[styles.tabText, activeTab === 'Gallery' && styles.activeTabText]}>Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Logs' && styles.activeTab]}
          onPress={() => setActiveTab('Logs')}
        >
          <Text style={[styles.tabText, activeTab === 'Logs' && styles.activeTabText]}>Logs</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const PostGrid = ({ posts }) => {
    const renderItem = ({ item }) =>
      item ? <Image source={item} style={styles.image} /> : null;

    return (
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        style={styles.grid}
      />
    );
  };


  return (
    <View style={styles.container}>
      <ProfileHeader />
      <TabBar />
      {activeTab === 'Gallery' ? (
        <PostGrid posts={posts} />
      ) : (
        <View style={styles.logsContainer}>
          <Text style={styles.logsText}>Logs content goes here</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    padding: 16,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  textContainer: {
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  username: {
    fontSize: 14,
    color: "gray",
  },
  bio: {
    fontSize: 14,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  followButton: {
    // marginTop: 16,
    backgroundColor: "#1DA1F2",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    //marginRight: 8,
    marginLeft: "auto",
  },
  messageButton: {
    backgroundColor: "#ccc",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginLeft: "auto",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "gray",
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'space-around',
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  activeTabText: {
    color: '#000',
  },

  grid: {
    padding: 1,
  },
  image: {
    width: "50%",
    height: 200,
    margin: 1,
  },
  logsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logsText: {
    fontSize: 18,
    color: 'gray',
  },
});

export default ProfileScreen;
