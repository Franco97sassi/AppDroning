import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Información Personal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información Personal</Text>
        <Text style={styles.infoText}>Nombre: Juan Pérez</Text>
        <Text style={styles.infoText}>Correo: juan.perez@example.com</Text>
        <Text style={styles.infoText}>Teléfono: +54 9 11 1234-5678</Text>
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  optionButton: {
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#007bff',
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
