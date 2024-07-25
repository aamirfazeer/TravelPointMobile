// import { Stack } from "expo-router";

// const Stacklayout = () => {
//   return (
//     <Stack>
//         <Stack.Screen name="index" options={{ headerShown: false }} />
//         <Stack.Screen name="add_log" options={{ headerShown: false }} />
//         <Stack.Screen name="add_story" options={{ headerShown: false }} />
//     </Stack>
//   )
// }

// export default Stacklayout;

import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AddPost from "./index";
import AddLog from "./add_log";
import AddStory from "./add_story";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";


const Tab = createMaterialTopTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={[styles.tabButton, isFocused ? styles.selectedTab : null]}
          >
            <Text
              style={[
                styles.tabText,
                isFocused ? styles.selectedTabText : null,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const CreateTabNavigator = () => {

  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Post"
        component={AddPost}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Story"
        component={AddStory}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Log"
        component={AddLog}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default CreateTabNavigator;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
    gap: 15,
  },
  tabButton: {
    width: 85,
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
  },
  selectedTab: {
    backgroundColor: '#00FF00',
    borderColor: '#00FF00',
  },
  tabText: {
    textAlign: "center",
    fontSize: 16,
    color: '#000',
  },
  selectedTabText: {
    color: '#fff',
    fontWeight: "bold"
  },
});
