import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { images } from "../../../constants";

const equipmentList = () => {
  const vehicles = [
    {
      id: 1,
      model: "Gas Kettle",
      rentPrice: "2,750",
      rating: 4.8,
      reviewCount: 73,
      profilePicture: images.equipment1,
    },
    {
      id: 2,
      model: "Backpack",
      rentPrice: "1,000",
      rating: 4.2,
      reviewCount: 7,
      profilePicture: images.equipment2,
    },
    {
      id: 3,
      model: "Nightlight",
      rentPrice: "1,500",
      rating: 3.6,
      reviewCount: 34,
      profilePicture: images.equipment3,
    },
    {
      id: 4,
      model: "Camping Bag",
      rentPrice: "1,500",
      rating: 4.2,
      reviewCount: 17,
      profilePicture: images.equipment4,
    },
    {
      id: 5,
      model: "Gas Furnace",
      rentPrice: "2,250",
      rating: 4.5,
      reviewCount: 9,
      profilePicture: images.equipment5,
    },
    {
      id: 6,
      model: "Flashlight",
      rentPrice: "1,000",
      rating: 4.0,
      reviewCount: 24,
      profilePicture: images.equipment6,
    },
  ];
  return <EquipmentList equipments={equipments} />;
};

const EquipmentList = ({ equipments }) => {
  return (
    <ScrollView className="bg-white pt-4">
      {equipments.map((equipment) => (
        <View
          key={equipment.id}
          className="flex-row items-center p-3 bg-blue-200 rounded-lg shadow-md m-4 mt-3"
        >
          <Image
            source={equipment.profilePicture}
            className="w-20 h-20 rounded-full"
          />
          <View className="flex-1 ml-3">
            <View className="flex-row items-center">
              <FontAwesome name="star" size={14} color="orange" />
              <Text className="ml-1 text-sm text-gray-600">
                {equipment.rating} ({equipment.reviewCount})
              </Text>
            </View>
            <Text className="text-lg font-semibold">{equipment.model}</Text>
            <Text className="text-sm text-gray-500">
              Rs. {equipment.rentPrice} / day
            </Text>
          </View>
          <TouchableOpacity className="p-2">
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

export default equipmentList;
