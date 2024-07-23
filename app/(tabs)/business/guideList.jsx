import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { images } from "../../../constants";
import { router } from "expo-router";

const guideList = () => {
  const users = [
    {
      id: 1,
      name: "Aamir Arshad",
      salary: "2,750",
      rating: 4.8,
      reviewCount: 73,
      profilePicture: images.person1,
    },
    {
      id: 2,
      name: "Marco Solo",
      salary: "1,000",
      rating: 4.2,
      reviewCount: 7,
      profilePicture: images.person2,
    },
    {
      id: 3,
      name: "Ana Bella",
      salary: "1,500",
      rating: 3.6,
      reviewCount: 34,
      profilePicture: images.person3,
    },
    {
      id: 4,
      name: "Marie Sire",
      salary: "1,500",
      rating: 4.2,
      reviewCount: 17,
      profilePicture: images.person4,
    },
    {
      id: 5,
      name: "Kamal Rathna",
      salary: "2,250",
      rating: 4.5,
      reviewCount: 9,
      profilePicture: images.person5,
    },
    {
      id: 6,
      name: "Kushan Santha",
      salary: "1,000",
      rating: 4.0,
      reviewCount: 24,
      profilePicture: images.person6,
    },
  ];
  return <GuideList users={users} />;
};

const GuideList = ({ users }) => {
  return (
    <ScrollView className="bg-white pt-4">
      {users.map((user) => (
        <View
          key={user.id}
          className="flex-row items-center p-3 bg-gray-300 rounded-lg shadow-md m-4 mt-3"
        >
          <Image
            source={user.profilePicture}
            className="w-20 h-20 rounded-full"
          />
          <View className="flex-1 ml-3">
            <View className="flex-row items-center">
              <FontAwesome name="star" size={14} color="orange" />
              <Text className="ml-1 text-sm text-gray-600">
                {user.rating} ({user.reviewCount})
              </Text>
            </View>
            <Text className="text-lg font-semibold">{user.name}</Text>
            <Text className="text-sm text-gray-500">
              Rs. {user.salary} / day
            </Text>
          </View>
          <TouchableOpacity
            className="p-2"
            onPress={() => router.push("/business/guideDetails")}
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

export default guideList;
