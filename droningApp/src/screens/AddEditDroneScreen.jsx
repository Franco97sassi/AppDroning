import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { firestore } from '../firebase/firebaseConfig'; // Ruta a tu configuración de Firebase
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';

const AddEditDroneScreen = ({ route, navigation }) => {
  const { drone } = route.params || {};
  const [latitude, setLatitude] = useState(drone ? drone.latitude.toString() : '');
  const [longitude, setLongitude] = useState(drone ? drone.longitude.toString() : '');
  const [hasBattery, setHasBattery] = useState(drone ? drone.hasBattery : true);
  const [isInRoute, setIsInRoute] = useState(drone ? drone.isInRoute : false);

  const handleSave = async () => {
    try {
      if (!latitude || !longitude) {
        Alert.alert("Error", "Latitude and Longitude are required.");
        return;
      }

      if (drone) {
        // Editar un dron existente
        const droneRef = doc(firestore, 'drones', drone.id);
        const droneSnapshot = await getDoc(droneRef);
        
        if (droneSnapshot.exists()) {
          await updateDoc(droneRef, {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            hasBattery,
            isInRoute,
          });
          Alert.alert("Success", "Drone updated successfully!");
        } else {
          Alert.alert("Error", "Drone does not exist.");
        }
      } else {
        // Agregar un nuevo dron
        await addDoc(collection(firestore, 'drones'), {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          hasBattery,
          isInRoute,
        });
        Alert.alert("Success", "Drone added successfully!");
      }

      navigation.goBack();
    } catch (error) {
      console.error("Error saving drone data: ", error);
      Alert.alert("Error", "Failed to save drone data.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>{drone ? "Edit Drone" : "Add Drone"}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
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
    width: '100%',
    paddingHorizontal: 8,
  },
  statusContainer: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 16,
    alignItems: 'center',
  },
});

export default AddEditDroneScreen;
