import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const RequestButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Solicitar</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4682B4',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    elevation: 5, // Agrega sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 }, // Sombra en iOS
    shadowOpacity: 0.2, // Sombra en iOS
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RequestButton;
