import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { icons, images } from "../../../constants";

const vehicleDetails = () => {
  return (
    <ScrollView
      className="bg-white"
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View className="flex">
        <View className="items-center">
          <Image
            source={images.car}
            className="items-center"
            style={styles.image}
          />
        </View>
        <View className="flex-row justify-between mb-4">
          <Text className="text-2xl font-bold mb-1">Honda Fit GP5</Text>
          <Image source={icons.heart} className="w-8 h-8 items-center" />
        </View>
        <View className="flex-row gap-40 mb-2">
          <View className="flex-row items-center mb-2">
            <Image source={icons.star} className="w-6 h-6" />
            <Text className="ml-1 text-right">4.8 (73 reviews)</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Image source={icons.location} className="w-5 h-6" />
            <Text className="ml-1 text-right">Angoda</Text>
          </View>
        </View>
      </View>

      <View style={styles.line} />

      <View className="">
        <Text
          className=" text-blue-700 text-xl mt-4 mb-1 text-left"
          style={styles.detail}
        >
          Details
        </Text>
      </View>

      <View className="p-5">
        <View className="mb-8">
          <View className="flex-row justify-between mb-2 gap-20">
            <Text className="font-bold">Mileage Per Liter:</Text>
            <Text className="ml-1">15 kmpl</Text>
          </View>
          <View className="flex-row justify-between mb-2 gap-20">
            <Text className="font-bold">Capacity:</Text>
            <Text className="ml-1">4 person</Text>
          </View>
          <View className="flex-row justify-between mb-2 gap-20">
            <Text className="font-bold">Price:</Text>
            <Text className="ml-1">Rs. 3000</Text>
          </View>
        </View>
        <TouchableOpacity className="bg-red-500 py-3 px-7 rounded-full self-center shadow-lg">
          <Text className="text-white text-lg font-bold">Book Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default vehicleDetails;

const styles = StyleSheet.create({
  image: {
    height: 210,
    width: 210,
    borderRadius: 100,
    marginBottom: 45,
    alignSelf: "center",
  },
  detail: {
    textAlign: "left",
  },
  line: {
    height: 1,
    width: "88%",
    backgroundColor: "black",
    marginVertical: 20
  },
});
