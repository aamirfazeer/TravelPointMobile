import React from "react";
import { View, Text, Button } from "react-native";
import { router } from "expo-router";

const HomePage = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg">Home Page</Text>
      <Button
        title="Go to Detail"
        handlePress={() => router.push("../home/detail")}
      />
    </View>
  );
};

export default HomePage;
