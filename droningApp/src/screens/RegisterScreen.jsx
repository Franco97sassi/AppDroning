import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import Header from '../components/Header';
import Constants from "expo-constants";
import RegisterButton from '../components/Buttons/RegisterButton';
import LoginButton from '../components/Buttons/LoginButton';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created successfully');
      navigation.navigate('Login'); // Navega a la pantalla de inicio de sesión después del registro
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Header text="Skip" />
      <View style={styles.titleSection}>
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.subtitle}>
          Welcome Friend, enter your details so let's get started in ordering food
        </Text>
        <Text></Text>
      </View>
      <View style={styles.inputsSection}>
        <View>
          <Text style={styles.inputTitle}>Email</Text>
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
            placeholder="Entrar contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View>
          <Text style={styles.inputTitle}>Confirmar Contraseña</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
      </View>
      <View style={styles.buttonsSection}>
        {/* <Pressable
          style={styles.googleLogin}
          onPress={() => { /* Implement Google Sign-In logic here * / }}
        >
          <Image
            source={require("../assets/google.png")}
            style={styles.logoGoogle}
          />
          <Text style={styles.textGoogle}> Sign in with Google</Text>
        </Pressable> */}
        <RegisterButton text="Create an Account" onPress={handleRegister} />
        <LoginButton onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 30
  },
  titleSection: {
    height: "17%",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1c1c1c"
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
    height: "38%",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  inputTitle: {
    paddingLeft: 23,
    marginBottom: 10
  },
  inputStyle: {
    backgroundColor: "white",
    height: 50,
    borderRadius: 15,
    paddingLeft: 23
  },
  // Estilos para el botón de Google (descomentarlo y ajustarlo según sea necesario)
  // googleLogin: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // logoGoogle: {
  //   width: 24,
  //   height: 24,
  //   marginRight: 8,
  // },
  // textGoogle: {
  //   fontSize: 16,
  // }
});
