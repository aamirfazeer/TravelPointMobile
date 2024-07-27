import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { icons, images } from "../../../constants";
import Icons from "react-native-vector-icons/Ionicons";


const ProfilePage = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image source={images.person1} style={styles.image} />
        </View>
        <View style={styles.header}>
          <Text style={styles.name}>Aamir Arshad</Text>
          <Image source={icons.heart} style={styles.iconHeart} />
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Icons name="star" size={20} color={"blue"} />
            <Text style={styles.infoText}>4.8 (73 reviews)</Text>
          </View>
          <View style={styles.infoItem}>
            <Icons name="location-sharp" size={20} color={"green"} />
            <Text style={styles.infoText}>Angoda</Text>
          </View>
        </View>
      </View>

      <View style={styles.line} />

      <View style={styles.aboutSection}>
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

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
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
    width: 247,
    borderRadius: 100,
    marginBottom: 50,
    marginTop: 30,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  name: {
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
    gap: 140,
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
  aboutSection: {
    padding: 20,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  aboutText: {
    marginBottom: 35,
  },
  button: {
    backgroundColor: "#06D001",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 9999,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
