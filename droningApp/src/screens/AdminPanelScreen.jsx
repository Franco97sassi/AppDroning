import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { firestore } from '../firebase/firebaseConfig';  
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import Constants from "expo-constants";

const AdminPanelScreen = ({ navigation }) => {
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    const dronesCollection = collection(firestore, 'drones');

     const unsubscribe = onSnapshot(dronesCollection, (snapshot) => {
      const droneList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDrones(droneList);
    }, (error) => {
      console.error("Error fetching drones: ", error);
      Alert.alert("Error", "Failed to fetch drones.");
    });

     return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'drones', id));
    } catch (error) {
      console.error("Error deleting drone: ", error);
      Alert.alert("Error", "Failed to delete drone.");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
  data={drones}
  keyExtractor={(item) => {
    return item.id;
  }}
  renderItem={({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('AddEditDrone', { drone: item })}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
      <View style={styles.cardContent}>
        <Text>ID: {item.id}</Text>
        <Text>Latitude: {item.latitude}</Text>
        <Text>Longitude: {item.longitude}</Text>
        <Text>Has Battery: {item.hasBattery ? "Yes" : "No"}</Text>
        <Text>In Route: {item.isInRoute ? "Yes" : "No"}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  )}
/>

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddEditDrone')}>
        <Text style={styles.addButtonText}>Add Drone</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: Constants.statusBarHeight,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    padding: 12,
    width: '90%',
    alignSelf: 'center',
    position: 'relative',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    marginBottom: 32,
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 4,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AdminPanelScreen;
