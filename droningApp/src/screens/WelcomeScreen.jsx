import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Constants from "expo-constants";
 import RegisterButton from '../components/Buttons/RegisterButton';
 import LoginButton from '../components/Buttons/LoginButton';
 import Carrousel from '../components/Carrousel/Carrousel';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
       <Header navigation={navigation} text="Skip"/>
          <View style={styles.carrouselSection}>
            <Carrousel/>  
         </View>
         <View style={styles.sectionButtons}>
          <RegisterButton text="Create an Account"   navigation={navigation} /> 
          <LoginButton  navigation={navigation}   /> 
          {/* <Text></Text> */}
         </View>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    // backgroundColor:"green",
       
       paddingTop: Constants.statusBarHeight  ,

  },
  
 

  carrouselSection:{
    height:"59%",
    //  backgroundColor:"yellow",
  },
  sectionButtons:{
      height:"29%",
    // backgroundColor:"blue",
    justifyContent: "space-evenly",
    alignItems: "center",
  }
})