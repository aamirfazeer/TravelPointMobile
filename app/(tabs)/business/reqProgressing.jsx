import React from "react";
import { View, Text, StyleSheet } from "react-native";

const reqProgressing = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your request is being processed!</Text>
    </View>
  );
};

export default reqProgressing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
