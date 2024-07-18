import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { icons, images } from "../../../constants";

const ProfilePage = () => {
  return (
    <ScrollView
      className="bg-white"
      contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
    >
      <View className="flex">
        <View className="items-center">
          <Image
            source={images.person1}
            className="w-45 h-45 rounded-full mb-10 mt-12 items-center"
          />
        </View>
        <View className="flex-row justify-between mb-4">
          <Text className="text-2xl font-bold mb-1">Aamir Arshad</Text>
          <Image source={icons.heart} className="w-8 h-8 items-center" />
        </View>
        <View className="flex-row gap-40 mb-2">
          <View className="flex-row items-center mb-2">
            <Image source={icons.star} className="w-6 h-6" />
            <Text className="ml-1">4.8 (73 reviews)</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Image source={icons.location} className="w-5 h-6" />
            <Text className="ml-1">Angoda</Text>
          </View>
        </View>
      </View>

      <View className="p-5">
        <Text className="text-xl font-bold mb-4">About</Text>
        <Text className="mb-10" numberOfLines={7} ellipsizeMode="tail" li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          feugiat libero diam, ut fermentum justo commodo non. Interdum et
          malesuada fames ac ante ipsum primis in faucibus. Phasellus pretium
          elit ac nulla hendrerit, in fermentum mi cursus.Lorem Ipsum is simply
          dummy text of the printing and typesetting industry
        </Text>
        <TouchableOpacity className="bg-red-500 py-3 px-6 rounded-full self-center">
          <Text className="text-white font-bold">Book Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfilePage;
