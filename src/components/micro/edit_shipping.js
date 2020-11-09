import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Context from '../../context/context.js';

import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function EditShipping(props) {
  const [address, setAddress] = useState();
  const [unit, setUnit] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();
  const [err, setErr] = useState();
  const cartContext = useContext(Context);

  useEffect( _ => {
    handleNullFields();
  },[])
  
  // Handle Null Fields
  const handleNullFields = _ => {
    const curAddress = cartContext.user.address;
    const curUnit = cartContext.user.unit;
    const curCity = cartContext.user.city;
    const curState = cartContext.user.state;
    const curZip = cartContext.user.zip;

    if (curAddress) setAddress(curAddress)
    else setAddress('');

    if (curUnit) setUnit(curUnit)
    else setUnit('');

    if (curCity) setCity(curCity)
    else setCity('');

    if (curState) setState(curState)
    else setState('');

    if (curZip) setZip(curZip.toString())
    else setZip('');
  }

  const handleSetAddress = e => setAddress(e);
  const handleSetUnit = e => setUnit(e);
  const handleSetCity = e => setCity(e);
  const handleSetState = e => setState(e);
  const handleSetZip = e => setZip(e);
  const handleCancel = _ => cartContext.handleEditShippingToggle();

  const handleConfirm = async _ => {
    let location = {
      address: address,
      unit: unit,
      city: city,
      state: state,
      zip: zip,
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const config = { headers: { Authorization: token }};
      const id = cartContext.user.id;

      await axios.put(`https://avnw-api.herokuapp.com/user/${id}`, location, config)
      .then(res => {
        console.log(res.data[0])
        cartContext.setUser(res.data[0]);
        cartContext.handleEditShippingToggle();
      })
      .catch(err => console.log(err))
    } catch (err) { console.log(err) } 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Edit Shipping Location
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={e => handleSetAddress(e)}
        value={address}
        placeholderTextColor="#000"
        placeholder="Address" />
      <TextInput
        style={styles.input}
        onChangeText={e => handleSetUnit(e)}
        value={unit}
        placeholderTextColor="#000"
        placeholder="Unit" />
      <TextInput
        style={styles.input}
        onChangeText={e => handleSetCity(e)}
        value={city}
        placeholderTextColor="#000"
        placeholder="City" />
      <TextInput
        style={styles.input}
        onChangeText={e => handleSetState(e)}
        value={state}
        placeholderTextColor="#000"
        placeholder="State" />
      <TextInput
        style={styles.input}
        onChangeText={e => handleSetZip(e)}
        value={zip}
        placeholderTextColor="#000"
        placeholder="Zip" />
      <View style={styles.btns_box}>
        <TouchableOpacity
          onPress={ _ => handleCancel()}
          style={[styles.btn, styles.btn_cancel]}>
          <Text style={[styles.btn_text, styles.btn_text_cancel]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={ _ => handleConfirm()}
          style={[styles.btn, styles.btn_confirm]}>
          <Text style={[styles.btn_text, styles.btn_text_confirm]}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: Dimensions.get('screen').width - 60,
    padding: 15,
    // borderWidth: 1,
    position: 'absolute',
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 20,
    marginTop: 100,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },

    heading: {
      fontWeight: 'bold',
      fontSize: 16,
      opacity: 0.7,
    },

      input: {
        width: '100%',
        backgroundColor: '#D5E8F0',
        marginTop: 10,
        // borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 10,
        paddingTop: 8,
        paddingBottom: 8,
      },

      btns_box: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
        // borderWidth: 1,
      },
      
        btn_cancel: {
          width: Dimensions.get('screen').width / 2 - 50,
          // borderWidth: 1,
          borderColor: 'gray',
          backgroundColor: '#fff',
          borderRadius: 4,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.7,
          shadowRadius: 10,
          elevation: 5,
        },

        btn_confirm: {
          width: Dimensions.get('screen').width / 2 - 50,
          borderWidth: 1,
          borderColor: '#018bc0',
          borderRadius: 4,
          backgroundColor: '#018bc0',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.7,
          shadowRadius: 10,
          elevation: 5,
        },

          btn_text: {
            textAlign: 'center',
            padding: 10,
          },
          
          btn_text_cancel: {
            opacity: 0.8,
          },

          btn_text_confirm: {
            color: '#fff',
          },
});