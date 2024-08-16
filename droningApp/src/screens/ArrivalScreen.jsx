import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const ArrivalScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>¡Disfrute su orden!</Text>
      <Button
        title="Volver a Inicio"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ArrivalScreen;
