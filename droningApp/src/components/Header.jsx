import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Constants from "expo-constants";

const Header = ({ underline, text ,navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSpace}></View>
     
      <View style={styles.logoContainer}>
        <Image 
          source={require("../../assets/images/logo.png")}
          style={styles.logo} 
        />  
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.rightButton}>
        <Text style={[styles.skip, underline && styles.underline]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
    height: "12%",
  },
  leftSpace: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 70,
    height: 50,
    resizeMode: "contain",
  },
  rightButton: {
    flex: 1,
    alignItems: "flex-end",
    // marginRight: 20,  
  },
  skip: {
    color: "#4682B4",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  underline: {
    textDecorationLine: "underline",
  },
});
