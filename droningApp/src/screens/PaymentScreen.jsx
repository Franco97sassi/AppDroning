import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export default function PaymentScreen() {
  const openPaymentPage = async () => {
    try {
      await WebBrowser.openBrowserAsync('YOUR-URL-PREFERENCE');
    } catch (error) {
      console.error('Error opening browser:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Open Payment Page" onPress={openPaymentPage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
