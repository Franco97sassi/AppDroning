import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('Franco Sassi');
  const [phone, setPhone] = useState('+54 9 11 1234-5678');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        if (storedEmail) {
          setEmail(storedEmail);
        }
      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      // Aquí podrías actualizar la información del usuario en un backend
      console.log('Información guardada:', { name, phone });

      // Puedes también guardar la información en AsyncStorage si es necesario
      // await AsyncStorage.setItem('userName', name);
      // await AsyncStorage.setItem('userPhone', phone);
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

      
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
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
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 30,
    alignItems: 'center',
  },
});

export default ProfileScreen;
