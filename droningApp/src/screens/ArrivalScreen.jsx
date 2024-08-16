import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const ArrivalScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>¡Disfrute su orden!</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Volver a Inicio</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
    backgroundColor: "#4682B4",
    width: 335,
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default ArrivalScreen;
