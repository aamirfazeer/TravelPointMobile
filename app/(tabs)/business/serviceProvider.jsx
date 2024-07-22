// import React from "react";
// import { View, Text, TouchableOpacity } from "react-native";

// const ProvideServiceScreen = () => {
//   return (
//     <View className="flex-1 items-center justify-center bg-white p-4">
//       <Text className="text-lg text-blue-600 mb-6">Provide a Service</Text>
//       <TouchableOpacity className="w-full text-2xl bg-blue-900 p-10 mb-4 rounded-lg">
//         <Text className="text-white text-center">Be a Tour Guide</Text>
//       </TouchableOpacity>
//       <TouchableOpacity className="w-full bg-blue-900 p-4 mb-4 rounded-md">
//         <Text className="text-white text-center">Rent Out Vehicles</Text>
//       </TouchableOpacity>
//       <TouchableOpacity className="w-full bg-blue-900 p-4 mb-4 rounded-md">
//         <Text className="text-white text-center">Rent Out Equipment</Text>
//       </TouchableOpacity>
//       <TouchableOpacity className="w-full bg-blue-900 p-4 mb-4 rounded-md">
//         <Text className="text-white text-center">Other</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ProvideServiceScreen;

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


const ProvideServiceScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.subHeaderText}>Provide a Service</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Be a Tour Guide</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Rent Out Vehicles</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Rent Out Equipment</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Other</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 25,
  },
  subHeaderText: {
    fontSize: 18,
    color: "#3F7C9E",
    marginBottom: 35,
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    backgroundColor: "#002F43",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 35,
    margin: 18,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default ProvideServiceScreen;

