// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
// } from "react-native";
// import { icons, images } from "../../../constants";

// const vehicleDetails = () => {
//   return (
//     <ScrollView
//       className="bg-white"
//       contentContainerStyle={{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <View className="flex">
//         <View className="items-center">
//           <Image
//             source={images.car}
//             className="items-center"
//             style={styles.image}
//           />
//         </View>
//         <View className="flex-row justify-between mb-4">
//           <Text className="text-2xl font-bold mb-1">Honda Fit GP5</Text>
//           <Image source={icons.heart} className="w-8 h-8 items-center" />
//         </View>
//         <View className="flex-row gap-40 mb-2">
//           <View className="flex-row items-center mb-2">
//             <Image source={icons.star} className="w-6 h-6" />
//             <Text className="ml-1 text-right">4.8 (73 reviews)</Text>
//           </View>
//           <View className="flex-row items-center mb-2">
//             <Image source={icons.location} className="w-5 h-6" />
//             <Text className="ml-1 text-right">Angoda</Text>
//           </View>
//         </View>
//       </View>

//       <View style={styles.line} />

//       <View className="">
//         <Text
//           className=" text-blue-700 text-xl mt-4 mb-1 text-left"
//           style={styles.detail}
//         >
//           Details
//         </Text>
//       </View>

//       <View className="p-5">
//         <View className="mb-8">
//           <View className="flex-row justify-between mb-2 gap-20">
//             <Text className="font-bold">Mileage Per Liter:</Text>
//             <Text className="ml-1">15 kmpl</Text>
//           </View>
//           <View className="flex-row justify-between mb-2 gap-20">
//             <Text className="font-bold">Capacity:</Text>
//             <Text className="ml-1">4 person</Text>
//           </View>
//           <View className="flex-row justify-between mb-2 gap-20">
//             <Text className="font-bold">Price:</Text>
//             <Text className="ml-1">Rs. 3000</Text>
//           </View>
//         </View>
//         <TouchableOpacity className="bg-red-500 py-3 px-7 rounded-full self-center shadow-lg">
//           <Text className="text-white text-lg font-bold">Book Now</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default vehicleDetails;

// const styles = StyleSheet.create({
//   image: {
//     height: 210,
//     width: 210,
//     borderRadius: 100,
//     marginBottom: 45,
//     alignSelf: "center",
//   },
//   detail: {
//     textAlign: "left",
//   },
//   line: {
//     height: 1,
//     width: "88%",
//     backgroundColor: "black",
//     marginVertical: 20
//   },
// });

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

const VehicleDetails = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image source={images.car} style={styles.image} />
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>Honda Fit GP5</Text>
          <Image source={icons.heart} style={styles.iconHeart} />
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Image source={icons.star} style={styles.icon} />
            <Text style={styles.infoText}>4.8 (73 reviews)</Text>
          </View>
          <View style={styles.infoItem}>
            <Image source={icons.location} style={styles.iconLocation} />
            <Text style={styles.infoText}>Angoda</Text>
          </View>
        </View>
      </View>

      <View style={styles.line} />

      <View>
        <Text style={styles.detailTitle}>Details</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Mileage Per Liter:</Text>
          <Text style={styles.detailValue}>15 kmpl</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Capacity:</Text>
          <Text style={styles.detailValue}>4 person</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Price:</Text>
          <Text style={styles.detailValue}>Rs. 3000</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default VehicleDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
  },
  profileContainer: {
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    height: 250,
    width: 250,
    borderRadius: 100,
    marginTop: 35,
    marginBottom: 45,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 1,
  },
  iconHeart: {
    width: 32,
    height: 32,
    alignItems: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
    gap: 140,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconLocation: {
    width: 20,
    height: 24,
  },
  infoText: {
    marginLeft: 4,
    textAlign: "right",
  },
  line: {
    height: 1.5,
    width: "88%",
    backgroundColor: "black",
    marginVertical: 10,
  },
  detailTitle: {
    color: "#1E3A8A",
    fontSize: 20,
    marginTop: 15,
    marginBottom: 10,
    textAlign: "center",
    width: "100%",
  },
  detailsContainer: {
    padding: 20,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    gap: 50,
  },
  detailLabel: {
    fontWeight: "bold",
  },
  detailValue: {
    marginLeft: 4,
  },
  button: {
    backgroundColor: "#EF4444",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 9999,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

