import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Image, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const navigation = useNavigation();

  const handleRequestPress = () => {
    // Navegar a la pantalla Solicitud y pasar las direcciones como parámetros
    navigation.navigate('Solicitud', {
      pickupAddress,
      deliveryAddress
    });
  };

  return (
    <View style={styles.container}>
      {/* Sección de Inputs - 25% de la pantalla */}
      <View style={styles.inputsContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Pickup Address"
          value={pickupAddress}
          onChangeText={setPickupAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Delivery Address"
          value={deliveryAddress}
          onChangeText={setDeliveryAddress}
        />
      </View>

      {/* Sección del Mapa - 75% de la pantalla */}
      <View style={styles.mapContainer}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: -32.94682, // Coordenadas de ejemplo
            longitude: -60.63932,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Marker con la imagen del dron */}
          <Marker
            coordinate={{ latitude: -32.94682, longitude: -60.63932 }}
          >
            <Image
              source={require('../../assets/images/drones.png')}
              style={styles.dronImage}
              resizeMode="contain"
            />
          </Marker>
        </MapView>

        {/* Botón "Solicitar" */}
        <TouchableOpacity style={styles.button} onPress={handleRequestPress}>
          <Text style={styles.buttonText}>Solicitar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputsContainer: {
    flex: 1,
    maxHeight: '25%',
    padding: 10,
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  mapContainer: {
    flex: 3,
    position: 'relative',
  },
  dronImage: {
    width: 40,
    height: 40,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4682B4',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
