import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const languages = [
  'Spanish', 'English (UK)', 'English', 'Hindi', 'Arabic', 'Bengali', 
  'Portuguese', 'Russian', 'Japanese', 'Punjabi', 'German'
];

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English (UK)');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLanguages = languages.filter(lang =>
    lang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="black" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredLanguages}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.languageItem} onPress={() => setSelectedLanguage(item)}>
            <Text style={styles.languageText}>{item}</Text>
            {item === selectedLanguage && <Feather name="check-circle" size={20} color="blue" />}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  languageText: {
    fontSize: 18,
  },
});

export default LanguageSelector;
