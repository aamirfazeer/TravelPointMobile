import { router } from "expo-router";
import React from "react";
import { View, Text, Button } from "react-native";

const ProfilePage = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg">Profile Page</Text>
      <Button
        title="Go to Detail"
        handlePress={() => router.push("../../screen/BusinessHome")}
      />
    </View>
  );
};

export default ProfilePage;
