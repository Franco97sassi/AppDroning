// src/components/CustomDrawerContent.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, MaterialIcons } from 'react-native-vector-icons';

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Franco</Text>
      </View>
      <View style={styles.drawerItemsContainer}>
        <DrawerItem
          label="Home"
          icon={({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          )}
          onPress={() => navigation.navigate('Home')}
        />
        <DrawerItem
          label="Profile"
          icon={({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          )}
          onPress={() => navigation.navigate('Profile')}
        />
        <DrawerItem
          label="Payment"
          icon={({ color, size }) => (
            <MaterialIcons name="payment" size={size} color={color} />
          )}
          onPress={() => navigation.navigate('Payment')}
        />
        <DrawerItem
          label="Notifications"
          icon={({ color, size }) => (
            <MaterialIcons name="notifications" size={size} color={color} />
          )}
          onPress={() => navigation.navigate('Notifications')}
        />
        <DrawerItem
          label="Travel History"
          icon={({ color, size }) => (
            <FontAwesome name="history" size={size} color={color} />
          )}
          onPress={() => navigation.navigate('Travel History')}
        />
        <DrawerItem
          label="Settings"
          icon={({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          )}
          onPress={() => navigation.navigate('Settings')}
        />
        <DrawerItem
          label="Panel"
          icon={({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          )}
          onPress={() => navigation.navigate('Panel')}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerItemsContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default CustomDrawerContent;
