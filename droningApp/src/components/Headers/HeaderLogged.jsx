// components/Headers/HeaderLogged.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importa el paquete de íconos de Expo
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import Constants from "expo-constants";

const HeaderLogged = () => {
  const navigation = useNavigation(); // Usa el hook useNavigation

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#000" style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Solicitud</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Para alinear el ícono y el texto en una fila
    alignItems: 'center',
    height: "14%",
     paddingTop: Constants.statusBarHeight 
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
