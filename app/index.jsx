import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { images } from '../constants';
import { router } from 'expo-router';
import "expo-router/entry";


const App = () => {
  return (
    <View style={styles.container}>
      <Image source={images.onboard} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.brand}>TravelPoint</Text>
        <Text style={styles.description}>
          Make your travel planning seamless and share experiences with your
          travel companions
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("./(tabs)/business/findGuide")}
        >
          <Text style={styles.buttonText}>Let's Travel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '75%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginTop: -50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  brand: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: '#666',
  },
  button: {
    backgroundColor: '#00b300',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
