// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome } from 'react-native-vector-icons'; // Importa los iconos que necesitas

import ProfileScreen from '../screens/ProfileScreen';
import TravellingHistoryScreen from '../screens/TravellingHistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HomeScreen from '../screens/HomeScreen';
import AdminPanelScreen from '../screens/AdminPanelScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
    style={styles.container}
      initialRouteName="Home"
      screenOptions={{
        headerTitle: '', // Esto oculta el título
        headerShown: true, // Esto muestra el ícono del menú hamburguesa
        drawerStyle: {
          backgroundColor: '#f5f5f5', // Color de fondo del drawer
        },
        drawerLabelStyle: {
          fontSize: 16, // Tamaño del texto
          marginLeft: -10, // Ajusta el espacio a la izquierda del texto si es necesario
        },
        drawerItemStyle: {
          marginVertical: 5, // Espacio vertical entre ítems
        },
        drawerIcon: ({ focused, size }) => (
          <MaterialIcons
            name={focused ? 'star' : 'star-outline'} // Icono de ejemplo
            size={size}
            color={focused ? '#007bff' : '#000'}
          />
        ),
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerLabel: 'Profile',
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Travel History"
        component={TravellingHistoryScreen}
        options={{
          drawerLabel: 'Travel History',
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="history" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerLabel: 'Settings',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Panel"
        component={AdminPanelScreen}
        options={{
          drawerLabel: 'Panel',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
   
  drawerLabel: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DrawerNavigator;
