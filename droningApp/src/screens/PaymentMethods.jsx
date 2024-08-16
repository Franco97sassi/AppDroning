import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PaymentMethods = () => {
  const navigation = useNavigation();

  const handlePaymentOption = (option) => {
    if (option === 'Agregar Tarjeta') {
      navigation.navigate('AddCard');
    } else if (option === 'Mercado Pago') {
      const url = Platform.OS === 'android'
        ? 'intent://pay#Intent;package=com.mercadopago.android.px;scheme=mercadopago;end'
        : 'mercadopago://'; // Verifica si Mercado Pago tiene un esquema específico para iOS

      Linking.canOpenURL(url)
        .then((supported) => {
          if (supported) {
            Linking.openURL(url);
          } else {
            // Intentar abrir la tienda de aplicaciones si la app no está instalada
            const storeUrl = Platform.OS === 'android'
              ? 'market://details?id=com.mercadopago.android.px'
              : 'https://apps.apple.com/app/idXXXXXXXXX'; // Reemplaza con el ID de la app en iOS
            
            Linking.canOpenURL(storeUrl)
              .then((storeSupported) => {
                if (storeSupported) {
                  Linking.openURL(storeUrl);
                } else {
                  Alert.alert('Error', 'No se pudo abrir la tienda de aplicaciones.');
                }
              })
              .catch((err) => {
                Alert.alert('Error', 'Ocurrió un error al intentar abrir la tienda de aplicaciones.');
              });
          }
        })
        .catch((err) => {
          Alert.alert('Error', 'Ocurrió un error al intentar abrir la aplicación.');
        });
    } else {
      // Manejo para otras opciones de pago
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Métodos de Pago</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePaymentOption('Agregar Tarjeta')}
      >
        <Text style={styles.buttonText}>Agregar Tarjeta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePaymentOption('Efectivo')}
      >
        <Text style={styles.buttonText}>Efectivo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePaymentOption('Mercado Pago')}
      >
        <Text style={styles.buttonText}>Mercado Pago</Text>
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
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default PaymentMethods;
