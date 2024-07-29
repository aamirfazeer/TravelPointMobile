import React from 'react';
import { View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Messages = () => {

  const style = StyleSheet.create(
  {
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: '#ffffff',
    },
    title: {
      fontSize: 20,
      paddingTop:20,
      fontFamily: 'Poppins-Regular'
    },
    searchIcon: {
      paddingRight: 10,
    },
    searcharea:{
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 10,
      padding: 5,
      marginTop:10,
      marginBottom:10
    },
    textInput: {
      height: 40,
      borderColor: '#000',
      borderWidth: 1,
      marginTop: 20,
      paddingHorizontal: 10,
      borderRadius:10
    },
    userAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#ccc',
      marginRight: 10,
    },
    messageArea: {
      flexDirection: 'row',
      padding: 5,
      marginTop:15
    },
    messageDetails: {
      flex: 1,
      justifyContent: 'center',
    },
    userName: {
      fontWeight: 'bold',
      fontSize: 16,
      fontFamily: 'Poppins-Regular'     
    },
    lastMessage: {
      color: '#666',
    },
    time: {
      justifyContent: 'center',
      color: '#999',
      fontSize: 12,
    },
  });
  
  return(
    <View style={style.container}>
        <Text style = {style.title}>
        Messages
        </Text>

        <View style={style.searcharea}>
        <Icon style={style.searchIcon} name="search" size={20} color="#000"/>
        <TextInput
          style={style.input}
          TextColor="#000"/>
        </View> 

      <View style = {style.messageArea}>
      <View style={style.userAvatar}>
        {/* Placeholder for user avatar */}
      </View>
      <View style={style.messageDetails}>
        <Text style={style.userName}>Nethmi Jayawardena</Text>
        <Text style={style.lastMessage}>1 New Message </Text>
      </View>
      <Text style={style.time}>4 minutes ago</Text>
    </View>  

    <View style = {style.messageArea}>
      <View style={style.userAvatar}>
        {/* Placeholder for user avatar */}
      </View>
      <View style={style.messageDetails}>
        <Text style={style.userName}>Fathima Hanan</Text>
        <Text style={style.lastMessage}>1 New Message </Text>
      </View>
      <Text style={style.time}>9 minutes ago</Text>
    </View>  

    <View style = {style.messageArea}>
      <View style={style.userAvatar}>
        {/* Placeholder for user avatar */}
      </View>
      <View style={style.messageDetails}>
        <Text style={style.userName}>Kavindya Liyanage</Text>
        <Text style={style.lastMessage}>1 New Message </Text>
      </View>
      <Text style={style.time}>24 minutes ago</Text>
    </View>  

    <View style = {style.messageArea}>
      <View style={style.userAvatar}>
        {/* Placeholder for user avatar */}
      </View>
      <View style={style.messageDetails}>
        <Text style={style.userName}>Tharushi Perera</Text>
        <Text style={style.lastMessage}>1 New Message </Text>
      </View>
      <Text style={style.time}>1h ago</Text>
    </View>  

    <View style = {style.messageArea}>
      <View style={style.userAvatar}>
        {/* Placeholder for user avatar */}
      </View>
      <View style={style.messageDetails}>
        <Text style={style.userName}>Kanchana Mendis</Text>
        <Text style={style.lastMessage}>1 New Message </Text>
      </View>
      <Text style={style.time}>3h ago</Text>
    </View>    

    <View style = {style.messageArea}>
      <View style={style.userAvatar}>
        {/* Placeholder for user avatar */}
      </View>
      <View style={style.messageDetails}>
        <Text style={style.userName}>Nufdha Haya</Text>
        <Text style={style.lastMessage}>1 New Message </Text>
      </View>
      <Text style={style.time}>5h ago</Text>
    </View>  

    <View style = {style.messageArea}>
      <View style={style.userAvatar}>
        {/* Placeholder for user avatar */}
      </View>
      <View style={style.messageDetails}>
        <Text style={style.userName}>Vineetha Suvineetha</Text>
        <Text style={style.lastMessage}>2 New Message </Text>
      </View>
      <Text style={style.time}>1 day ago</Text>
    </View>  

    </View>

  );
}
export default Messages;