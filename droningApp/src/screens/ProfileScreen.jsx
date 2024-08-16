import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('Juan Pérez');
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Información Personal */}
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

      {/* Opciones de Pago */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Opciones de Pago</Text>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Ver Métodos de Pago Guardados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Agregar Método de Pago</Text>
        </TouchableOpacity>
      </View>

      {/* Historial de Servicios */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Historial de Servicios</Text>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Ver Historial</Text>
        </TouchableOpacity>
      </View>

      {/* Ajustes de Notificaciones */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ajustes de Notificaciones</Text>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Gestionar Notificaciones</Text>
        </TouchableOpacity>
      </View>

      {/* Botón de Cerrar Sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
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
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
