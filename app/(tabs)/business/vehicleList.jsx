import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { images } from "../../../constants";
import { router } from "expo-router";

const vehicleList = () => {
  const vehicles = [
    {
      id: 1,
      model: "BMW M3",
      rentPrice: "2,750",
      rating: 4.8,
      reviewCount: 73,
      profilePicture: images.vehicle1,
    },
    {
      id: 2,
      model: "Toyota Hiace",
      rentPrice: "1,000",
      rating: 4.2,
      reviewCount: 7,
      profilePicture: images.vehicle2,
    },
    {
      id: 3,
      model: "Suzuki Alto",
      rentPrice: "1,500",
      rating: 3.6,
      reviewCount: 34,
      profilePicture: images.vehicle3,
    },
    {
      id: 4,
      model: "Honda Fit",
      rentPrice: "1,500",
      rating: 4.2,
      reviewCount: 17,
      profilePicture: images.vehicle4,
    },
    {
      id: 5,
      model: "Nissan March",
      rentPrice: "2,250",
      rating: 4.5,
      reviewCount: 9,
      profilePicture: images.vehicle5,
    },
    {
      id: 6,
      model: "Nissan Leaf",
      rentPrice: "1,000",
      rating: 4.0,
      reviewCount: 24,
      profilePicture: images.vehicle6,
    },
  ];
  return <VehicleList vehicles={vehicles} />;
};

const VehicleList = ({ vehicles }) => {
  return (
    <ScrollView className="bg-white pt-4">
      {vehicles.map((vehicle) => (
        <View
          key={vehicle.id}
          className="flex-row items-center p-3 bg-gray-300 rounded-lg shadow-md m-4 mt-3"
        >
          <Image
            source={vehicle.profilePicture}
            className="w-20 h-20 rounded-full"
          />
          <View className="flex-1 ml-3">
            <View className="flex-row items-center">
              <FontAwesome name="star" size={14} color="orange" />
              <Text className="ml-1 text-sm text-gray-600">
                {vehicle.rating} ({vehicle.reviewCount})
              </Text>
            </View>
            <Text className="text-lg font-semibold">{vehicle.model}</Text>
            <Text className="text-sm text-gray-500">
              Rs. {vehicle.rentPrice} / day
            </Text>
          </View>
          <TouchableOpacity
            className="p-2"
            onPress={() => router.push("/business/vehicleDetails")}
          >
            <FontAwesome name="arrow-right" size={16} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2">
            <FontAwesome name="heart" size={16} color="black" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default vehicleList;
