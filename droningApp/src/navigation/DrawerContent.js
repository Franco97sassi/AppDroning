import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <DrawerItem
          label="Home"
          onPress={() => props.navigation.navigate('Home')}
        />
        <DrawerItem
          label="Request"
          onPress={() => props.navigation.navigate('Request')}
        />
        <DrawerItem
          label="Confirmation"
          onPress={() => props.navigation.navigate('Confirmation')}
        />
        {/* Agrega más elementos del menú según sea necesario */}
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    padding: 16,
      backgroundColor:"black"
  },
});

export default DrawerContent;
