import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";

const BusinessPage = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex-1 items-center justify-center bg-white p-4">
        <Text className="text-2xl mb-6">What are you looking for?</Text>
        <TouchableOpacity className="bg-blue-600 p-4 rounded-lg mb-4">
          <Link href="/business/findGuide" className="text-white text-center">Tour Guides</Link>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-600 p-4 rounded-lg mb-4">
          <Text className="text-white text-center">Vehicle Rentals</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-600 p-4 rounded-lg mb-4">
          <Text className="text-white text-center">Travel Equipments</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BusinessPage;
