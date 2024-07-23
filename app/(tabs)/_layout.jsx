import { StyleSheet, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import Header from "../../components/Header";
import BackButton from "../../components/BackButton";

const TabIcon = ({ icon, color, name, focused }) => (
  <View className="items-center justify-center gap-1">
    <Image
      source={icon}
      resizeMode="contain"
      style={{ tintColor: color }}
      className="w-6 h-6"
    />
    <Text
      className={`${focused ? "font-semibold" : "font-normal"} text-xs`}
      style={{ color }}
    >
      {name}
    </Text>
  </View>
);

const TabsLayout = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View>
        <BackButton handlePress={() => router.push("../")} />
      </View>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#002F43",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: "bg-white border-t border-gray-300 h-16",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.explore}
                color={color}
                name="Explore"
                focused={focused}
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
              <TabIcon
                icon={icons.create}
                color={color}
                name="Create"
                focused={focused}
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
              <TabIcon
                icon={icons.business}
                color={color}
                name="Business"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
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
