import React from "react";
import { Feather } from '@expo/vector-icons';
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as mailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';

const Incident = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const incident = route.params.incident;
  const incidentValue = Intl.NumberFormat("pt-PT", { 
    style: "currency", 
    currency: "EUR" 
  })
  .format(incident.value);
  const message = 
    `Hi ${incident.name}, I would like to enter in touch because 
    I want to help in the case '${incident.title}' with a value of ${incidentValue}`

  const navigateBack = () => {
    navigation.goBack();
  }

  const sendMail = () => {
    mailComposer.composeAsync({
      subject: `Case heroe: ${incident.title}`,
      recipients: [incident.email],
      body: message
    })
  }

  const sendWhatsApp = () => {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&t=${message}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={32} color="#e02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentValue}>
          {incident.name} de {incident.city}, {incident.district}
        </Text>
        
        <Text style={styles.incidentProperty}>CASE:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>
        
        <Text style={styles.incidentProperty}>PRICE:</Text>
        <Text style={styles.incidentValue}>{incidentValue}</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Save the day!</Text>
        <Text style={styles.heroTitle}>Be the hero of this case.</Text>

        <Text style={styles.heroDescription}>Get in touch:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Incident;