import React, { useState } from "react";
import { router, Link } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Modal,
  Image,
  StyleSheet,
} from "react-native";
import DropdownComponent from "../../../components/Dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { icons } from "../../../constants";

const findVehicle = () => {
  const vehicles = [
    { label: "Vehicles 1", value: "v1" },
    { label: "Vehicles 2", value: "v2" },
    { label: "Vehicles 3", value: "v3" },
  ];

  const location = [
    { label: "location 1", value: "l1" },
    { label: "location 2", value: "l2" },
    { label: "location 3", value: "l3" },
  ];

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
    setShow(false);
  };

  const showDatepicker = (modeToShow) => {
    setShow(true);
    setMode(modeToShow);
  };

  const handleSubmit = () => {
    console.log({
      date,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>
        Find your Vehicle!
      </Text>
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <DropdownComponent data={vehicles} placeholder={"Vehicle"} />
          <View style={styles.datePickerContainer}>
            <TextInput
              onPress={showDatepicker}
              style={styles.textInput}
              placeholder="Date"
              editable={false}
              value={date ? date.toLocaleDateString() : "Date"}
            />
            <TouchableOpacity
              onPress={showDatepicker}
              style={styles.datePickerButton}
            >
              <Image source={icons.calendar} style={styles.calendarIcon} />
            </TouchableOpacity>
          </View>
          <DropdownComponent data={location} placeholder={"Location"} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.goButton}
            onPress={() => {
              router.push("/business/vehicleList");
              handleSubmit();
            }}
          >
            <Text style={styles.goButtonText}>Go</Text>
          </TouchableOpacity>
        </View>
      </View>

      {show && Platform.OS === "ios" && (
        <Modal transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
                style={styles.dateTimePicker}
              />
              <TouchableOpacity
                onPress={() => setShow(false)}
                style={styles.doneButton}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {show && Platform.OS === "android" && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    width: 300,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "black",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 24,
    marginTop: 48,
    width: 320,
  },
  inputContainer: {
    marginBottom: 24,
    gap: 8,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "grey",
    marginBottom: 16,
    borderRadius: 8,
  },
  textInput: {
    flex: 1,
    padding: 8,
    color: "gray",
  },
  datePickerButton: {
    padding: 8,
  },
  calendarIcon: {
    width: 35,
    height: 35,
  },
  buttonContainer: {
    alignItems: "center",
  },
  goButton: {
    borderRadius: 25,
    backgroundColor: "#06D001",
    padding: 12,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: "auto",
    width: 100,
  },
  goButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
  dateTimePicker: {
    width: "100%",
  },
  doneButton: {
    marginTop: 16,
    padding: 8,
    backgroundColor: "#3B82F6",
    borderRadius: 8,
  },
  doneButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default findVehicle;
