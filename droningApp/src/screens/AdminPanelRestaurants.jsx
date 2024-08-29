import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { firestore } from '../firebase/firebaseConfig';  
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import Constants from "expo-constants";

const AdminPanelRestaurants = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const restaurantsCollection = collection(firestore, 'restaurants');

    const unsubscribe = onSnapshot(restaurantsCollection, (snapshot) => {
      const restaurantList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRestaurants(restaurantList);
    }, (error) => {
      console.error("Error fetching restaurants: ", error);
      Alert.alert("Error", "Failed to fetch restaurants.");
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'restaurants', id));
    } catch (error) {
      console.error("Error deleting restaurant: ", error);
      Alert.alert("Error", "Failed to delete restaurant.");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('AddEditRestaurant', { restaurant: item })}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <View style={styles.cardContent}>
              <Text>ID: {item.id}</Text>
              <Text>Name: {item.name}</Text>
              <Text>Address: {item.address}</Text>
              <Text>Cuisine: {item.cuisine}</Text>
              <Text>Open: {item.isOpen ? "Yes" : "No"}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddEditRestaurant')}>
        <Text style={styles.addButtonText}>Add Restaurant</Text>
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

export default AdminPanelRestaurants;
