// src/components/DrawerHeader.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DrawerHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Franco</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold', 
  },
});

export default DrawerHeader;
