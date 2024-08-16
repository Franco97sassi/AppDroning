import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, Animated } from 'react-native';
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
        setStatus('En camino');
        const totalDistance = calculateDistance(pickupCoords, deliveryCoords);
        setDistance(totalDistance);

        // Asumimos una velocidad promedio de 10 m/s (36 km/h)
        const speed = 10; // m/s
        const estimatedTime = totalDistance / speed; // en segundos
        setRemainingTime(estimatedTime);

        moveToCoords(startCoords, pickupCoords, () => {
          moveToCoords(pickupCoords, deliveryCoords, async () => {
            setStatus('Entregado');
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

      // Animar la barra de progreso
      Animated.timing(progress, {
        toValue: 1,
        duration: remainingTime * 1000,
        useNativeDriver: false,
      }).start();
    }
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
        <Text style={styles.statusText}>Estado: {status}</Text>
        {status === 'En camino' && remainingTime !== null && (
          <>
            <Text style={styles.arrivalText}>Tiempo de llegada: {formatTime(remainingTime)}</Text>
            <View style={styles.progressContainer}>
              <Animated.View
                style={[
                  styles.progressBar,
                  { width: `${progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%']
                    })}` }
                ]}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
    top: 50, // Ajusta según la altura de la barra de estado del sistema
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  arrivalText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'green',
  },
  progressContainer: {
    height: 10,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#76c7c0',
  },
});

export default FollowingScreen;
