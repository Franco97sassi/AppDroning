import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // O cualquier otra fuente de íconos que prefieras

const GoogleButton = ({ tomycount }) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        style={styles.buttonStyleGoogle}
        onPress={() => navigation.navigate('Login')}
      >
        <Image style={styles.logo} source={require('../../assets/images/googleIcon.png')}/>
        {/* <Icon name="google" size={24} color="black" style={styles.icon} /> */}
        <Text style={styles.textButtonGoogle}>
        Iniciar Sesión con Google {tomycount}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleButton;

const styles = StyleSheet.create({
  buttonStyleGoogle: {
    borderRadius: 20,
    backgroundColor: "white",
    width: 335,
    height: 51,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  textButtonGoogle: {
    color: "black",
    marginLeft: 10,
    // fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
  logo:{
    width:30,
    height:30
  }
});
