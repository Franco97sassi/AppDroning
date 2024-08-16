import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Animated } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FollowingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { pickupAddress, deliveryAddress } = route.params;
  const [droneCoords, setDroneCoords] = useState(null);
  const [traveledPath, setTraveledPath] = useState([]);
  const [remainingPath, setRemainingPath] = useState([]);
  const [status, setStatus] = useState('Esperando');
  const [distance, setDistance] = useState(0);
  const [remainingTime, setRemainingTime] = useState(null);
  const [progress, setProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    const initializeSimulation = async () => {
      const startCoords = await getCurrentLocation();
      const pickupCoords = await geocodeAddress(pickupAddress);
      const deliveryCoords = await geocodeAddress(deliveryAddress);

      if (startCoords && pickupCoords && deliveryCoords) {
        setStatus('Buscando'); // Cambiar el estado a 'Buscando'
        const totalDistance = calculateDistance(pickupCoords, deliveryCoords);
        setDistance(totalDistance);

        // Asumimos una velocidad promedio de 10 m/s (36 km/h)
        const speed = 10; // m/s
        const estimatedTime = totalDistance / speed; // en segundos
        setRemainingTime(estimatedTime);

        moveToCoords(startCoords, pickupCoords, () => {
          setStatus('En camino'); // Cambiar el estado a 'En camino'
          moveToCoords(pickupCoords, deliveryCoords, async () => {
            setStatus('Completado'); // Cambiar el estado a 'Completado'
            // Guarda los datos del viaje
            const travelData = {
              pickupAddress,
              deliveryAddress,
              distance,
              estimatedTime,
              completedAt: new Date().toISOString(),
            };
            await saveTravelData(travelData);

            setTimeout(() => {
              navigation.navigate('Arrival'); // Redirige a ArrivalScreen
            }, 3000); // Espera 3 segundos antes de redirigir
          });
        });
      } else {
        alert('No se pudieron obtener todas las coordenadas. Por favor, verifica las direcciones.');
      }
    };

    initializeSimulation();
  }, []);

  useEffect(() => {
    let timer;
    if (status === 'En camino' && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // Actualizar cada segundo
    }

    // Animar la barra de progreso según el estado
    let progressEndValue;
    switch (status) {
      case 'Buscando':
        progressEndValue = 1 / 3; // 33%
        break;
      case 'En camino':
        progressEndValue = 2 / 3; // 67%
        break;
      case 'Completado':
        progressEndValue = 1; // 100%
        break;
      default:
        progressEndValue = 0;
        break;
    }

    Animated.timing(progress, {
      toValue: progressEndValue,
      duration: 500, // Duración de la animación
      useNativeDriver: false,
    }).start();

    return () => clearInterval(timer);
  }, [status, remainingTime]);

  const moveToCoords = (startCoords, endCoords, onComplete) => {
    const steps = 100;
    const stepLat = (endCoords.latitude - startCoords.latitude) / steps;
    const stepLng = (endCoords.longitude - startCoords.longitude) / steps;
    let currentStep = 0;
    setTraveledPath([startCoords]);
    setRemainingPath([startCoords, endCoords]);

    const interval = setInterval(() => {
      if (currentStep < steps) {
        const newCoords = {
          latitude: startCoords.latitude + stepLat * currentStep,
          longitude: startCoords.longitude + stepLng * currentStep
        };
        setDroneCoords(newCoords);
        setTraveledPath(prevPath => [...prevPath, newCoords]);
        setRemainingPath([newCoords, endCoords]);
        currentStep++;
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, 100); // Ajusta el intervalo según sea necesario
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permiso de localización denegado');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    const coords = { latitude, longitude };
    setDroneCoords(coords);
    return coords;
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

  const saveTravelData = async (data) => {
    try {
      const existingData = await AsyncStorage.getItem('travelHistory');
      const travelHistory = existingData ? JSON.parse(existingData) : [];
      travelHistory.push(data);
      await AsyncStorage.setItem('travelHistory', JSON.stringify(travelHistory));
    } catch (error) {
      console.error('Error guardando los datos del viaje:', error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(2); // Limita a dos decimales
    return `${mins},${secs}m`;
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -32.94682,
          longitude: -60.63932,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {droneCoords && (
          <>
            <Marker coordinate={droneCoords}>
              <Image
                source={require('../../assets/images/drones.png')}
                style={styles.dronImage}
                resizeMode="contain"
              />
            </Marker>

            <Polyline
              coordinates={traveledPath}
              strokeColor="red"
              strokeWidth={6}
            />
            <Polyline
              coordinates={remainingPath}
              strokeColor="blue"
              strokeWidth={6}
            />
          </>
        )}
      </MapView>
      <View style={styles.statusContainer}>
        {/* Barra de Progreso */}
        <View style={styles.progressBar}>
          <Animated.View
            style={[styles.progress, { width: progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%']
            }) }]}
          />
        </View>
        <Text style={styles.statusText}>Estado: {status}</Text>
        {(status === 'Buscando' || status === 'En camino' || status === 'Completado') && (
          <>
            {status === 'Buscando' || status === 'En camino' && remainingTime !== null && (
              <Text style={styles.arrivalText}>Tiempo de llegada: {formatTime(remainingTime)}</Text>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  dronImage: {
    width: 50,
    height: 50,
  },
  statusContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semi-transparente
    padding: 16,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
    marginTop: 8,
  },
  progress: {
    height: '100%',
    backgroundColor: '#76c7c0',
    borderRadius: 5,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrivalText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default FollowingScreen;
