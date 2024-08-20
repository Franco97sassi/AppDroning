import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const NotificationsScreen = () => {
  const [isSmsEnabled, setIsSmsEnabled] = useState(false);
  const [isWhatsappEnabled, setIsWhatsappEnabled] = useState(false);
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const loadNotificationSettings = async () => {
      try {
        const smsEnabled = await AsyncStorage.getItem('isSmsEnabled');
        const whatsappEnabled = await AsyncStorage.getItem('isWhatsappEnabled');
        const emailEnabled = await AsyncStorage.getItem('isEmailEnabled');

        if (smsEnabled !== null) setIsSmsEnabled(JSON.parse(smsEnabled));
        if (whatsappEnabled !== null) setIsWhatsappEnabled(JSON.parse(whatsappEnabled));
        if (emailEnabled !== null) setIsEmailEnabled(JSON.parse(emailEnabled));
      } catch (error) {
        console.error('Error loading notification settings:', error);
      }
    };

    loadNotificationSettings();
  }, []);

  const saveNotificationSettings = async () => {
    try {
      await AsyncStorage.setItem('isSmsEnabled', JSON.stringify(isSmsEnabled));
      await AsyncStorage.setItem('isWhatsappEnabled', JSON.stringify(isWhatsappEnabled));
      await AsyncStorage.setItem('isEmailEnabled', JSON.stringify(isEmailEnabled));
    } catch (error) {
      console.error('Error saving notification settings:', error);
    }
  };

  const toggleSwitch = (type) => {
    if (type === 'sms') {
      setIsSmsEnabled(previousState => !previousState);
    } else if (type === 'whatsapp') {
      setIsWhatsappEnabled(previousState => !previousState);
    } else if (type === 'email') {
      setIsEmailEnabled(previousState => !previousState);
    }
    saveNotificationSettings(); // Guardar los ajustes cada vez que cambien
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes de Notificaciones</Text>

      <View style={styles.notificationOption}>
        <Text style={styles.optionText}>SMS</Text>
        <Switch
          value={isSmsEnabled}
          onValueChange={() => toggleSwitch('sms')}
        />
      </View>

      <View style={styles.notificationOption}>
        <Text style={styles.optionText}>WhatsApp</Text>
        <Switch
          value={isWhatsappEnabled}
          onValueChange={() => toggleSwitch('whatsapp')}
        />
      </View>

      <View style={styles.notificationOption}>
        <Text style={styles.optionText}>Email</Text>
        <Switch
          value={isEmailEnabled}
          onValueChange={() => toggleSwitch('email')}
        />
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  notificationOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  optionText: {
    fontSize: 18,
  },
  backButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NotificationsScreen;
