import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { icons } from "../constants";

const DatePicker = () => {
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
    <View className="flex-1 justify-center items-center">
      <View className="border rounded-full p-2 flex-row items-center bg-white">
        <TouchableOpacity onPress={showDatepicker} className="p-2">
          <Image source={icons.calendar} className="w-20 h-20 rounded-full" />
        </TouchableOpacity>
        <TextInput
          onPress={showDatepicker}
          className="flex-1 p-2"
          placeholder="Date"
          editable={false}
          value={date ? date.toLocaleDateString() : "Date"}
        />
      </View>

      {show && Platform.OS === "ios" && (
        <Modal transparent={true} animationType="slide">
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
            <View className="bg-white p-4 rounded-lg">
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
                className="w-full"
              />
              <TouchableOpacity
                onPress={() => setShow(false)}
                className="mt-4 p-2 bg-blue-500 rounded"
              >
                <Text className="text-white text-center">Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {show && Platform.OS === "android" && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePicker;
