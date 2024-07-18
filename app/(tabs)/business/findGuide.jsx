import { Link } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import DropdownComponent from "../../../components/Dropdown";
import DateSelectComponent from "../../../components/DatePicker";


const detail = () => {
  const languages = [
    { label: "English", value: "en" },
    { label: "Sinhala", value: "sh" },
    { label: "Tamil", value: "tm" },
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
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-3xl font-semibold text-center mb-6 text-blue-900">
        Find your Tour Guide!
      </Text>
      <View className="bg-gray-700 p-5 pt-20 pb-10  rounded-lg shadow-md mb-6 mt-12 w-80">
        <View className="mb-6 gap-2">
          {/* <DropdownComponent data={languages} placeholder={"Language"} /> */}
          {/* <TextInput
            placeholder="Date"
            className="bg-white p-2 rounded mt-4 mb-4"
          /> */}
          <View className="border rounded-full p-2 flex-row items-center bg-white">
            <TouchableOpacity onPress={showDatepicker} className="p-2">
              <Image
                source={icons.calendar}
                className="w-20 h-20 rounded-full"
              />
            </TouchableOpacity>
            <TextInput
              onPress={showDatepicker}
              className="flex-1 p-2"
              placeholder="Date"
              editable={false}
              value={date ? date.toLocaleDateString() : "Date"}
            />
          </View>

          {/* <DropdownComponent data={languages} placeholder={"Location"} /> */}
        </View>
        <View className="items-center">
          <TouchableOpacity className="rounded-full bg-red-500 p-3 text-center items-center justify-center shadow-lg mt-auto mb-auto w-40">
            <Link href="/business/guideList">
              <Text className="text-white font-bold text-lg items-center">
                Go
              </Text>
            </Link>
          </TouchableOpacity>
        </View>
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

export default detail;
