import { StyleSheet, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import Icons from "react-native-vector-icons/MaterialIcons";

const TabIcon = ({ icon, color, name, focused }) => (
  <View className="items-center justify-center ">
    <Image
      source={icon}
      resizeMode="contain"
      style={{ tintColor: color }}
      className="rounded-full w-8 h-8"
    />
  </View>
);

const TabsLayout = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#002F43",
          tabBarInactiveTintColor: "#919598",
          tabBarStyle: {
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
              <Icons name="home" size={30} focused={focused} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Icons
                name="location-pin"
                size={30}
                focused={focused}
                color={color}
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
              <Icons
                name="add-to-photos"
                size={30}
                focused={focused}
                color={color}
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
              <Icons name="work" size={30} focused={focused} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.profile} focused={focused} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabsLayout;
export { TabIcon };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
