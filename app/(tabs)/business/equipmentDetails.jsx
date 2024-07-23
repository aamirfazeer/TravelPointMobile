import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { icons, images } from "../../../constants";

const EquipmentDetails = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image source={images.equipment7} style={styles.image} />
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>Nightlight</Text>
          <Image source={icons.heart} style={styles.iconHeart} />
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Image source={icons.star} style={styles.icon} />
            <Text style={styles.infoText}>4.8 (73 reviews)</Text>
          </View>
          <View style={styles.infoItem}>
            <Image source={icons.location} style={styles.iconLocation} />
            <Text style={styles.infoText}>Angoda</Text>
          </View>
        </View>
      </View>

      <View style={styles.line} />

      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}>About</Text>
        <Text style={styles.aboutText} numberOfLines={7} ellipsizeMode="tail">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          feugiat libero diam, ut fermentum justo commodo non. Interdum et
          malesuada fames ac ante ipsum primis in faucibus. Phasellus pretium
          elit ac nulla hendrerit, in fermentum mi cursus. Lorem Ipsum is simply
          dummy text of the printing and typesetting industry.
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EquipmentDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
  },
  profileContainer: {
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    height: 250,
    width: 246,
    borderRadius: 100,
    marginTop: 30,
    marginBottom: 40,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 1,
  },
  iconHeart: {
    width: 32,
    height: 32,
    alignItems: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
    gap: 140
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconLocation: {
    width: 20,
    height: 24,
  },
  infoText: {
    marginLeft: 4,
    textAlign: "right",
  },
  line: {
    height: 1.5,
    width: "88%",
    backgroundColor: "black",
    marginVertical: 10,
  },
  aboutContainer: {
    padding: 20,
  },
  aboutTitle: {
    color: "#1E3A8A",
    fontSize: 20,
    marginTop: 4,
    marginBottom: 4,
    textAlign: "left",
    width: "100%",
  },
  aboutText: {
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#EF4444",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 9999,
    alignSelf: "center",
    marginBottom: 30
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
