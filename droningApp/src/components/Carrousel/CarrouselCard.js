import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import React from 'react';

const CarrouselCard = ({ item }) => {
  const { width } = useWindowDimensions(); // Llamada correcta a la función
  return (
    <View style={[styles.container, { width }]}>
        <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
       </View>
      <Image source={item.image} style={[styles.image, { width, resizeMode: "contain" }]} />
       
    </View>
  );
}

export default CarrouselCard;

const styles = StyleSheet.create({
  container:{
     
    },
  image: {
    flex: 1,
    justifyContent: "center",alignItems:"center"
  },
  title: {
    fontSize: 24, // Tamaño de fuente actualizado a 24
    fontWeight: 'bold', // Texto en negrita
    marginBottom: 10,
    color: "#493d8a",
    textAlign: "center",
    paddingHorizontal:48,
    color:"#1C1C1C"
  },
  id: {
    color: "#62656b",
    textAlign: "center",
    paddingHorizontal: 64,
  },
   
});
