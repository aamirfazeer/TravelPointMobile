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

const equipmentDetails = () => {
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
          <Text className="text-2xl font-bold mb-1">Nightlight</Text>
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

export default equipmentDetails;

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
    marginVertical: 20,
  },
});
