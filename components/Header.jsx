import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  return (

        <View style={styles.headerContainer}>
          <Text style={styles.title}>TravelPoint</Text>
      </View>

  );
};

const styles = StyleSheet.create({
  headerContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 15,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
    paddingBottom: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#002F43",
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default Header;
