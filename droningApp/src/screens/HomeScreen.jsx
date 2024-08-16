import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Image, TouchableOpacity, Text, Keyboard, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [status, setStatus] = useState('Esperando');
  const [arrivalTime, setArrivalTime] = useState(null);
  const [keyboardSpace, setKeyboardSpace] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardSpace(event.endCoordinates.height);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardSpace(0);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (status === 'En camino') {
      const calculateEstimatedTime = async () => {
        const pickupCoords = await geocodeAddress(pickupAddress);
        const deliveryCoords = await geocodeAddress(deliveryAddress);

        if (!pickupCoords || !deliveryCoords) {
          alert('No se pudieron obtener todas las coordenadas. Por favor, verifica las direcciones.');
          return;
        }

        const totalDistance = calculateDistance(pickupCoords, deliveryCoords);
        const averageSpeed = 50; // Velocidad promedio en metros por minuto
        const totalDuration = (totalDistance / averageSpeed) * 60000; // Tiempo total en ms

        const endTime = Date.now() + totalDuration;

        const interval = setInterval(() => {
          const now = Date.now();
          const timeLeft = Math.max(0, endTime - now);
          setArrivalTime(timeLeft);
          if (timeLeft === 0) clearInterval(interval);
        }, 1000);

        return () => clearInterval(interval);
      };

      calculateEstimatedTime();
    }
  }, [status]);

  const handleRequestPress = async () => {
    const pickupCoords = await geocodeAddress(pickupAddress);
    const deliveryCoords = await geocodeAddress(deliveryAddress);

    if (!pickupCoords || !deliveryCoords) {
      alert('No se pudieron obtener todas las coordenadas. Por favor, verifica las direcciones.');
      return;
    }

    setStatus('Recogiendo');
    setStatus('En camino');
    setStatus('Entregado');
  };

  const geocodeAddress = async (address) => {
    let geocoded = await Location.geocodeAsync(address);
    if (geocoded.length > 0) {
      const { latitude, longitude } = geocoded[0];
      return { latitude, longitude };
    }
    return null;
  };

  const calculateDistance = (coord1, coord2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const lat1 = coord1.latitude;
    const lon1 = coord1.longitude;
    const lat2 = coord2.latitude;
    const lon2 = coord2.longitude;

    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // Distancia en metros

    return distance;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container} keyboardVerticalOffset={Constants.statusBarHeight}>
      <View style={styles.innerContainer}>
        {status !== 'Esperando' && (
          <Text style={styles.statusBar}>Estado: {status}</Text>
        )}
        {status === 'En camino' && arrivalTime !== null && (
          <Text style={styles.arrivalTime}>Tiempo de llegada: {formatTime(arrivalTime)}</Text>
        )}
        {status === 'Esperando' && (
          <View style={[styles.inputsContainer, { height: keyboardSpace > 0 ? '50%' : '25%' }]}>
            <TextInput
              style={styles.input}
              placeholder="Ingresar dirección de recogida"
              value={pickupAddress}
              onChangeText={setPickupAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="Ingresar dirección de entrega"
              value={deliveryAddress}
              onChangeText={setDeliveryAddress}
            />
          </View>
        )}
        <View style={[styles.mapContainer, { height: Dimensions.get('window').height - keyboardSpace - 10 }]}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -32.94682,
              longitude: -60.63932,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {/* Aquí puedes agregar cualquier marcador adicional o polilíneas si es necesario */}
          </MapView>
          
          {status !== 'Entregado' && (
            <TouchableOpacity
              style={styles.button}
              onPress={handleRequestPress}
            >
              <Text style={styles.buttonText}>Solicitar</Text>
            </TouchableOpacity>
          )}

          {status === 'Entregado' && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('Request', {
                  pickupAddress: pickupAddress,
                  deliveryAddress: deliveryAddress,
                  arrivalTime: formatTime(arrivalTime),
                });
              }}
            >
              <Text style={styles.buttonText}>Pagar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  innerContainer: {
    flex: 1,
    position: 'relative',
  },
  statusBar: {
    backgroundColor: '#4682B4',
    color: 'white',
    paddingVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  arrivalTime: {
    backgroundColor: '#4682B4',
    color: 'white',
    paddingVertical: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  inputsContainer: {
    flex: 1,
    maxHeight: '35%',
    padding: 10,
    justifyContent: 'space-evenly',
  },
  input: {
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
    width: '100%',
  },
  map: {
    flex: 1,
  },
  dronImage: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#4682B4',
    padding: 15,
    borderRadius: 10,
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
