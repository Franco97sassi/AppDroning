import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Image, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import Constants from "expo-constants";
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [droneCoords, setDroneCoords] = useState(null);
  const [traveledPath, setTraveledPath] = useState([]);
  const [remainingPath, setRemainingPath] = useState([]);
  const [status, setStatus] = useState('Esperando');
  const navigation = useNavigation();

  const handleRequestPress = async () => {
    const startCoords = droneCoords || await getCurrentLocation();
    const pickupCoords = await geocodeAddress(pickupAddress);
    const deliveryCoords = await geocodeAddress(deliveryAddress);

     setStatus('Recogiendo');
    moveToCoords(startCoords, pickupCoords, () => {
       setStatus('En camino');
      moveToCoords(pickupCoords, deliveryCoords, () => {
        setStatus('Entregado');
      });
    });
  };

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
    }, 100); // Cambiado a 200 ms para un movimiento más lento
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

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.statusBar}>Estado: {status}</Text>
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

      <View style={styles.mapContainer}>
        <MapView
          style={StyleSheet.absoluteFillObject}
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

        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => {
            if (status === 'Entregado') {
              navigation.navigate('Request', {
                pickupAddress: pickupAddress,
                deliveryAddress: deliveryAddress,
              });            } else {
              handleRequestPress();  
            }
          }}
        >
          <Text style={styles.buttonText}>
            {status === 'Entregado' ? 'Pagar' : 'Solicitar'}
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  statusBar: {
    backgroundColor: '#4682B4',
    color: 'white',
    paddingVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputsContainer: {
    flex: 1,
    maxHeight: '25%',
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
