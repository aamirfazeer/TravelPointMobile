import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { images } from '../../../constants'; // Ensure this is correctly pointing to the image file

const EditVehicleForm = () => {
  const [brand, setBrand] = useState('BMW');
  const [model, setModel] = useState('M3');
  const [licensePlate, setLicensePlate] = useState('CAB - 2233');
  const [transmission, setTransmission] = useState('Automatic');
  const [year, setYear] = useState('2014');
  const [capacity, setCapacity] = useState('5');
  const [mileage, setMileage] = useState('60000');
  const [location, setLocation] = useState('Colombo');
  const [rentType, setRentType] = useState('Per day');
  const [rate, setRate] = useState('12000');
  const [description, setDescription] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Manage Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Manufacture brand"
        value={brand}
        onChangeText={setBrand}
      />
      <TextInput
        style={styles.input}
        placeholder="Model"
        value={model}
        onChangeText={setModel}
      />
      <TextInput
        style={styles.input}
        placeholder="License plate number"
        value={licensePlate}
        onChangeText={setLicensePlate}
      />

      <View style={styles.row}>
        <Text style={styles.label}>Transmission type</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity onPress={() => setTransmission('Automatic')} style={styles.radio}>
            <Icon name={transmission === 'Automatic' ? 'radio-button-checked' : 'radio-button-unchecked'} size={20} color="#00cc44" />
            <Text style={styles.radioText}>Automatic</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTransmission('Manual')} style={styles.radio}>
            <Icon name={transmission === 'Manual' ? 'radio-button-checked' : 'radio-button-unchecked'} size={20} color="#00cc44" />
            <Text style={styles.radioText}>Manual</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Year of manufacture"
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Seating capacity"
        value={capacity}
        onChangeText={setCapacity}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Mileage"
        value={mileage}
        onChangeText={setMileage}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <View style={styles.row}>
        <Text style={styles.label}>Rent type</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity onPress={() => setRentType('Per Km')} style={styles.radio}>
            <Icon name={rentType === 'Per Km' ? 'radio-button-checked' : 'radio-button-unchecked'} size={20} color="#00cc44" />
            <Text style={styles.radioText}>Per Km</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setRentType('Per day')} style={styles.radio}>
            <Icon name={rentType === 'Per day' ? 'radio-button-checked' : 'radio-button-unchecked'} size={20} color="#00cc44" />
            <Text style={styles.radioText}>Per day</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Rate"
        value={rate}
        onChangeText={setRate}
        keyboardType="numeric"
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Add Photos</Text>
      <View style={styles.photoRow}>
        <TouchableOpacity style={styles.photoButton}>
          <Image source={images.car} style={styles.photo} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.photoButton}>
          <Icon name="add-photo-alternate" size={40} color="#000" />
          <Text style={styles.photoText}>Add a photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.photoButton}>
          <Icon name="add-photo-alternate" size={40} color="#000" />
          <Text style={styles.photoText}>Add a photo</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.documentUpload}>
        <Icon name="upload" size={40} color="#00cc44" />
        <View style={styles.documentTextContainer}>
          <Text style={styles.uploadText}>Upload vehicle documents</Text>
          <Text style={styles.subUploadText}>(Registration Documents, Insurance Details, Inspection Certificates)</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Save changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 48,
    borderColor: '#00cc44',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  radioGroup: {
    flexDirection: 'row',
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  radioText: {
    marginLeft: 4,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 80,
  },
  photoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  photoButton: {
    width: '30%',
    height: 100,
    borderColor: '#00cc44',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  photoText: {
    textAlign: 'center',
    marginTop: 4,
    color: '#00cc44',
  },
  documentUpload: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    borderColor: '#00cc44',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  documentTextContainer: {
    marginLeft: 8,
  },
  uploadText: {
    fontSize: 16,
    color: '#333',
  },
  subUploadText: {
    fontSize: 12,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#00cc44',
    paddingVertical: 16,
    borderRadius: 33,
    alignItems: 'center',
    marginBottom: 16,
    width: '60%',
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditVehicleForm;
