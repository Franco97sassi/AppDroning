import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { firestore } from '../firebase/firebaseConfig'; // Ruta a tu configuración de Firebase
import { collection, onSnapshot } from 'firebase/firestore';

const SettingsScreen = () => {
  const [drones, setDrones] = useState([]);
  const [initialRegion, setInitialRegion] = useState({
    latitude: -34.6037, // Coordenadas iniciales, por ejemplo, Buenos Aires
    longitude: -58.3816,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Error', 'Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    };

    fetchLocation();

    const dronesCollection = collection(firestore, 'drones');

    // Escuchar los cambios en tiempo real
    const unsubscribe = onSnapshot(dronesCollection, (snapshot) => {
      const droneList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDrones(droneList);
    }, (error) => {
      console.error("Error fetching drones: ", error);
      Alert.alert("Error", "Failed to fetch drones.");
    });

    return () => unsubscribe();
  }, []);

  const renderDroneIcon = () => (
    <Image
      source={require('../../assets/images/drones.png')}
      style={styles.dronImage}
      resizeMode="contain"
    />
  );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
      >
        {drones.map(drone => (
          <Marker
            key={drone.id}
            coordinate={{
              latitude: drone.latitude,
              longitude: drone.longitude,
            }}
            title={`Drone ${drone.id}`}
            description={`Has Battery: ${drone.hasBattery ? "Yes" : "No"}, In Route: ${drone.isInRoute ? "Yes" : "No"}`}
            icon={Image.resolveAssetSource(require('../../assets/images/drones.png')).uri} // Usa la URI de la imagen importada
          />
        ))}
      </MapView>
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
    width: 20,  // Ajusta el tamaño según sea necesario
    height: 20, // Ajusta el tamaño según sea necesario
  },
});

export default SettingsScreen;
