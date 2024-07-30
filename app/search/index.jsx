
import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, Text  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { images } from "../../constants";

const data = [
  { username: 'dehaaaaan.w', fullName: 'Dehan Welihinda', profilePic: images.profile1 },
  { username: 'dilanii.perera', fullName: 'Dilani Perera', profilePic: images.profile1 },
  { username: 'duxxa_', fullName: 'Dushean Nelaka Gamage', profilePic: images.profile1 },
  { username: 'dssc.official', fullName: 'D.S. Senanayake College', profilePic: images.profile1 },
  { username: 'ds_interact', fullName: 'Interact Club of D.S. Senanayake College', profilePic: images.profile1 },
  { username: 'dilsha.njay', fullName: 'Dilshan Jayasinghe', profilePic: images.profile1 },
];

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const router = useRouter();

  const handleInputChange = (text) => {
    setQuery(text);
    if (text) {
      const filtered = data.filter((item) =>
        item.username.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  const handleClearInput = () => {
    setQuery('');
    setFilteredData([]);
  };

  const handleSelect = (username) => {
    setQuery(username);
    setFilteredData([]);
    router.back();
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={handleInputChange}
          placeholder="Search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClearInput} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#ccc" />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.username}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleSelect(item.username)}>
            <Image source={item.profilePic} style={styles.profilePic} />
            <View style={styles.textContainer}>
              <Text style={styles.usernameText}>{item.username}</Text>
              <Text style={styles.fullNameText}>{item.fullName}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyboardShouldPersistTaps="always"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  clearButton: {
    marginLeft: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#e0e0e0',
  },
  textContainer: {
    flex: 1,
  },
  usernameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fullNameText: {
    fontSize: 14,
    color: '#888',
  },
});

export default SearchScreen;
