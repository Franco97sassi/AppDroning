import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Keyboard, Dimensions } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [status, setStatus] = useState('Esperando');
  const [arrivalTime, setArrivalTime] = useState(null);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [deliveryCoords, setDeliveryCoords] = useState(null);
  const [currentCoords, setCurrentCoords] = useState(null);
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
    const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permiso para acceder a la ubicación denegado');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setCurrentCoords({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    getCurrentLocation();
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

        setPickupCoords(pickupCoords);
        setDeliveryCoords(deliveryCoords);

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

    setPickupCoords(pickupCoords);
    setDeliveryCoords(deliveryCoords);

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
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -32.94682,
          longitude: -60.63932,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {currentCoords && pickupCoords && (
          <Polyline
            coordinates={[
              { latitude: currentCoords.latitude, longitude: currentCoords.longitude },
              { latitude: pickupCoords.latitude, longitude: pickupCoords.longitude }
            ]}
            strokeColor="red" // Color de la línea desde la ubicación actual hasta la recogida
            strokeWidth={2}
          />
        )}
        {pickupCoords && deliveryCoords && (
          <Polyline
            coordinates={[
              { latitude: pickupCoords.latitude, longitude: pickupCoords.longitude },
              { latitude: deliveryCoords.latitude, longitude: deliveryCoords.longitude }
            ]}
            strokeColor="red" // Color de la línea desde la recogida hasta la entrega
            strokeWidth={2}
          />
        )}
        {pickupCoords && (
          <Marker coordinate={pickupCoords} title="Recogida" />
        )}
        {deliveryCoords && (
          <Marker coordinate={deliveryCoords} title="Entrega" />
        )}
        {currentCoords && (
          <Marker
            coordinate={currentCoords}
            title="Ubicación Actual"
            image={require('../../assets/images/drones.png')} // Ruta de la imagen del dron
            style={styles.dron}
          />
        )}
      </MapView>
      
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
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
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    padding: 10,
    // backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    zIndex: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  dron:{
    width:50,
    height:50
  },
  button: {
    position: 'absolute',
    bottom: 40,
    right: 20, // Cambia `left` a `right` para ubicar el botón a la derecha
    backgroundColor: '#4682B4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    zIndex: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
 