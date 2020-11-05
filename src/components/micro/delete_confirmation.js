import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Context from '../../context/context.js';

import { StyleSheet, View, Text, Dimensions,} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AdminPanel() {
  const cartContext = useContext(Context);

  // Handle Delete Confirmation
  const handleConfirmDelete = async _ => {
    const data = { deletedAt: new Date() }

    try {
      const token = await AsyncStorage.getItem('token');
      const config = { headers: { Authorization: token }}
      let id = cartContext.photographerEdit.id;

      await axios.put(`http://192.168.51.241:5000/photographers/${id}`, data, config)
        .then(res => {
          cartContext.getPhotographers();
          cartContext.handleDeletePhotographerConfirmation();
        })
        .catch(err => console.log(err))
    } catch (err) { console.log(err) }
  }

  // Handle Delete Cancelation
  const handleCancelDelete = _ => {
    cartContext.handleDeletePhotographerConfirmation();
  }

  return (
    <View>
      <View style={styles.wrap}>
        <Text style={styles.text}>
          Are you sure you want to delete this user?
        </Text>
        <View style={styles.btns}>
          <TouchableOpacity
            style={styles.confirm_btn}
            onPress={ _ => handleConfirmDelete()}>
            <Text style={styles.confirm_btn_text}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deny_btn}
            onPress={ _ => handleCancelDelete()}>
            <Text style={styles.deny_btn_text}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  wrap: {
    width: 300,
    height: 150,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 6,
    zIndex: 1,
    top: 25,
    left: Dimensions.get('screen').width / 2 - 175,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 8,
  },

    text: {
      fontSize: 15,
      fontWeight: 'bold',
      width: '70%',
      opacity: 0.6,
      textAlign: 'center',
      marginBottom: 20,
    },

    btns: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

      confirm_btn: {
        width: Dimensions.get('screen').width / 2 - 90,
        textAlign: 'center',
        borderRadius: 4,
        marginRight: 5,
        backgroundColor: '#009cd8'
      },

      deny_btn: {
        width: Dimensions.get('screen').width / 2 - 80,
        textAlign: 'center',
        borderRadius: 4,
        marginLeft: 5,
        backgroundColor: '#005575',
      },

        confirm_btn_text: {
          textAlign: 'center',
          padding: 10,
          color: '#fff',
          fontWeight: 'bold',
        },

        deny_btn_text: {
          textAlign: 'center',
          padding: 10,
          color: '#fff',
          fontWeight: 'bold',
        },
});
