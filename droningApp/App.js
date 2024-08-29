import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from 'react';
 import { OpenSans_400Regular, OpenSans_700Bold, useFonts } from '@expo-google-fonts/open-sans';
 
SplashScreen.preventAutoHideAsync();
 

export default function App() {
  useEffect(() => {
    const hideSplashScreen=async ()=>{
      await SplashScreen.hideAsync()
      
    }
    hideSplashScreen();
  }, [])

  const [fontsLoaded] = useFonts({
    OpenSansRegular: OpenSans_400Regular,
    OpenSansBold: OpenSans_700Bold,
  });


  
  return (
    //  <View style={styles.container}>
        <AppNavigator/>
// <Text>  Hola </Text>
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
