import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, View, Alert, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import Header from '../components/Header';
import Constants from "expo-constants";
import RegisterButton from '../components/Buttons/RegisterButton';
import LoginButton from '../components/Buttons/LoginButton';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header text="Skip" />
      <View style={styles.titleSection}>
        <Text style={styles.title}>Create an Account</Text>
        <Text></Text>
      </View>
      <View style={[styles.inputsSection, { height: keyboardVisible ? "56%" : "33%" }]}>
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
      {keyboardVisible ? (
        <View style={styles.buttonsSection}>
          <RegisterButton text="Create an Account" onPress={handleRegister} />
        </View>
      ) : (
        <View style={styles.buttonsSection}>
          <RegisterButton text="Create an Account" onPress={handleRegister} />
          <LoginButton onPress={() => navigation.navigate('Login')} />
        </View>
      )}
      <View style={styles.empty}></View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 30
  },
  titleSection: {
    height: "10%",
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
    height: "25%",
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
  empty: {
    height: "20%"
  }
});
