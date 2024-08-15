import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();


export default function App() {
  useEffect(() => {
    const hideSplashScreen=async ()=>{
      await SplashScreen.hideAsync()
      
    }
    hideSplashScreen();
  }, [])
  
  return (
    // <View style={styles.container}>
       <AppNavigator/>
        // <Text>Hola</Text>  
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: '#fff',
 
    alignItems: 'center',
    justifyContent: 'center',
  },
});
