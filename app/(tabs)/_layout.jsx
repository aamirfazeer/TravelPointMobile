import { StyleSheet, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { Tabs } from "expo-router";
import Header from "../../components/Header";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const placeholderImage = require("../../assets/images/placeholder.png");

const TabsLayout = ({ children }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve user ID from AsyncStorage
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(parseInt(storedUserId, 10)); // Parse to integer
        }
      } catch (error) {
        console.error("Error retrieving user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  // Fetch profile picture from the backend
  useEffect(() => {
    const fetchProfileData = async (userId) => {
      if (userId !== null) {
        try {
          const response = await axios.get(
            `http://10.0.2.2:8000/profile/${userId}`
          );
          const { profilePic } = response.data;

          if (profilePic) {
            setProfilePic({ uri: `data:image/jpeg;base64,${profilePic}` });
          } else {
            setProfilePic(null); // Use placeholder if no profile picture is available
          }
        } catch (error) {
          console.error("Error fetching profile details:", error);
        }
      }
    };

    fetchProfileData(userId);

    // Set interval to fetch profilePic every 30 seconds
    const intervalId = setInterval(() => fetchProfileData(userId), 30000); // Fetch every 30 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [userId]);

  const TabIcon = ({ profilePic, color, name, focused }) => (
    <View
      className="items-center justify-center"
      style={{
        borderWidth: focused ? 2.5 : 0, // Add border when focused
        borderColor: focused ? "#002F43" : "transparent", // Green border when focused
        borderRadius: 100, // Make sure the border is rounded
        padding: 1.8, // Add some padding inside the border
      }}
    >
      <Image
        source={profilePic ? profilePic : placeholderImage}
        resizeMode="contain"
        style={{ tintColor: color, width: 31.5, height: 31.5, borderRadius: 100 }}
      />
    </View>
  );

  const TabIcons = ({ name, focused, color, size }) => (
    <Ionicons
      name={focused ? name : `${name}-outline`}
      size={size}
      color={color}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#002F43",
          tabBarInactiveTintColor: "#002F43",
          tabBarStyle: {
            paddingHorizontal: 5,
            backgroundColor: "white",
            borderTopWidth: 0,
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcons name="home" focused={focused} color={color} size={35} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcons
                name="location"
                focused={focused}
                color={color}
                size={35}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcons
                name="duplicate"
                focused={focused}
                color={color}
                size={35}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="business"
          options={{
            title: "Business",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcons
                name="briefcase"
                focused={focused}
                color={color}
                size={35}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon profilePic={profilePic} focused={focused} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
