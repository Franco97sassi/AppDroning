import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        const storedName = await AsyncStorage.getItem('userName');
        const storedPhone = await AsyncStorage.getItem('userPhone');

        if (storedEmail) {
          setEmail(storedEmail);
        }
        if (storedName) {
          setName(storedName);
        }
        if (storedPhone) {
          setPhone(storedPhone);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('userName', name);
      await AsyncStorage.setItem('userPhone', phone);
      console.log('Información guardada:', { name, phone });
    } catch (error) {
      console.error('Error saving user info:', error);
    }
  };

  const navigation = useNavigation();

  const handleAddPaymentMethod = () => {
    navigation.navigate('PaymentMethods');
  };

  const handleNotificationSettings = () => {
    navigation.navigate('Notifications');
  };

  const handleViewHistory = () => {
    navigation.navigate('TravellingHistory');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Cierra la sesión del usuario
      // await AsyncStorage.removeItem('userEmail'); // Borra el email almacenado
      // await AsyncStorage.removeItem('userName'); // Borra el nombre almacenado
      // await AsyncStorage.removeItem('userPhone'); // Borra el teléfono almacenado
      navigation.navigate('Login'); // Redirige a la pantalla de inicio de sesión
    } catch (error) {
      console.error('Error closing session:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información Personal</Text>
        <Text style={styles.infoText}>Correo: {email}</Text>
        
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nombre"
        />
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Teléfono"
        />
        <Button title="Guardar" onPress={handleSave} />
      </View>

       
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  section: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center', // Centrar los elementos dentro de la sección
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    maxWidth: 300,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
