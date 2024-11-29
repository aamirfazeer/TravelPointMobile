import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';

const AddEquipmentForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [condition, setCondition] = useState('New');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Equipment</Text>

      <TextInput
        style={styles.input}
        placeholder="Equipment Name"
        value={name}
        onChangeText={setName}
      />
      
      <Picker
        selectedValue={category}
        style={styles.input}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Select Category" value="" />
        <Picker.Item label="Bags" value="Bags" />
        <Picker.Item label="Camping Tent" value="Tent" />
        <Picker.Item label="Boots" value="boots" />
        <Picker.Item label="Other" value="Other" />
      </Picker>
      
      <TextInput
        style={styles.input}
        placeholder="Price Per Day"
        value={pricePerDay}
        onChangeText={setPricePerDay}
        keyboardType="numeric"
      />
      
      <View style={styles.row}>
        <Text style={styles.label}>Condition</Text>
        <View style={styles.radio}>
          <TouchableOpacity onPress={() => setCondition('New')} style={styles.radioOption}>
            <Icon name={condition === 'New' ? 'radio-button-checked' : 'radio-button-unchecked'} size={20} color="#00cc44" />
            <Text style={styles.radioText}>New</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCondition('Used')} style={styles.radioOption}>
            <Icon name={condition === 'Used' ? 'radio-button-checked' : 'radio-button-unchecked'} size={20} color="#00cc44" />
            <Text style={styles.radioText}>Used</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe the equipment"
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
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Equipment</Text>
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

export default AddEquipmentForm;
