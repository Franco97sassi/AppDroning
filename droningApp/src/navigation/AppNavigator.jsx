// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RequestScreen from '../screens/RequestScreen';
import AddEditDroneScreen from '../screens/AddEditDroneScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import FollowingScreen from '../screens/FollowingScreen';
import ArrivalScreen from '../screens/ArrivalScreen';
import PaymentMethodsScreen from '../screens/PaymentMethods';
import AddCardScreen from '../screens/AddCardScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import TravellingHistoryScreen from '../screens/TravellingHistoryScreen';
import CustomDrawerContent from './CustomDrawerContent';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AdminPanelScreen from '../screens/AdminPanelScreen';
import { useAuthState } from '../hooks/useAuthState';
import PasswordResetScreen from '../screens/RecoveryPassword';
import AdminPanelRestaurants from '../screens/AdminPanelRestaurants';

// Stack Navigator
const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="RecoveryPassword" component={PasswordResetScreen} />

    </Stack.Navigator>
  )
}

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Request" component={RequestScreen} />
      <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
      <Stack.Screen name="Following" component={FollowingScreen} />
      <Stack.Screen name="Arrival" component={ArrivalScreen} />
      <Stack.Screen name="AddEditDrone" component={AddEditDroneScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
      <Stack.Screen name="AddCard" component={AddCardScreen} />
      {/* <Stack.Screen name="TravellingHistory" component={TravellingHistoryScreen} /> */}
    </Stack.Navigator>
  );
};

// Drawer Navigator
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      headerTitle: '',
      headerShown: true,
      drawerStyle: {
        backgroundColor: '#f5f5f5', // Rojo para el fondo de la barra lateral
      },
      drawerLabelStyle: {
        fontSize: 16,
        color: '#fff', // Color blanco para el texto del drawer
      },
      drawerItemStyle: {
        marginVertical: 5,
      },
      headerStyle: {
        backgroundColor: '#f5f5f5', // Rojo para el fondo del encabezado (donde está el menú hamburguesa)
      },
      headerTintColor: '#000', // Color del ícono del menú hamburguesa
    }}
  >
          <Drawer.Screen name="Drawer" component={StackNavigator} />

     <Drawer.Screen name="Home" component={HomeScreen} />

       <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Payment" component={PaymentMethodsScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      <Drawer.Screen name="Travel History" component={TravellingHistoryScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Request" component={RequestScreen} />
      <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
      <Stack.Screen name="Following" component={FollowingScreen} />
      <Stack.Screen name="Arrival" component={ArrivalScreen} />
      <Stack.Screen name="AddEditDrone" component={AddEditDroneScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
      <Stack.Screen name="AddCard" component={AddCardScreen} />
      <Drawer.Screen name="Panel" component={AdminPanelScreen} />
      <Drawer.Screen name="PanelRestaurants" component={AdminPanelRestaurants} />

    </Drawer.Navigator>
  );
};

const AppNavigator = () => {
  const { user, loading } = useAuthState(); // Hook para obtener el estado de autenticación

  // Mientras se carga el estado de autenticación, puedes mostrar un loading spinner o una pantalla de carga
  if (loading) {
    return null; // Puedes retornar un componente de carga aquí
  }
  return (
    <NavigationContainer>
    {user ? <DrawerNavigator /> : <AuthNavigator />}
  </NavigationContainer>
  );
};

export default AppNavigator;
