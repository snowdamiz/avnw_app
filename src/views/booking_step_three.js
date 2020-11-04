import React, { useState, useContext, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';

import Context from '../context/context.js';

import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';

export default function BookingStepThree(props) {
  const cartContext = useContext(Context);
  const route = useRoute();

  const [error, setError] = useState(false);
  const [address, setAddress] = useState(cartContext.user.address);
  const [unit, setUnit] = useState(cartContext.user.unit);
  const [city, setCity] = useState(cartContext.user.city);
  const [state, setState] = useState(cartContext.user.state);
  const [zipCode, setZipCode] = useState(cartContext.user.zip);

  const handleSubmit = _ => {
    let nav = props.navigation;
    const location = {
      address: address,
      unit: unit,
      city: city,
      state: state,
      zip: zipCode,
    }

    if (location.city && location.state) {
      setError(false);  
      cartContext.handleShootLocation(location);

      if (cartContext.shootLocationToggle) nav.navigate('MerchOrderOverview');
      else nav.navigate('Cart');
      
    } else setError(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#009cd8', '#018bc0', '#018bc0']} style={styles.gradient} >
        <View style={styles.content}>
          <View style={styles.text_box}>
            <Text style={styles.text_title}>Step Three</Text>
            <Text style={styles.text_content}>Choose your shoot location</Text>
          </View>
          <View style={styles.address_box}>
            { error ? (
              <View style={styles.error_box}>
                <Text style={styles.error_text}>Only City and State are required</Text>
              </View>
            ): null}
            <TextInput 
              style={[styles.input, styles.address_input]}
              placeholder={'Address'}
              placeholderTextColor='#fff'
              onChangeText={e => setAddress(e)}
              value={address}>
            </TextInput>
            <TextInput 
              style={[styles.input, styles.unit_input]}
              placeholder={'Unit'}
              placeholderTextColor='#fff'
              onChangeText={e => setUnit(e)}
              value={unit}>
            </TextInput>
            <TextInput 
              style={[styles.input, error ? styles.city_input_err : styles.city_input]}
              placeholder={'City'}
              placeholderTextColor='#fff'
              onChangeText={e => setCity(e)}
              value={city}>
            </TextInput>
            <TextInput 
              style={[styles.input, error ? styles.state_input_err : styles.state_input]}
              placeholder={'State'}
              placeholderTextColor='#fff'
              onChangeText={e => setState(e)}
              value={state}>
            </TextInput>
            <TextInput 
              style={[styles.input, styles.zip_input]}
              placeholder={'Zip'}
              placeholderTextColor='#fff'
              onChangeText={e => setZipCode(e)}
              value={zipCode ? zipCode.toString() : zipCode}
              keyboardType={'numeric'}>
            </TextInput>
          </View>
          <TouchableOpacity style={styles.continue_btn} onPress={ _ => handleSubmit() }>
            <Text style={styles.continue_btn_text}>Continue</Text>
            <View style={styles.continue_btn_arrow}></View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

    content: {
      width: Dimensions.get('screen').width,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },

      text_box: {
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      },

        text_title: {
          color: '#fefefe',
          fontWeight: 'bold',
          fontSize: 28,
        },

        text_content: {
          color: '#fefefe',
          fontSize: 17,
        },

      address_box: {
        width: Dimensions.get('screen').width - 60,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
      },

        error_box: {
          width: '100%',
          padding: 5,
          marginBottom: 10,
          borderRadius: 4,
          backgroundColor: 'pink',
        },

          error_text: {
            fontSize: 13,
            color: '#000',
          },

        input: {
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 15,
          paddingRight: 15,
          backgroundColor: '#0079a8',
          borderRadius: 6,
          marginTop: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 2,
          elevation: 6,
          color: '#fefefe',
        },

        address_input: { width: Dimensions.get('screen').width - 170 },
        unit_input: { width: 100 },
        city_input: { width: Dimensions.get('screen').width - 240 },
        state_input: { width: 60 },
        zip_input: { width: 100 },

        city_input_err: {
          borderWidth: 1,
          borderColor: 'pink',
          width: Dimensions.get('screen').width - 240
        },

        state_input_err: {
          borderWidth: 1,
          borderColor: 'pink',
          width: 60
        },

    continue_btn: {
      marginTop: 25,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

      continue_btn_arrow: {
        width: 0,
        height: 0,
        borderTopWidth: 6,
        borderBottomWidth: 6,
        borderLeftWidth: 10,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: '#fefefe',
        marginLeft: 10,
        marginTop: 5,
      },

      continue_btn_text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
      },
});