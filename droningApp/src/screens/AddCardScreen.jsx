// screens/AddCard.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

const AddCard = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');

  const handleAddCard = () => {
    // Aquí puedes agregar la lógica para manejar la información de la tarjeta
    Alert.alert('Tarjeta Agregada', 'La tarjeta ha sido agregada exitosamente.');
  };

  return (
    <View style={styles.container}>
      {/* Puedes descomentar la imagen si la necesitas */}
      {/* <Image
        source={require('../../assets/images/credit-card.png')} // Cambia la ruta según tu imagen
        style={styles.cardImage}
      /> */}
      <Text style={styles.title}>Agregar Tarjeta</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleAddCard}>
        <Text style={styles.buttonText}>Agregar Tarjeta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  cardImage: {
    width: '100%',
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Centra el texto
  },
  input: {
    height: 50,
    width: '100%', // Asegura que el input ocupe todo el ancho disponible
    maxWidth: 400, // Ancho máximo para evitar que el input se estire demasiado en pantallas grandes
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
    width: '100%', // Asegura que el botón ocupe todo el ancho disponible
    maxWidth: 400, // Ancho máximo para evitar que el botón se estire demasiado en pantallas grandes
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AddCard;
