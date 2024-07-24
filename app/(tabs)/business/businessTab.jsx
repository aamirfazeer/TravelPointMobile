import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BusinessPage from "./index";
import ServiceProvider from "./serviceProvider";

const Tab = createMaterialTopTabNavigator();

const BusinessTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#446482",
        tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
        tabBarStyle: { backgroundColor: "#002F43" },
        tabBarIndicatorStyle: {
          backgroundColor: "#446482",
          height: "100%",
          borderRadius: 25,
        },
        tabBarIndicatorContainerStyle: {
          marginHorizontal: 10,
          borderRadius: 25,
        },
      }}
    >
      <Tab.Screen
        name="index"
        component={BusinessPage}
        options={{ tabBarLabel: "SERVICE PURVEYORS" }}
      />
      <Tab.Screen
        name="ServiceProvider"
        component={ServiceProvider}
        options={{ tabBarLabel: "SERVICE PROVIDERS" }}
      />
    </Tab.Navigator>
  );
};

export default BusinessTab;
