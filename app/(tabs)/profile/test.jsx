// import {
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import { FontAwesome } from "@expo/vector-icons";
// import { router } from "expo-router";
// import Icon from "react-native-vector-icons/Ionicons";
// import axios from "axios";

// const GuideList = () => {
//   const [guides, setGuides] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [liked, setLiked] = useState([]);

//   // Fetch guide list from API
//   const fetchGuideList = async () => {
//     try {
//       const response = await axios.get("http://10.0.2.2:8000/guides_all");
//       setGuides(response.data); // Assuming the API returns an array of guides
//       setLiked(response.data.map((guide) => guide.wishlist)); // Initialize liked state based on wishlist
//     } catch (error) {
//       console.error("Error fetching guides:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchGuideList();
//   }, []);

//   const handleLike = (index) => {
//     setLiked((prev) => {
//       const newLiked = [...prev];
//       newLiked[index] = !newLiked[index];
//       return newLiked;
//     });
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#06D001" />
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       {guides.map((guide, index) => (
//         <View key={guide.id} style={styles.guideCard}>
//           <Image
//             source={{ uri: guide.profile_pic }}
//             style={styles.profilePicture}
//           />
//           <View style={styles.guideInfo}>
//             <Text style={styles.guideName}>{guide.name}</Text>
//             <Text style={styles.guideDetails}>Language: {guide.language}</Text>
//             <Text style={styles.guideDetails}>Location: {guide.location}</Text>
//             <Text style={styles.guideDetails}>Rs. {guide.price} / day</Text>
//             <Text style={styles.guideDetails}>
//               Availability: {guide.availability ? "Available" : "Unavailable"}
//             </Text>
//           </View>
//           <TouchableOpacity
//             style={styles.detailsButton}
//             onPress={() =>
//               router.push({
//                 pathname: "/business/guideDetails",
//                 params: {
//                   id: guide.id,
//                   user: guide.name,
//                   price: guide.price,
//                   profile_pic: guide.profile_pic,
//                   about: guide.about,
//                   rating: 0, // Backend doesn't return rating currently
//                   location: guide.location,
//                   language: guide.language,
//                 },
//               })
//             }
//           >
//             <FontAwesome name="arrow-right" size={16} color="black" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => handleLike(index)}>
//             <Icon
//               name={liked[index] ? "heart" : "heart-outline"}
//               size={24}
//               color={liked[index] ? "red" : "black"}
//             />
//           </TouchableOpacity>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "white",
//     paddingVertical: 10,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   guideCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     backgroundColor: "#fff",
//     borderWidth: 2,
//     borderColor: "#06D001",
//     borderRadius: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     marginHorizontal: 25,
//     marginTop: 6,
//     marginBottom: 16,
//   },
//   profilePicture: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//   },
//   guideInfo: {
//     flex: 1,
//     marginLeft: 12,
//   },
//   guideName: {
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   guideDetails: {
//     fontSize: 14,
//     color: "#6b7280",
//   },
//   detailsButton: {
//     padding: 8,
//   },
// });

// export default GuideList;

// import {
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import { FontAwesome } from "@expo/vector-icons";
// import { router } from "expo-router";
// import Icon from "react-native-vector-icons/Ionicons";
// import axios from "axios";

// const GuideList = () => {
//   const [guides, setGuides] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [liked, setLiked] = useState([]);

//   // Fetch guide list from API
//   const fetchGuideList = async () => {
//     try {
//       const response = await axios.get("http://10.0.2.2:8000/guides_all");
//       setGuides(response.data);
//       setLiked(response.data.map((guide) => guide.wishlist));
//     } catch (error) {
//       console.error("Error fetching guides:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchGuideList();
//   }, []);

//   const handleLike = (index) => {
//     setLiked((prev) => {
//       const newLiked = [...prev];
//       newLiked[index] = !newLiked[index];
//       return newLiked;
//     });
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#06D001" />
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       {guides.map((guide, index) => (
//         <View key={guide.id} style={styles.guideCard}>
//           <Image
//             source={{
//               uri: guide.profile_pic
//                 ? `data:image/jpeg;base64,${guide.profile_pic}`
//                 : "https://via.placeholder.com/40",
//             }}
//             style={styles.profilePicture}
//           />
//           <View style={styles.guideInfo}>
//             <View style={styles.ratingContainer}>
//               <FontAwesome name="star" size={14} color="orange" />
//               <Text style={styles.ratingText}>
//                 {guide.wishlist ? guide.wishlist.length : 0}
//               </Text>
//             </View>
//             <Text style={styles.guideName}>{guide.name}</Text>
//             <Text style={styles.guideDetails}>Rs. {guide.price} / day</Text>
//           </View>
//           <TouchableOpacity
//             style={styles.detailsButton}
//             onPress={() =>
//               router.push({
//                 pathname: "/business/guideDetails",
//                 params: {
//                   id: guide.id,
//                   user: guide.name,
//                   price: guide.price,
//                   profile_pic: guide.profile_pic,
//                   about: guide.about,
//                   rating: guide.wishlist ? guide.wishlist.length : 0,
//                   location: guide.location,
//                 },
//               })
//             }
//           >
//             <FontAwesome name="arrow-right" size={16} color="black" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => handleLike(index)}>
//             <Icon
//               name={liked[index] ? "heart" : "heart-outline"}
//               size={24}
//               color={liked[index] ? "red" : "black"}
//             />
//           </TouchableOpacity>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "white",
//     paddingVertical: 10,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   guideCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     backgroundColor: "#fff",
//     borderWidth: 2,
//     borderColor: "#06D001",
//     borderRadius: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     marginHorizontal: 25,
//     marginTop: 6,
//     marginBottom: 16,
//   },
//   profilePicture: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//   },
//   guideInfo: {
//     flex: 1,
//     marginLeft: 12,
//   },
//   guideName: {
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   guideDetails: {
//     fontSize: 14,
//     color: "#6b7280",
//   },
//   detailsButton: {
//     padding: 8,
//   },
//   ratingContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
// });

// export default GuideList;
