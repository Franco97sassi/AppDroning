import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';

const ConfirmationScreen = ({ route }) => {
    const { pickupAddress, deliveryAddress } = route.params || {};

    // Manejar el caso en que no se reciben las direcciones
    if (!pickupAddress || !deliveryAddress) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: No se recibieron direcciones.</Text>
            </View>
        );
    }

    const [currentLocation, setCurrentLocation] = useState(pickupAddress);

    // Simular el movimiento del dron
    useEffect(() => {
        const interval = setInterval(() => {
            // Lógica básica para simular movimiento
            const newLat = currentLocation.latitude + (deliveryAddress.latitude - pickupAddress.latitude) * 0.01;
            const newLon = currentLocation.longitude + (deliveryAddress.longitude - pickupAddress.longitude) * 0.01;

            setCurrentLocation({
                latitude: newLat,
                longitude: newLon,
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [currentLocation, pickupAddress, deliveryAddress]);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: pickupAddress.latitude,
                    longitude: pickupAddress.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Polyline
                    coordinates={[pickupAddress, currentLocation]}
                    strokeColor="blue"
                    strokeWidth={3}
                />
                <Polyline
                    coordinates={[currentLocation, deliveryAddress]}
                    strokeColor="red"
                    strokeWidth={3}
                />

                <Marker coordinate={currentLocation} title="Drone" />
                <Marker coordinate={pickupAddress} title="Pickup Location" pinColor="green" />
                <Marker coordinate={deliveryAddress} title="Delivery Location" pinColor="red" />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default ConfirmationScreen;
