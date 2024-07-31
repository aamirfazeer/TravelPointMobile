// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   Animated,
//   Dimensions,
//   Image,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import axios from "axios";
// import Icon from "react-native-vector-icons/MaterialIcons";

// const { height } = Dimensions.get("window");

// const comments = () => {
//   const [comments, setComments] = useState([]);
//   const [commentText, setCommentText] = useState("");
//   const slideAnim = useRef(new Animated.Value(height)).current;

//   useEffect(() => {
//     // Fetch comments from backend
//     axios
//       .get("https://your-backend-endpoint.com/api/comments")
//       .then((response) => setComments(response.data))
//       .catch((error) => console.error(error));
//   }, []);

//   const handleAddComment = () => {
//     // Handle adding a comment to the backend
//     axios
//       .post("https://your-backend-endpoint.com/api/comments", {
//         text: commentText,
//       })
//       .then((response) => {
//         setComments([...comments, response.data]);
//         setCommentText("");
//       })
//       .catch((error) => console.error(error));
//   };

//   const handleSlideUp = () => {
//     Animated.timing(slideAnim, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.commentContainer}>
//       <Image source={{ uri: item.avatar }} style={styles.avatar} />
//       <View style={styles.commentContent}>
//         <Text style={styles.commentName}>{item.name}</Text>
//         <Text style={styles.commentTime}>{item.time}</Text>
//         <Text style={styles.commentText}>{item.text}</Text>
//         <View style={styles.commentActions}>
//           <Text style={styles.likes}>{item.likes} Likes</Text>
//           <TouchableOpacity>
//             <Text style={styles.reply}>Reply</Text>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Icon name="favorite-border" size={20} color="#444" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );

//   return (
// <SafeAreaView style={styles.safeArea}>
//   <View style={styles.container}>
//     <Text style={styles.header}>Comments</Text>
//     <View style={styles.line} />
//     <FlatList
//       data={comments}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.id.toString()}
//     />
//     <View style={styles.commentContainer}>
//       <TextInput
//         style={styles.commentInput}
//         placeholder="Type a comment..."
//         value={commentText}
//         onChangeText={setCommentText}
//       />
//       <TouchableOpacity onPress={handleAddComment}>
//         <Text style={styles.sendButton}>Send</Text>
//       </TouchableOpacity>
//     </View>
//   </View>
// </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   container: {
//     flex: 1,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   line: {
//     height: 1.5,
//     backgroundColor: "black",
//     marginVertical: 10,
//   },
//   commentContainer: {
//     flexDirection: "row",
//     marginBottom: 10,
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
//   commentContent: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   commentName: {
//     fontWeight: "bold",
//   },
//   commentTime: {
//     color: "#666",
//     fontSize: 12,
//   },
//   commentText: {
//     marginTop: 5,
//   },
//   commentActions: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 5,
//   },
//   likes: {
//     marginRight: 15,
//   },
//   reply: {
//     marginRight: 15,
//     color: "#1e90ff",
//   },
//   addCommentButton: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: "#f1f1f1",
//     borderRadius: 5,
//   },
//   addCommentText: {
//     color: "#666",
//   },
//     commentInputContainer: {
//       position: "absolute",
//       bottom: 0,
//       left: 0,
//       right: 0,
//       backgroundColor: "#fff",
//       borderTopWidth: 1,
//       borderTopColor: "#ddd",
//       flexDirection: "row",
//       alignItems: "center",
//       padding: 20,
//     },
//   commentInput: {
//     flex: 1,
//     height: 40,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     // position: "absolute",
//     // bottom: 0,
//     // left: 0,
//     // right: 0,
//     // backgroundColor: "#fff",
//     // borderTopWidth: 1,
//     // borderTopColor: "#ddd",
//     // flexDirection: "row",
//     // alignItems: "center",
//     // padding: 10,
//     // margin: 15,
//   },
//   sendButton: {
//     marginLeft: 10,
//     color: "#1e90ff",
//     alignItems: "center"
//   },
// });

// export default comments;

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Images from "../../../constants/images";
import { SafeAreaView } from "react-native-safe-area-context";

const commentsData = [
  {
    id: "1",
    name: "Dia Kumaran",
    time: "1h ago",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    likes: 56,
    isLiked: true,
    image: Images.profile,
  },
  {
    id: "2",
    name: "Fathima Hanan",
    time: "6h ago",
    text: "It has survived not only five centuries, but also the leap into electronic typesetting.",
    likes: 8,
    isLiked: false,
    image: Images.profile,
  },
  {
    id: "3",
    name: "Kanchana Mendis",
    time: "1d ago",
    text: "Software like Aldus PageMaker including versions of Lorem Ipsum.",
    likes: 0,
    isLiked: false,
    image: Images.profile,
  },
  {
    id: "4",
    name: "Dia Kumaran",
    time: "1h ago",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    likes: 56,
    isLiked: true,
    image: Images.profile,
  },
  {
    id: "5",
    name: "Fathima Hanan",
    time: "6h ago",
    text: "It has survived not only five centuries, but also the leap into electronic typesetting.",
    likes: 8,
    isLiked: false,
    image: Images.profile,
  },
  {
    id: "6",
    name: "Kanchana Mendis",
    time: "1d ago",
    text: "Software like Aldus PageMaker including versions of Lorem Ipsum.",
    likes: 0,
    isLiked: false,
    image: Images.profile,
  },
];

const CommentSection = () => {
  const renderComment = ({ item }) => (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.commentContainer}>
          <Image source={item.image} style={styles.profileImage} />
          <View style={styles.commentContent}>
            <View style={styles.commentHeader}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <Text style={styles.text}>{item.text}</Text>
            <View style={styles.commentFooter}>
              <Text style={styles.likes}>{item.likes} Likes</Text>
              <TouchableOpacity>
                <Text style={styles.reply}>Reply</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Icon
              name={item.isLiked ? "heart" : "heart-o"}
              size={20}
              color={item.isLiked ? "red" : "grey"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Comments</Text>
        <View style={styles.line} />
        <FlatList
          data={commentsData}
          keyExtractor={(item) => item.id}
          renderItem={renderComment}
        />
        <View style={styles.inputContainer}>
          <Image source={Images.profile} style={styles.inputProfileImage} />
          <TextInput style={styles.input} placeholder="Type a comment..." />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  line: {
    height: 1.5,
    backgroundColor: "black",
    marginTop: 10,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
  },
  time: {
    color: "grey",
    fontSize: 12,
  },
  text: {
    marginTop: 4,
    fontSize: 14,
  },
  commentFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  likes: {
    fontSize: 12,
    color: "grey",
  },
  reply: {
    fontSize: 12,
    color: "blue",
  },
  iconButton: {
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingVertical: 17,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  inputProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default CommentSection;
