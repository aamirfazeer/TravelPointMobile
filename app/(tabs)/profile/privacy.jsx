import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const PrivacySettings = () => {
  const [isPrivate, setIsPrivate] = useState(true);

  const toggleSwitch = () => setIsPrivate(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text style={styles.title}>Private Account</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isPrivate ? "#ffffff" : "#ffffff"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isPrivate}
        />
      </View>
      <Text style={styles.text}>
        When your account is public, your profile, posts, and tags can be seen by anyone.
      </Text>
      <Text style={styles.text}>
        When your account is private only the followers that you approve can see what you share, your followers and following lists.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  text: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 10,
  },
});

export default PrivacySettings;
