import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { firestore } from '../firebase/firebaseConfig'; // Ruta a tu configuración de Firebase
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Constants from "expo-constants";

const AdminPanelScreen = ({ navigation }) => {
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    const fetchDrones = async () => {
      const dronesCollection = collection(firestore, 'drones');
      const droneSnapshot = await getDocs(dronesCollection);
      const droneList = droneSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDrones(droneList);
    };

    fetchDrones();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(firestore, 'drones', id));
    setDrones(drones.filter(drone => drone.id !== id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={drones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('AddEditDrone', { drone: item })}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <View style={styles.cardContent}>
              <Text>ID: {item.id}</Text>
              <Text>Latitude: {item.latitude}</Text>
              <Text>Longitude: {item.longitude}</Text>
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
    padding: 16,     paddingTop: Constants.statusBarHeight 

  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    padding: 12, // Reducción del padding
    width: '90%', // Ajusta el ancho de las cajas
    alignSelf: 'center', // Centra la caja horizontalmente
    position: 'relative', // Para posicionar los botones
    elevation: 2, // Para sombras en Android
    shadowColor: '#000', // Para sombras en iOS
    shadowOffset: { width: 0, height: 2 }, // Para sombras en iOS
    shadowOpacity: 0.1, // Para sombras en iOS
    shadowRadius: 4, // Para sombras en iOS
  },
  cardContent: {
    marginBottom: 32, // Deja espacio para el botón de eliminar
    alignItems: 'center', // Centra el contenido dentro de la tarjeta
  },
  editButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#4CAF50',
    padding: 8, // Reducción del padding
    borderRadius: 4,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#f44336',
    padding: 8, // Reducción del padding
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14, // Reducción del tamaño de la fuente
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 12, // Reducción del padding
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
