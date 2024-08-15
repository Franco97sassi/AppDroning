import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SolicitudScreen = ({ route }) => {
  // Extraer parámetros de la navegación
  const { pickupAddress, deliveryAddress } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Pickup Address:</Text>
      <Text style={styles.value}>{pickupAddress}</Text>
      <Text style={styles.label}>Delivery Address:</Text>
      <Text style={styles.value}>{deliveryAddress}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default SolicitudScreen;
