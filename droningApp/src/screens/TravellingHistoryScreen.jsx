import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TravellingHistoryScreen = () => {
  const [travelHistory, setTravelHistory] = useState([]);

  useEffect(() => {
    const fetchTravelHistory = async () => {
      try {
        const data = await AsyncStorage.getItem('travelHistory');
        if (data) {
          setTravelHistory(JSON.parse(data));
        }
      } catch (error) {
        console.error('Error fetching travel history:', error);
      }
    };

    fetchTravelHistory();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.text}>Recogida: {item.pickupAddress}</Text>
      <Text style={styles.text}>Entrega: {item.deliveryAddress}</Text>
      {/* <Text style={styles.text}>Distancia: {item.distance.toFixed(2)} m</Text> */}
      <Text style={styles.text}>Tiempo estimado: {formatTime(item.estimatedTime)}</Text>
      <Text style={styles.text}>Finalizado: {new Date(item.completedAt).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={travelHistory}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text>No hay historial de viajes.</Text>}
      />
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
    padding: 20,
  },
  itemContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    fontSize: 16,
  },
});

export default TravellingHistoryScreen;
