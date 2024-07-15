import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import React from 'react';
import { images } from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 5 
  },
  centeredText: {
    textAlign: 'center',
    fontSize: 25,
    paddingBottom:70,

  },
  imageBackground: {
    width: 300,
    height: 100,
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 20, 
    borderRadius:20,
    overflow: 'hidden'
    
  },
  overlayText: {
    color: '#fff',
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    fontWeight: 'bold'
  }
});

const SelectService = () => {
  return (

    <View style={styles.container}>
        <Text style={styles.centeredText} numberOfLines={1}>
          What are you looking for?
        </Text>

        <View style={styles.ImageContainer} >
          <ImageBackground
            source={images.hipster}
            style={styles.imageBackground}>
            <Text style={styles.overlayText}>Tour Guides</Text>       
          </ImageBackground>
        </View>

        <View style={styles.ImageContainer} >
          <ImageBackground
            source={images.rental}
            style={styles.imageBackground}
          >
            <Text style={styles.overlayText}>Vehicle Rentals</Text>
          </ImageBackground>
        </View>

        <View style={styles.ImageContainer} >
          <ImageBackground
            source={images.equipment}
            style={styles.imageBackground}
          >
            <Text style={styles.overlayText}>Travel Equipments</Text>
          </ImageBackground>
        </View>
    </View>
  );
};

export default SelectService;
