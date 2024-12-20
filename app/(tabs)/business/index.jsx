import React, { useState ,useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { images } from "../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router"
import TravelerBookings from './travelerBooking';

const Tab = createMaterialTopTabNavigator();

const getUserId = async () => {
  try {
    const id = await AsyncStorage.getItem("userId");
    return id !== null ? parseInt(id) : null;
  } catch (error) {
    console.error("Error fetching user ID:", error);
    return null;
  }
};

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

const handleTourGuide = async () => {
  const userId = await getUserId();
  if (!userId) {
    console.error("User ID not found");
    return;
  }

  try {
    const response = await axios.get(
      `http://10.0.2.2:8000/guides/status/${userId}`
    );
    const { status } = response.data;
    if (status === 1) {
      router.push("/business/reqProgressing");
    } else if (status === 2) {
      router.push("/business/guideServiceProvider");
    } else {
      router.push("/business/guideForm");
    }
  } catch (error) {
    console.error("Error checking guide status:", error);
    Alert.alert("Error", "Unable to fetch guide status. Please try again later.");
  }
};


const checkVehicleStatus = async (userId) => {
  try {
    const response = await axios.get(
      `http://10.0.2.2:8000/vehicles/status/${userId}`
    );
    return response.data.status;
  } catch (error) {
    console.error("Error fetching vehicle status:", error);
    return null;
  }
};

const handleVehicleRentals = async () => {
  const userId = await getUserId();
  if (!userId) {
    console.error("User ID not found");
    return;
  }

  const status = await checkVehicleStatus(userId);

  if (status === null) {
    Alert.alert("Error", "Could not fetch vehicle status. Try again later.");
    return;
  }

  if (status === 1) {
    router.push("/business/reqProgressing");
  } else if (status === 2) {
    router.push("/business/vehicleServiceProvider");
  } else {
    router.push("/business/vehicleForm");
  }
};

const handleEquipmentRentals = async () => {
  const userId = await getUserId();
  if (!userId) {
    console.error("User ID not found");
    return;
  }
console.log(userId);
  try {
    const response = await axios.get(
      `http://10.0.2.2:8000/equipment/status/${userId}`
    );
    const { status } = response.data;
    console.log(status);
    if (status === 1) {
      router.push("/business/reqProgressing");
    } else if (status === 2) {
      router.push("/business/equipmentServiceProvider");
    } else {
      router.push("/business/equipmentForm");
    }
  } catch (error) {
    console.error("Error fetching equipment status:", error);
    Alert.alert("Error", "Unable to fetch equipment status. Please try again later.");
  }
};


const BusinessPage = () => {
  return (
    <View style={styles.scontainer}>
      <Text style={styles.stitle}>What are you looking for?</Text>

      <TouchableOpacity
        style={styles.scard}
        onPress={() => router.push("/business/findGuide")}
      >
        <Image source={images.guide_} style={styles.simage} />
        <Text style={styles.scardText}>Tour Guides</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.scard}
        onPress={() => router.push("/business/findVehicle")}
      >
        <Image source={images.vehicle_} style={styles.simage} />
        <Text style={styles.scardText}>Vehicle Rentals</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.scard}
        onPress={() => router.push("/business/findEquipment")}
      >
        <Image source={images.equipment_} style={styles.simage} />
        <Text style={styles.scardText}>Travel Equipments</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProvideServiceScreen = () => {
  return (
    <View style={styles.spcontainer}>
      <Text style={styles.sptitle}>Provide a Service</Text>
      <TouchableOpacity
        style={styles.spbutton}
        onPress={handleTourGuide}
      >
        <Text style={styles.spbuttonText}>Tour Guide</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.spbutton}
        onPress={handleVehicleRentals}
      >
        <Text style={styles.spbuttonText}>Rent Out Vehicles</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.spbutton}
        onPress={handleEquipmentRentals}
      >
        <Text style={styles.spbuttonText}>Rent Out Equipment</Text>
      </TouchableOpacity>
    </View>
  );
};

const BusinessTab = () => {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Service"
        component={BusinessPage}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="service Provider"
        component={ProvideServiceScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="My Booking"
        component={TravelerBookings} 
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BusinessTab;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",  // Distribute tabs evenly
    paddingVertical: 10,
    backgroundColor: "#fff",
    marginHorizontal: 5,
  },
  tabButton: {
    flex: 1,  // Allow tab buttons to expand and fill available space
    marginHorizontal: 5,
    paddingVertical: 10,  // Adjust the padding to ensure the text fits well
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedTab: {
    backgroundColor: "#00cc44",
    borderColor: "#00cc44",
  },
  tabText: {
    textAlign: "center",
    fontSize: 14,
    color: "#000",
  },
  selectedTabText: {
    color: "#fff",
    fontWeight: "bold",
  },

  spcontainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingTop: 35,
  },
  sptitle: {
    fontSize: 30,
    color: "#006400",
    marginBottom: 10,
    fontWeight: "bold",
  },
  spbutton: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 15,
    borderColor: "#000",
    shadowColor: "#00cc44",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },
  spbuttonText: {
    color: "#00cc44",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  scontainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    alignItems: 'center',
    paddingTop: 15,
  },
  stitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 35,
    color: '#006400',
  },
  scard: {
    width: "100%",
    marginBottom: 25,
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  simage: {
    width: "100%",
    height: 150,
    opacity: 0.75,
  },
  scardText: {
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    position: "absolute",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
    width: "100%",
    top: "40%",
  },
});
