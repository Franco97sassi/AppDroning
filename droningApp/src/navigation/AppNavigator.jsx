 import React from 'react'
 import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';

 import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack=createNativeStackNavigator()

const AppNavigator = () => {
  return (
     <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{headerShown:false}}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>

        <Stack.Screen name="Home" component={HomeScreen}/>

        {/* <Stack.Screen name="Login" component={LoginScreen}/> */}
 
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

 