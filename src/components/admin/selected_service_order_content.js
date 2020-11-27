import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import Context from '../../context/context.js';
import EditIMG from '../../assets/edit.png';
import { Dimensions, StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';

export default function SelectedServiceOrderContentADMIN(props) {
  const cartContext = useContext(Context);
  const route = useRoute();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_text}>Order</Text>
      </View>
      <View style={styles.order}>
        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.text}>{cartContext.selectedServiceOrder.user.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.text}>{cartContext.selectedServiceOrder.user.email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.text}>{cartContext.selectedServiceOrder.user.phone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.text}>{cartContext.selectedServiceOrder.location}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Product</Text>
          <Text style={styles.text}>{cartContext.selectedServiceOrder.service.product}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Shoot Date</Text>
          <Text style={styles.text}>{cartContext.selectedServiceOrder.date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Order Date</Text>
          <Text style={styles.text}>{cartContext.selectedServiceOrder.createdAt}</Text>
        </View>
        <View style={[styles.row, styles.row_b]}>
          <Text style={styles.label}>Stripe Transaction</Text>
          <Text style={styles.text}>{cartContext.selectedServiceOrder.payment_token}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 30,
    width: Dimensions.get('screen').width,
  },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: Dimensions.get('screen').width - 60,
      marginTop: 30,
    },

      header_text: {
        fontSize: 24,
        fontWeight: 'bold',
        opacity: 0.65,
      },

    order: {
      width: Dimensions.get('screen').width - 60,
      marginTop: 10,
      borderRadius: 6,
      backgroundColor: '#fff',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 4,
    },

      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingTop: 12,
        paddingLeft: 12,
        paddingRight: 12,
      },

      row_b: {
        paddingBottom: 12,
        flexDirection: 'column',
        justifyContent: 'flex-start',
      },

      label: {
        fontWeight: 'bold',
        opacity: 0.70,
      },

      text: {
        opacity: 0.75,
        flexWrap: 'wrap',
      },
});