import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

const menuItems = [
  { title: 'Password and Security', icon: 'security', route: '/profile/manage_password' },
  { title: 'Personal Details', icon: 'person', route: '/profile/edit_profile' },
  { title: 'Language', icon: 'language', route: '/profile/languages' },
  { title: 'Account Privacy', icon: 'lock', route: '/profile/privacy' },
  { title: 'Invite People', icon: 'person-add', route: '/profile/invite_people' },
  { title: 'Help', icon: 'help', route: '/profile/help' },
  { title: 'About', icon: 'info', route: '/profile/about' },
  { title: 'Log out', icon: 'logout', route: '/sign-in' }
];

const MenuItem = ({ title, icon, route }) => {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.menuItem} 
      onPress={() => router.push(route)}
    >
      <Icon name={icon} size={24} color="#000" />
      <Text style={styles.menuItemText}>{title}</Text>
      <Icon name="chevron-right" size={24} color="#000" style={styles.chevron} />
    </TouchableOpacity>
  );
};

const Settings = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {menuItems.map((item, index) => (
        <MenuItem 
          key={index} 
          title={item.title} 
          icon={item.icon} 
          route={item.route} 
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  menuItemText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
  },
  chevron: {
    marginLeft: 'auto',
  },
});

export default Settings;
