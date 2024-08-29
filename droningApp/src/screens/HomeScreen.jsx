import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Keyboard, TouchableHighlight  } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';  
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebase/firebaseConfig';  

const HomeScreen = () => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [status, setStatus] = useState('Esperando');
  const [arrivalTime, setArrivalTime] = useState(null);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [deliveryCoords, setDeliveryCoords] = useState(null);
  const [currentCoords, setCurrentCoords] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
    const [drones, setDrones] = useState([]);

  const [keyboardSpace, setKeyboardSpace] = useState(0);
  const [showCurrentLocationButton, setShowCurrentLocationButton] = useState(false);
  const [hideCurrentLocationMarker, setHideCurrentLocationMarker] = useState(false); // Nuevo estado

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
        const averageSpeed = 50;  
        const totalDuration = (totalDistance / averageSpeed) * 60000;  

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
  useEffect(() => {
    const fetchRestaurants = async () => {
      const restaurantsCollection = collection(firestore, 'restaurants');
      const unsubscribe = onSnapshot(restaurantsCollection, (snapshot) => {
        const restaurantList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRestaurants(restaurantList);
      }, (error) => {
        console.error("Error fetching restaurants: ", error);
        alert('No se pudieron obtener los restaurantes.');
      });

      return () => unsubscribe();
    };

    fetchRestaurants();
  }, []);
  useEffect(() => {
    const fetchDrones = async () => {
      const dronesCollection = collection(firestore, 'drones');
      const unsubscribe = onSnapshot(dronesCollection, (snapshot) => {
        const dronesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDrones(dronesList);
      }, (error) => {
        console.error("Error fetching restaurants: ", error);
        alert('No se pudieron obtener los restaurantes.');
      });

      return () => unsubscribe();
    };
    fetchDrones();
  }, []);
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

    const R = 6371;  
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000;  

    return distance;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  const resetMap = () => {
    setPickupAddress('');
    setDeliveryAddress('');
    setPickupCoords(null);
    setDeliveryCoords(null);
    setStatus('Esperando');
    setArrivalTime(null);
  };
  const reverseGeocodeLocation = async (coords) => {
    try {
      const results = await Location.reverseGeocodeAsync(coords);
       if (results.length > 0) {
        const result = results[0];
        return `${result.street},${result.name}, ${result.city}, ${result.region}`;
      }
      return null;
    } catch (error) {
      alert('Error al obtener la dirección.');
    }
    return null;
  };
  const setCurrentLocationAsDelivery=async()=>{
    if(currentCoords){
      const address=await reverseGeocodeLocation(currentCoords)
      setDeliveryAddress(address);
      setShowCurrentLocationButton(false)
    }else{
      alert("No se puedo obtener la ubicación actual")
    }
  }

  const handleRestaurantPress = async (restaurant) => {
    const address = `${restaurant.address}, Rosario`;

    // const address = `${restaurant.address}, ${restaurant.street}, ${restaurant.city}, ${restaurant.region}`;
    setPickupAddress(address);
    
  };
  const firstRestaurant = restaurants[4];
  const firstDrone = drones[2];
  return (
    <View style={styles.container}  >
     <MapView
  style={styles.map}
  initialRegion={{
    latitude: -32.94682,
    longitude: -60.63932,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
  showsCompass={false}  // Desactiva la brújula
  showsScale={false}    // Desactiva la escala
  showsTraffic={false}  // Desactiva la visibilidad del tráfico
  showsIndoors={false}  // Desactiva la visibilidad de interiores
  showsIndoorMaps={false}     
>
  {firstDrone && pickupCoords && (
    <Polyline
      coordinates={[
        { latitude: firstDrone.latitude, longitude: firstDrone.longitude },
        { latitude: pickupCoords.latitude, longitude: pickupCoords.longitude }
      ]}
      strokeColor="red"
      strokeWidth={2}
    />
  )}

  {pickupCoords && deliveryCoords && (
    <>
      <Polyline
        coordinates={[
          { latitude: pickupCoords.latitude, longitude: pickupCoords.longitude },
          { latitude: deliveryCoords.latitude, longitude: deliveryCoords.longitude }
        ]}
        strokeColor="red"
        strokeWidth={2}
      />
      <Marker
        coordinate={deliveryCoords}
        pinColor="blue"
      >
        <Icon name="home" size={30} color="blue" />
      </Marker>
    </>
  )}

  {/* {pickupCoords && (
    <Marker coordinate={pickupCoords} title="Recogida" />
  )}

  {deliveryCoords && (
    <Marker coordinate={deliveryCoords} title="Entrega" />
  )} */}

  {firstDrone && (
    <Marker
      coordinate={{ latitude: firstDrone.latitude, longitude: firstDrone.longitude }}
      title={`Drone ${firstDrone.id}`}
      description={`Estado: ${firstDrone.status}`}
      image={require('../../assets/images/drones.png')}
      pinColor="blue"
    />
  )}

  {firstRestaurant && (
    <Marker
      coordinate={{ latitude: firstRestaurant.latitude, longitude: firstRestaurant.longitude }}
      title={`Restaurante ${firstRestaurant.id}`}
      description={`Cocina: ${firstRestaurant.cuisine}`}
      onPress={() => handleRestaurantPress(firstRestaurant)}
      pinColor="green"
    >
      <Icon name="restaurant" size={30} color="#ff6347" />
    </Marker>
  )}
</MapView>

      
      {status === 'En camino' && arrivalTime !== null && (
        <Text style={styles.arrivalTime}>Tiempo de llegada: {formatTime(arrivalTime)}</Text>
      )}
      
      {status === 'Esperando' && (
        <View style={[styles.inputsContainer, { height: keyboardSpace > 0 ? '50%' : '25%' }]}>
           <View style={styles.inputContainer}>
            <Icon name="search" size={20} color="#000" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ingresar dirección de recogida"
              value={pickupAddress}
              onChangeText={setPickupAddress}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="search" size={20} color="#000" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ingresar dirección de entrega"
              value={deliveryAddress}
              onChangeText={(text)=>{ 
                setDeliveryAddress(text);
              setShowCurrentLocationButton(text.length>0); }
              }
            />
             {showCurrentLocationButton &&(
            <TouchableHighlight  style={styles.currentLocationButton} onPress={setCurrentLocationAsDelivery}>
    <Icon name="location-on" size={24} color="#fff" />
    </TouchableHighlight>
          )}
          </View>
          
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
            })
            resetMap()
            ;
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
    top: 30,
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
    borderRadius: 100,
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
    right: 20,  
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 10,
    elevation: 5,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginHorizontal: 10,

  },
  currentLocationButton: {
    backgroundColor: '#4CAF50',
    paddingRight: 0,
    // padding:10,
    borderRadius: 50,  
    // marginTop: 10,
    marginRight:10,
    alignItems: 'center', // Centra el ícono dentro del botón
  justifyContent: 'center', // Centra el ícono dentro del botón
  },
});

export default HomeScreen;
 