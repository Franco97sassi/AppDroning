// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from '../screens/ProfileScreen';
import TravellingHistoryScreen from '../screens/TravellingHistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HomeScreen from '../screens/HomeScreen'; // Pantalla principal
import AdminPanelScreen from '../screens/AdminPanelScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home"       screenOptions={{ 
      headerTitle: '', // Esto oculta el título
      headerShown: true // Esto muestra el ícono del menú hamburguesa
    }}
>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Travel History" component={TravellingHistoryScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Panel" component={AdminPanelScreen} />

    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
