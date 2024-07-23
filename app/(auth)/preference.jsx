import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { images } from '../../constants';

const interests = [
  { title: 'Rest & Relaxation', imgSrc: images.rest_relaxation },
  { title: 'Beach & Sun', imgSrc: images.beach_sun },
  { title: 'Cityscape', imgSrc: images.cityscape },
  { title: 'Mixed Destinations', imgSrc: images.mixed_destinations },
  { title: 'Room Service', imgSrc: images.room_service },
  { title: 'All about Gym', imgSrc: images.gym },
  { title: 'Love the cold', imgSrc: images.cold },
  { title: 'New Experiences', imgSrc: images.new_experiences },
  { title: 'Cruisers', imgSrc: images.cruisers },
  { title: 'Foodies', imgSrc: images.foodies },
  { title: 'Hikers', imgSrc: images.hikers },
  { title: 'Museums', imgSrc: images.museums },
  { title: 'Wellness Spots', imgSrc: images.wellness_spots },
  { title: 'Concerts & Events', imgSrc: images.concerts_events },
  { title: 'Chill Cafes', imgSrc: images.chill_cafes },
];

export default function HomePage() {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (index) => {
    setSelectedInterests((prevSelected) => {
      const newSelected = [...prevSelected];
      if (newSelected.includes(index)) {
        newSelected.splice(newSelected.indexOf(index), 1);
      } else {
        newSelected.push(index);
      }
      return newSelected;
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>What are you interested in?</Text>
      <Text style={styles.subHeaderText}>This will customize your new home feed</Text>
      <View style={styles.gridContainer}>
        {interests.map((interest, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.gridItem,
              selectedInterests.includes(index) && styles.selectedGridItem,
            ]}
            onPress={() => toggleInterest(index)}
          >
            <Image source={interest.imgSrc} style={styles.gridImage} />
            <Text style={styles.gridTitle}>{interest.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Meet your Home Feed</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subHeaderText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gridItem: {
    width: '30%',
    alignItems: 'center',
    margin: 5,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 10,
  },
  selectedGridItem: {
    borderColor: '#28A72F',
  },
  gridImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  gridTitle: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
