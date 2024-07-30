import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/Ionicons'; 
import { useRouter } from 'expo-router';


const Header = () => {
  const router = useRouter();
  return (

        <View style={styles.headerContainer}>
          <Text style={styles.title}>TravelPoint</Text>
          <View style={styles.notificationContainer}>         
          <Icon
            style={styles.icon}
            name='notifications-outline'
            size={26}
            color="#06D001"
            />
          
          <TouchableOpacity onPress={() => router.push('/home/messages')}>
          <Icon
            style={styles.icon}
            name='chatbubble-outline'
            size={26}
            color="#06D001"
          />
          </TouchableOpacity>
        </View>
      </View>
      

  );
};

const styles = StyleSheet.create({
  headerContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 15,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
    paddingBottom: 15,
  

  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#002F43",
    
    
  },
  notificationContainer: {
    position: 'absolute',
    right: 10,
    zIndex: 1,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 25
  },
});

export default Header;
