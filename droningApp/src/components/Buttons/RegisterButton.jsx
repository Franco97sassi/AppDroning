import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const RegisterButton = ({text,onPress   }) => {
 
  return (
    <View style={styles.container}>
<TouchableOpacity style={styles.buttonStyleAccount}   onPress={onPress}   >
  <Text style={styles.textButtonAccount}>
    {/* {text} */} Registrarse
  </Text>
</TouchableOpacity>  
  </View>
  )
}

export default RegisterButton

const styles = StyleSheet.create({
  container:{
   },
  buttonStyleAccount:{
    borderRadius:20,
    backgroundColor:"#4682B4",
    width:335,
    height:51,
     justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonAccount:{
    color:"white"
  },
})