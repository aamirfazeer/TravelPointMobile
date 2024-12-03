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
// import Icons from "react-native-vector-icons/Ionicons";

// const VehicleDetails = () => {
//   return (
//     <ScrollView
//       style={styles.container}
//       contentContainerStyle={styles.contentContainer}
//     >
//       <View style={styles.profileContainer}>
//         <View style={styles.imageContainer}>
//           <Image source={images.car} style={styles.image} />
//         </View>
//         <View style={styles.header}>
//           <Text style={styles.title}>Honda Fit GP5</Text>
//           <Image source={icons.heart} style={styles.iconHeart} />
//         </View>
//         <View style={styles.infoRow}>
//           <View style={styles.infoItem}>
//             <Icons name="star" size={20} color={"blue"} />
//             <Text style={styles.infoText}>4.8 (73 reviews)</Text>
//           </View>
//           <View style={styles.infoItem}>
//             <Icons name="location-sharp" size={20} color={"green"} />
//             <Text style={styles.infoText}>Angoda</Text>
//           </View>
//         </View>
//       </View>

//       <View style={styles.line} />

//       <View>
//         <Text style={styles.detailTitle}>Details</Text>
//       </View>

//       <View style={styles.detailsContainer}>
//         <View style={styles.detailItem}>
//           <Text style={styles.detailLabel}>Mileage Per Liter:</Text>
//           <Text style={styles.detailValue}>15 kmpl</Text>
//         </View>
//         <View style={styles.detailItem}>
//           <Text style={styles.detailLabel}>Capacity:</Text>
//           <Text style={styles.detailValue}>4 person</Text>
//         </View>
//         <View style={styles.detailItem}>
//           <Text style={styles.detailLabel}>Price:</Text>
//           <Text style={styles.detailValue}>Rs. 3000</Text>
//         </View>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() =>
//             router.push({
//               pathname: "/business/bookingUser",
//               params: { id, user, price, location, bookingType: 2 },
//             })
//           }
//         >
//           <Text style={styles.buttonText}>Book Now</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default VehicleDetails;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "white",
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     marginHorizontal: 15,
//   },
//   profileContainer: {
//     flex: 1,
//   },
//   imageContainer: {
//     alignItems: "center",
//   },
//   image: {
//     height: 250,
//     width: 250,
//     borderRadius: 100,
//     marginTop: 35,
//     marginBottom: 45,
//     alignSelf: "center",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 4,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 1,
//   },
//   iconHeart: {
//     width: 32,
//     height: 32,
//     alignItems: "center",
//   },
//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 2,
//     gap: 140,
//   },
//   infoItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 2,
//   },
//   icon: {
//     width: 24,
//     height: 24,
//   },
//   iconLocation: {
//     width: 20,
//     height: 24,
//   },
//   infoText: {
//     marginLeft: 4,
//     textAlign: "right",
//   },
//   line: {
//     height: 1.5,
//     width: "88%",
//     backgroundColor: "black",
//     marginVertical: 10,
//   },
//   detailTitle: {
//     color: "#1E3A8A",
//     fontSize: 20,
//     marginTop: 15,
//     marginBottom: 10,
//     textAlign: "center",
//     width: "100%",
//   },
//   detailsContainer: {
//     padding: 20,
//     marginBottom: 20,
//   },
//   detailItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//     gap: 50,
//   },
//   detailLabel: {
//     fontWeight: "bold",
//   },
//   detailValue: {
//     marginLeft: 4,
//   },
//   button: {
//     backgroundColor: "#06D001",
//     paddingVertical: 12,
//     paddingHorizontal: 28,
//     borderRadius: 9999,
//     alignSelf: "center",
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { icons, images } from "../../../constants";
import Icons from "react-native-vector-icons/Ionicons";
import { useRouter, useLocalSearchParams } from "expo-router";

const VehicleDetails = () => {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id, type, price, photo, details, location, milege, capacity, rating } = useLocalSearchParams();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={
              photo
                ? { uri: `data:image/jpeg;base64,${photo}` }
                : "https://via.placeholder.com/40"
            }
            style={styles.image}
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>{type}</Text>
          <Icons name="heart-outline" size={32} color="red" />
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Icons name="star" size={20} color={"blue"} />
            <Text style={styles.infoText}>{rating}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icons name="location-sharp" size={20} color={"green"} />
            <Text style={styles.infoText}>{location || "Unknown"}</Text>
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
          <Text style={styles.detailValue}>{milege || "N/A"}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Capacity:</Text>
          <Text style={styles.detailValue}>{capacity || "N/A"}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Price:</Text>
          <Text style={styles.detailValue}>
            Rs. {price || "N/A"}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: "/business/bookingUser",
              params: {
                id: id,
                price: price,
                location: location,
                bookingType: 2,
              },
            })
          }
        >
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
    backgroundColor: "#06D001",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 9999,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
