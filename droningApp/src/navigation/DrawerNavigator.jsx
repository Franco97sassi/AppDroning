// src/navigation/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import PaymentMethods from '../screens/PaymentMethods';
import TravellingHistoryScreen from '../screens/TravellingHistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AdminPanelScreen from '../screens/AdminPanelScreen';
import CustomDrawerContent from './CustomDrawerContent';
import AdminPanelRestaurants from '../screens/AdminPanelRestaurants';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
       drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTitle: '', // Oculta el título del header del drawer
        headerShown: true, // Muestra el ícono del menú hamburguesa
        drawerStyle: {
          backgroundColor: '#f5f5f5',
        },
        drawerLabelStyle: {
          fontSize: 16,
        },
        drawerItemStyle: {
          marginVertical: 5,
        },
      }}
    >
       
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerLabel: 'Profile',
        }}
      />
      <Drawer.Screen
        name="Payment"
        component={PaymentMethods}
        options={{
          drawerLabel: 'Payment',
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          drawerLabel: 'Notifications',
        }}
      />
      <Drawer.Screen
        name="Travel History"
        component={TravellingHistoryScreen}
        options={{
          drawerLabel: 'Travel History',
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerLabel: 'Settings',
        }}
      />
      <Drawer.Screen
        name="Panel"
        component={AdminPanelScreen}
        options={{
          drawerLabel: 'Panel',
        }}
      />
       <Drawer.Screen
        name="Panel Restaurants"
        component={AdminPanelRestaurants}
        options={{
          drawerLabel: 'Panel rest',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
