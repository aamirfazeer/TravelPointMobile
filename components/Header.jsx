import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {icons} from "../constants";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>TravelPoint</Text>
      <Image source={icons.heart} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 25,
    paddingHorizontal: 25,
    backgroundColor: "#fff",
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
