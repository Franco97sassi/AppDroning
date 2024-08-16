import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, TextInput, View, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import Header from '../components/Header';
import Constants from "expo-constants";
import ResetPasswordButton from '../components/Buttons/ResetPasswordButton';
import { auth } from '../firebase/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const PasswordResetScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Password reset email sent successfully');
      navigation.navigate('Login'); // Cambia 'Login' por la pantalla a la que desees navegar después de enviar el email
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
      <Header text="Back" onPress={() => navigation.goBack()} />
      <View style={styles.titleSection}>
        <Text style={styles.title}>Recuperar Contraseña</Text>
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
      </View>
      <View style={styles.buttonsSection}>
        <ResetPasswordButton onPress={handlePasswordReset} />
      </View>
      <View style={styles.empty}></View>
    </KeyboardAvoidingView>
  );
};

export default PasswordResetScreen;

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
  inputsSection: {
    height: "33%",
    justifyContent: "space-around"
  },
  buttonsSection: {
    height: "25%",
    justifyContent: "center",
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
