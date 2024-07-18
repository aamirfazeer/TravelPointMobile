import React from "react";
import { View, Text, Button } from "react-native";
import { router } from "expo-router";

const ExplorePage = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg">Explore Page</Text>
      <Button
        title="Go to Detail"
        handlePress={() => router.push("../explore/detail")}
      />
    </View>
  );
};

export default ExplorePage;
