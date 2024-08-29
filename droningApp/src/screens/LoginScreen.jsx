 import React, { useState, useEffect } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, View, Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Constants from "expo-constants";
import RegisterButton from '../components/Buttons/RegisterButton';
import LoginButton from '../components/Buttons/LoginButton';
import { auth } from '../firebase/firebaseConfig'; // Asegúrate de que la configuración de Firebase esté correcta
import { FacebookAuthProvider, GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Facebook from 'expo-facebook';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import * as Google from 'expo-auth-session/providers/google';
import { useIdTokenAuthRequest } from 'expo-auth-session';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(true);
   
  useEffect(() => {
     
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
      setButtonsVisible(false); // Oculta los botones cuando el teclado está visible
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
      setButtonsVisible(true); // Muestra los botones cuando el teclado se oculta
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '129885057989-52mdshqs60qmrte7q45qht1j1bsoucja.apps.googleusercontent.com', // desde tu consola de Google Cloud
  });
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;

      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      firebase.auth().signInWithCredential(credential)
        .then(user => {
          console.log('Usuario autenticado:', user);
        })
        .catch(error => {
          console.error('Error al autenticar:', error);
        });
    }
  }, [response]);
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await AsyncStorage.setItem('userEmail', user.email); // Guarda el correo del usuario en AsyncStorage
      Alert.alert('Success', 'Logged in successfully');
      navigation.navigate('Home'); // Cambia 'Home' por la pantalla a la que desees navegar después del login
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header text="Skip"/>
      <View style={styles.titleSection}>
        <Text style={styles.title}>Iniciar Sesión a tu cuenta</Text>
        <Text></Text>
      </View>
      <View style={[styles.inputsSection, { height: keyboardVisible ? "50%" : "33%" }]}>
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
        <View>
          <Text style={styles.inputTitle}>Contraseña</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Entrar Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <Text></Text>
      </View>
      {keyboardVisible ? (
        <View style={styles.buttonsSection}>
          <LoginButton onPress={handleLogin} />
        </View>
      ) : (
        <View style={styles.buttonsSection}>
          <LoginButton onPress={handleLogin} />
          <RegisterButton text="Create an Account" onPress={() => navigation.navigate('Register')} />
          <View style={styles.links}>
            {/* <TouchableOpacity onPress={signInWithFB}>
              <Image style={styles.logo} source={require('../assets/images/facebook.png')} />
            </TouchableOpacity> */}
            {/* <TouchableOpacity onPress={signInWithGoogle}>
  <Image style={styles.logo} source={require('../assets/images/googleIcon.png')} />
</TouchableOpacity> */}
 <TouchableOpacity onPress={()=> promptAsync()}>
  <Image style={styles.logo} source={require('../assets/images/googleIcon.png')} />
</TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('RecoveryPassword')}>
            <Text style={styles.recoverPasswordText}>Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.empty}></View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 30
  },
  titleSection: {
    height: "10%",
    justifyContent: "space-between",
    alignItems:"center",
    color:""
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4682B4"
  },
  subtitle: {
    fontSize: 14,
    color: "#3d3d3d"
  },
  inputsSection: {
    height: "33%",
    justifyContent: "space-between"
  },
  buttonsSection: {
    height: "35%",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  inputTitle: {
    paddingLeft: 23,
    marginBottom: 10,
    color:"#4682B4"
  },
  inputStyle: {
    backgroundColor: "white",
    height: 50,
    borderRadius: 15,
    paddingLeft: 23
  },
  logo: {
    width: 30,
    height: 30
  },
  links: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  empty: {
    height: "10%"
  },
  recoverPasswordText: {
    color: "#4682B4",
    textDecorationLine: "underline"
  },
});
