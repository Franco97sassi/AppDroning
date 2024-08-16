import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NotificationsScreen = () => {
  const [isSmsEnabled, setIsSmsEnabled] = useState(false);
  const [isWhatsappEnabled, setIsWhatsappEnabled] = useState(false);
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);

  const navigation = useNavigation();

  const toggleSwitch = (type) => {
    if (type === 'sms') {
      setIsSmsEnabled(previousState => !previousState);
    } else if (type === 'whatsapp') {
      setIsWhatsappEnabled(previousState => !previousState);
    } else if (type === 'email') {
      setIsEmailEnabled(previousState => !previousState);
    }
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
