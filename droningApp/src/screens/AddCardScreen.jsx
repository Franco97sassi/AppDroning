import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCardScreen  = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');

  useEffect(() => {
    // Cargar datos de la tarjeta almacenados al cargar el componente
    const loadCardData = async () => {
      try {
        const storedCardNumber = await AsyncStorage.getItem('cardNumber');
        const storedFirstName = await AsyncStorage.getItem('firstName');
        const storedLastName = await AsyncStorage.getItem('lastName');
        const storedExpirationDate = await AsyncStorage.getItem('expirationDate');
        const storedSecurityCode = await AsyncStorage.getItem('securityCode');

        if (storedCardNumber) setCardNumber(storedCardNumber);
        if (storedFirstName) setFirstName(storedFirstName);
        if (storedLastName) setLastName(storedLastName);
        if (storedExpirationDate) setExpirationDate(storedExpirationDate);
        if (storedSecurityCode) setSecurityCode(storedSecurityCode);
      } catch (error) {
        console.error('Error loading card data:', error);
      }
    };

    loadCardData();
  }, []);

  const  AddCard = async () => {
    try {
      // Guarda la información de la tarjeta en AsyncStorage
      await AsyncStorage.setItem('cardNumber', cardNumber);
      await AsyncStorage.setItem('firstName', firstName);
      await AsyncStorage.setItem('lastName', lastName);
      await AsyncStorage.setItem('expirationDate', expirationDate);
      await AsyncStorage.setItem('securityCode', securityCode);

      Alert.alert('Tarjeta Agregada', 'La tarjeta ha sido agregada exitosamente.');
    } catch (error) {
      console.error('Error saving card data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Tarjeta</Text>
      <Image source={require('../../assets/images/cardcredit.png')} resizeMode="contain" style={styles.methodImage} />

      <TextInput
        style={styles.input}
        placeholder="Número de tarjeta"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Fecha de expiración (MM/AA)"
        value={expirationDate}
        onChangeText={setExpirationDate}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Código de seguridad"
        value={securityCode}
        onChangeText={setSecurityCode}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={AddCard}>
        <Text style={styles.buttonText}>Agregar Tarjeta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    maxWidth: 400,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  methodImage: {
    width: 300,
    height: 250,
    marginVertical: 10,
  },
});

export default AddCardScreen ;
