import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import Constants from "expo-constants";
import RegisterButton from '../components/Buttons/RegisterButton';
import LoginButton from '../components/Buttons/LoginButton';
 import GoogleButton from '../components/Buttons/GoogleButton';
 import FacebookButton from '../components/Buttons/FacebookButton';

import { auth } from '../firebase/firebaseConfig'; // Asegúrate de que la configuración de Firebase esté correcta
import { signInWithEmailAndPassword } from 'firebase/auth';
const LoginScreen = (  ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Logged in successfully');
      navigation.navigate('Home'); // Cambia 'Home' por la pantalla a la que desees navegar después del login
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Header text="Skip"/>
      <View style={styles.titleSection}>
      <Text style={styles.title}>Iniciar Sesión a tu cuenta</Text>
      <Text style={styles.subtitle}>
           Good to see you again, enter your details below to continue ordering
         </Text>
         <Text></Text>
      </View>
      <View style={styles.inputsSection}>
        <View>  
      <Text style={styles.inputTitle}> Email</Text>
      <TextInput
            style={styles.inputStyle}
            placeholder="Entrar Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
                </View>
      <View >
         <Text style={styles.inputTitle}>Contraseña</Text>
         <TextInput style={styles.inputStyle} placeholder="Entrar Contraseña" />
       </View>
       <View>

       </View>
       <View>
 
       </View>
</View>
<View style={styles.buttonsSection}>
{/* <Pressable 
// style={styles.googleLogin}
>
         <Image
           source={require("../assets/google.png")}
          //  style={styles.logoGoogle}
         /> */}

         {/* <Text style={styles.textGoogle}> Sign in with Google</Text>
       </Pressable> */}
       <FacebookButton />
       <GoogleButton/>

<RegisterButton  text="Create an Account"   />
<LoginButton   />

</View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    //  alignItems: 'center',
    // justifyContent: 'center',,
    paddingTop: Constants.statusBarHeight  ,
paddingHorizontal:30
  },
  
  titleSection:{
    height:"17%",
    // backgroundColor:"blue",
justifyContent:"space-between"
  },
  title: {
    fontSize: 24,
    // paddingLeft:23,
    fontWeight:"bold",
    color:"#1c1c1c"
  },
  subtitle: {
    fontSize: 14,
    // paddingLeft:23,
    color:"#3d3d3d"
  },
  inputsSection:{
    height:"33%",
    // backgroundColor:"green",
    justifyContent:"space-between"

  },
  buttonsSection:{
    height:"38%",
    // backgroundColor:"yellow",
justifyContent:"space-around",
alignItems:"center"
  },
  inputTitle:{
    paddingLeft:23,
    marginBottom:10
      },
      inputStyle: {
        backgroundColor: "white",
        height: 50,
        borderRadius: 15,
        paddingLeft:23
      },
       

})