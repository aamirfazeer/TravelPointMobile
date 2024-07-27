import React, { useState } from "react";
import {  View,  Text,  StyleSheet,  Image,  FlatList,  TouchableOpacity,  Dimensions,  ScrollView,} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { images } from "../../../constants";
import Icon from "react-native-vector-icons/AntDesign";

const posts = [images.travel1, images.travel2, images.travel3];

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

  const renderPostItem = ({ item }) => (
    <Image source={item} style={styles.postImage} />
  );

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

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={images.person1} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.profileName}>Dia Kumaran</Text>
          <Text style={styles.profileHandle}>@dia_kumar</Text>
        </View>

        <View style={styles.profileActions}>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Manage</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.messageButton}>
            
            <Icon name="message1" size={20} color="#fff" />
          </TouchableOpacity> */}
        </View>
      </View>

      <View>
        <Text style={styles.profileBio}>Traveling is my therapy</Text>
      </View>

      <View style={styles.profileStats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>232</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>112.5k</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>112.5k</Text>
          <Text style={styles.statLabel}>Followers</Text>
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
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.galleryContainer}
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
    justifyContent:"space-around"
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
    //marginVertical: 8,
    //textAlign: "center",
    fontSize: 14,
    marginTop: 12,
    //alignItems:'flex-start',
    //padding: 16
    marginLeft: 16,
    marginRight: 16
  },
  profileStats: {
    flexDirection: "row",
    //justifyContent: "space-around",
    // width: "100%",
    //marginVertical: 16,
    justifyContent: "space-around",
    marginTop: 16,
    //padding: 16
    marginLeft: 16,
    marginRight: 16
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
    width: "50%",
    height: 200,
    margin: 1,
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
});

export default ProfileScreen;
