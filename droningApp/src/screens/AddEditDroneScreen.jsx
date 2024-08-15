import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import { firestore } from '../firebase/firebaseConfig'; // Ruta a tu configuración de Firebase
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';

const AddEditDroneScreen = ({ route, navigation }) => {
  const { drone } = route.params || {};
  const [latitude, setLatitude] = useState(drone ? drone.latitude.toString() : '');
  const [longitude, setLongitude] = useState(drone ? drone.longitude.toString() : '');
  const [hasBattery, setHasBattery] = useState(drone ? drone.hasBattery : true);
  const [isInRoute, setIsInRoute] = useState(drone ? drone.isInRoute : false);

  const handleSave = async () => {
    if (drone) {
      const droneRef = doc(firestore, 'drones', drone.id);
      await updateDoc(droneRef, { latitude: parseFloat(latitude), longitude: parseFloat(longitude), hasBattery, isInRoute });
    } else {
      await addDoc(collection(firestore, 'drones'), {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        hasBattery,
        isInRoute,
      });
    }
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}> Panel Admin</Text>
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          value={latitude}
          onChangeText={setLatitude}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          value={longitude}
          onChangeText={setLongitude}
          keyboardType="numeric"
        />
        <View style={styles.statusContainer}>
          <View style={styles.statusItem}>
            <Text>Has Battery:</Text>
            <Button title={hasBattery ? "Yes" : "No"} onPress={() => setHasBattery(!hasBattery)} />
          </View>
          <View style={styles.statusItem}>
            <Text>In Route:</Text>
            <Button title={isInRoute ? "Yes" : "No"} onPress={() => setIsInRoute(!isInRoute)} />
          </View>
        </View>
        <Button title="Save" onPress={handleSave} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
    padding: 16,
  },
  form: {
    width: '100%', // Ocupa el ancho completo del contenedor
    maxWidth: 400, // Ancho máximo para evitar que sea demasiado ancho en pantallas grandes
    alignItems: 'center', // Centra los elementos dentro del formulario
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    width: '100%', // Ocupa el ancho completo del formulario
    paddingHorizontal: 8,
  },
  statusContainer: {
    flexDirection: 'column', // Alinea los elementos en una columna
    width: '100%', // Ocupa el ancho completo del formulario
    alignItems: 'center', // Centra los elementos dentro del contenedor
    marginBottom: 16,
  },
  statusItem: {
    flexDirection: 'row', // Alinea los elementos en una fila
    justifyContent: 'space-between', // Espacia los elementos
    width: '80%', // Ocupa el 80% del ancho del formulario
    marginBottom: 16,
    alignItems: 'center', // Centra los elementos verticalmente
  },
});

export default AddEditDroneScreen;
