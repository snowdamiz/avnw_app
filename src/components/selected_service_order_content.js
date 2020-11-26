import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import Context from '../context/context.js';

import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function SelectedServiceOrderContent(props) {
  const cartContext = useContext(Context);
  const route = useRoute();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header_text}>Order</Text>
      <View style={styles.order}>
        <View style={styles.row}>
          <Text style={styles.label}>Product</Text>
          <Text style={styles.text}>{cartContext.selectedServiceOrder.service.product}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Booking Cost</Text>
          <Text style={styles.text}>{cartContext.selectedServiceOrder.service.price}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.text}>{cartContext.selectedServiceOrder.location}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.text}>{cartContext.selectedServiceOrder.service.description}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Order Date</Text>
          <Text style={styles.text}>{cartContext.selectedServiceOrder.service.createdAt}</Text>
        </View>
        <View style={[styles.row, styles.row_b]}>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.text}>{cartContext.selectedServiceOrder.status.toUpperCase()}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: Dimensions.get('screen').width,
    // borderWidth: 1,
  },

  header_text: {
    fontSize: 24,
    fontWeight: 'bold',
    opacity: 0.65,
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginTop: 30,
  },

  order: {
    width: Dimensions.get('screen').width - 60,
    marginTop: 5,
    borderRadius: 6,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 4,
  },

    row: {
      // flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingTop: 12,
      paddingLeft: 12,
      paddingRight: 12,
    },

    row_b: {
      paddingBottom: 12,
    },

    label: {
      fontWeight: 'bold',
      opacity: 0.70,
    },

    text: {
      opacity: 0.75,
      // width: 220,
      // paddingLeft: 20,
      flexWrap: 'wrap',
    },
});