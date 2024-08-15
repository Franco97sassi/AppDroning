import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Usando FontAwesome para Facebook

const FacebookButton = ({ tomycount }) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        style={styles.buttonStyleFacebook}
        onPress={() => navigation.navigate('Login')}
      >
        <Icon name="facebook" size={24} color="white" style={styles.icon} />
        <Text style={styles.textButtonFacebook}>
        Iniciar Sesión con Facebook {tomycount}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FacebookButton;

const styles = StyleSheet.create({
  buttonStyleFacebook: {
    borderRadius: 20,
    backgroundColor: "#3b5998", // Color de fondo de Facebook
    width: 335,
    height: 51,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  textButtonFacebook: {
    color: "white",
    marginLeft: 10,
    // fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
});
