import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';

const AddVehicleForm = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [transmission, setTransmission] = useState('Automatic');
  const [year, setYear] = useState('');
  const [capacity, setCapacity] = useState('');
  const [mileage, setMileage] = useState('');
  const [location, setLocation] = useState('');
  const [rentType, setRentType] = useState('Per Km');
  const [rate, setRate] = useState('');
  const [description, setDescription] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add a Vehicle</Text>

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
        <View style={styles.radio}>
          <TouchableOpacity onPress={() => setTransmission('Automatic')} style={styles.radioOption}>
            <Icon name={transmission === 'Automatic' ? 'radio-button-checked' : 'radio-button-unchecked'} size={20} color="#00cc44" />
            <Text style={styles.radioText}>Automatic</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTransmission('Manual')} style={styles.radioOption}>
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
      <View style={styles.row}>
        <Picker
          selectedValue={capacity}
          style={[styles.input, styles.halfInput]}
          onValueChange={(itemValue) => setCapacity(itemValue)}
        >
          <Picker.Item label="Seating capacity" value="" />
          {[...Array(10).keys()].map(i => (
            <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
          ))}
        </Picker>
        <Picker
          selectedValue={mileage}
          style={[styles.input, styles.halfInput]}
          onValueChange={(itemValue) => setMileage(itemValue)}
        >
          <Picker.Item label="Mileage" value="" />
          {[...Array(15).keys()].map(i => (
            <Picker.Item key={i} label={`${(i + 1) * 2}`} value={`${(i + 1) * 2}`} />
          ))}
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <View style={styles.row}>
        <Text style={styles.label}>Rent type</Text>
        <View style={styles.radio}>
          <TouchableOpacity onPress={() => setRentType('Per Km')} style={styles.radioOption}>
            <Icon name={rentType === 'Per Km' ? 'radio-button-checked' : 'radio-button-unchecked'} size={20} color="#00cc44" />
            <Text style={styles.radioText}>Per Km</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setRentType('Per day')} style={styles.radioOption}>
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
        placeholder="Describe the main features of your vehicle"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Add Photos</Text>
      <View style={styles.photoRow}>
        <TouchableOpacity style={styles.photoButton}>
          <Icon name="add-photo-alternate" size={40} color="#808080" />
          <Text style={styles.photoText}>Add a photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.photoButton}>
          <Icon name="add-photo-alternate" size={40} color="#808080" />
          <Text style={styles.photoText}>Add a photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.photoButton}>
          <Icon name="add-photo-alternate" size={40} color="#808080" />
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
        <Text style={styles.addButtonText}>Add Vehicle</Text>
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
    fontSize: 26,
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
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  radioText: {
    marginLeft: 4,
    fontSize: 16,
    color: '#333',
  },
  halfInput: {
    flex: 1,
    marginRight: 8,
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
  photoText: {
    textAlign: 'center',
    marginTop: 4,
    color: '#333',
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
    width: "60%",
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddVehicleForm;
