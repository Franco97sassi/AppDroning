 import React from 'react'
 import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack=createNativeStackNavigator()

const AppNavigator = () => {
  return (
     <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{headerShown:false}}
      >
 
        <Stack.Screen name="Login" component={LoginScreen}/>
        {/* <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="ServiceRequest" component={ServiceRequestScreen} />
        <Stack.Screen name="ServiceConfirmation" component={ServiceConfirmationScreen} />
        <Stack.Screen name="DroneTracking" component={DroneTrackingScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Stack.Navigator>
     </NavigationContainer>
  )
}

export default AppNavigator

 