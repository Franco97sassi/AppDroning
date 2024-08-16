import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Constants from "expo-constants";
import { useNavigation } from '@react-navigation/native'
 
const LoginButton = ({ tomycount ,onPress   }) => {
  const navigation = useNavigation();

  return (
    <View> 
       <TouchableOpacity style={styles.buttonStyleLogin} onPress={onPress}   >   
  <Text style={styles.textButtonLogin }    >
  Iniciar Sesión  {tomycount} 

  </Text>
 </TouchableOpacity >
    </View>
  )
}

export default LoginButton

const styles = StyleSheet.create({
  buttonStyleLogin:{
    borderRadius:20,
    backgroundColor:"white",
    width:335,
    height:51,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
textButtonLogin:{
  color:"red"
},
})