import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

const bookingRequests = [
  {
    id: "1",
    customerName: "Mr. Manoj Kumar",
    guideName: "John Doe",
    tourDate: "2024-12-05",
    status: "View Info",
    image: "https://via.placeholder.com/50",
  },
  {
    id: "2",
    customerName: "Ms. Susan Brown",
    guideName: "Emily Smith",
    tourDate: "2024-12-10",
    status: "Confirmed",
    image: "https://via.placeholder.com/50",
  },
];

const guideServiceProvider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add Guide Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/manage-guides")}
        >
          <Text style={styles.buttonText}>Manage Guides</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Booking Requests</Text>

      <FlatList
        data={bookingRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.customerName}</Text>
              <Text style={styles.details}>
                Guide: {item.guideName}
                {"\n"}Date: {item.tourDate}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.statusButton,
                item.status === "Confirmed"
                  ? styles.confirmed
                  : styles.viewInfo,
              ]}
            >
              <Text style={styles.statusText}>
                {item.status === "Confirmed" ? "Confirmed" : "View Info"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default guideServiceProvider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#00cc44",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#006400",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  details: {
    color: "#555",
    fontSize: 14,
  },
  statusButton: {
    padding: 10,
    borderRadius: 10,
  },
  confirmed: {
    backgroundColor: "#00cc44",
  },
  viewInfo: {
    backgroundColor: "#ffa500",
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
