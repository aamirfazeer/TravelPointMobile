import { router, Link } from "expo-router";
import React, { useState } from "react";
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

const findGuide = () => {
  const languages = [
    { label: "English", value: "en" },
    { label: "Sinhala", value: "sh" },
    { label: "Tamil", value: "tm" },
  ];

  const location = [
    { label: "location 1", value: "l1" },
    { label: "location 2 ", value: "l2" },
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find your Tour Guide!</Text>
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <DropdownComponent data={languages} placeholder={"Language"} />
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
            onPress={() => router.push("/business/guideList")}
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
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "black",
  },
  card: {
    backgroundColor: "#fff",
    padding: 40,
    borderRadius: 10,
    borderWidth: 2,
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
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "gray",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
    backgroundColor: "#06D001",
    borderRadius: 8,
  },
  doneButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default findGuide;
