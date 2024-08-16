import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
 
const PaymentMethods = () => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate('AddCard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Métodos de Pago</Text>

 <View style={styles.methodContainer}>
        <Image source={require('../../assets/images/cash.png')}   style={styles.methodImage} />
        <Text style={styles.methodTitle}>Efectivo</Text>
      </View>  

      <TouchableOpacity style={styles.methodContainer} onPress={handleCardPress}>
        <Image source={require('../../assets/images/card.png')}   style={styles.methodImage} />
        <Text style={styles.methodTitle}>Tarjeta/Credito/Debito</Text>
      </TouchableOpacity>

      <View style={styles.methodContainer}>
        <Image source={require('../../assets/images/mercado_pago.png')}    style={styles.methodImage} />
        <Text style={styles.methodTitle}>Mercado Pago</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  methodContainer: {
    flexDirection: 'row', // Hacer que los elementos se alineen horizontalmente
    alignItems: 'center', // Centrar verticalmente los elementos
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2,
  },
  methodTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10, // Espacio entre la imagen y el texto
  },
  methodImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain', // Asegurar que la imagen se ajuste al tamaño especificado
  },
});

export default PaymentMethods;
