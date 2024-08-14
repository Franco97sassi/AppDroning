import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // Importa el paquete de íconos de Expo
import Constants from "expo-constants";

const HeaderLogged = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="arrow-back" size={30} color="#000" style={styles.icon} />
      <Text style={styles.headerText}>Solicitud</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //  backgroundColor: 'red',
     flexDirection: 'row', // Para alinear el ícono y el texto en una fila
     alignItems: 'center',  
 // paddingBottom: Constants.statusBarHeight,
height:"14%"
   },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8, // Espacio entre el ícono y el texto
  },
  icon: {
    // Puedes agregar estilos adicionales aquí si es necesario
  },
});

export default HeaderLogged;
