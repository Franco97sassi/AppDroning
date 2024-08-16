import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const ResetPasswordButton = ({ text, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
        <Text style={styles.textButton}>
          {text || 'Recuperar Contraseña'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPasswordButton;

const styles = StyleSheet.create({
  container: {},
  buttonStyle: {
    borderRadius: 20,
    backgroundColor: "#4682B4",
    width: 335,
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: "white"
  },
});
