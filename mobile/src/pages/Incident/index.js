import React, { useEffect, useState } from "react";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';

import logoImg from '../../assets/logo.png';
import api from '../../services/api';
import styles from './styles';

const Incident = () => {
  const [incidents, setIncidents] = useState([]);
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const loadIncidents = async () => {
    if (isLoading) {
      return;
    }

    if (totalIncidents > 0 && incidents.length === totalIncidents) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.get("incidents", {
        params: {
          page: pageNumber
        }
      });

      setIncidents([
        ...incidents,
        ...response.data
      ]);
      setTotalIncidents(response.headers["x-total-count"]);
      setPageNumber(pageNumber + 1);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      alert("Something went wrong while fetching incidents");
    }
  }
  
  useEffect(() => {
    loadIncidents();
  }, []);

  const navigationToDetail = (incident) => {
    console.log(incident);
    navigation.navigate("Detail", {
      incident
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total of <Text style={styles.headerTextBold}>{totalIncidents} cases</Text>.
        </Text>
      </View>  
      
      <Text style={styles.title}>
        Welcome!
      </Text>
      
      <Text style={styles.description}>
        Choose one of the cases below and save the day.
      </Text>
      
      <View style={styles.incidentList}>
        <FlatList
          showsVerticalScrollIndicator={false}
          onEndReached={loadIncidents}
          onEndReachedThreshold={0.2}
          keyExtractor={incident => String(incident.id)}
          data={incidents}
          renderItem={({ item }) => (
            <View style={styles.incident}>
              <Text style={styles.incidentProperty}>ONG:</Text>
              <Text style={styles.incidentValue}>{item.name}</Text>
              
              <Text style={styles.incidentProperty}>CASE:</Text>
              <Text style={styles.incidentValue}>{item.title}</Text>
              
              <Text style={styles.incidentProperty}>PRICE:</Text>
              <Text style={styles.incidentValue}>
                {Intl.NumberFormat("pt-PT", { 
                    style: "currency", 
                    currency: "EUR" 
                  })
                  .format(item.value)}
              </Text>

              <TouchableOpacity 
                style={styles.detailsButton} 
                onPress={() => navigationToDetail(item)}
              > 
                <Text style={styles.detailsButtonText}>
                  Check more details
                </Text>
                <Feather name="arrow-right" size={16} color="#e02041" />
              </TouchableOpacity>
            </View>
          )}
        />  
      </View>
      
    </View>
  );
};

export default Incident;