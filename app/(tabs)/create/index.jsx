import React from "react";
import { View, Text, Button } from "react-native";
import { router } from "expo-router";

const CreatePage = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg">Create Page</Text>
      <Button
        title="Go to Detail"
        handlePress={() => router.push("../create/detail")}
      />
    </View>
  );
};

export default CreatePage;
