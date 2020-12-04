import React, { useState, useContext, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';
import Context from '../context/context.js';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 24 : 0;

function StatusBarPlaceHolder() {
  return (
    <View style={{
      width: "100%",
      height: STATUS_BAR_HEIGHT,
      backgroundColor: "#009cd8"
    }}>
      <StatusBar barStyle="light-content" backgroundColor="#009cd8"/>
    </View>
  );
}

import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Platform,
} from 'react-native';

export default function BookingStepThree(props) {
  const cartContext = useContext(Context);
  const route = useRoute();

  const [error, setError] = useState([]);
  const [city, setCity] = useState(cartContext.shootLocation.city);
  const [state, setState] = useState(cartContext.shootLocation.state);
  const [date, setDate] = useState('');

  const handleSetCity = e => setCity(e);
  const handleSetState = e => setState(e);
  const handleSetDate = e => setDate(e);

  // Handle Location Submit
  const handleSubmit = _ => {
    let err = [...error];
    // City
    if (!city) {
      if (!err.includes(1)) {
        err.push(1);
        setError(err);
      }
    } else {
      if (err.includes(1)) {
        let i = err.indexOf(1);
        err.splice(i, 1);
        setError(err);
      }
    }

    // state
    if (!state) {
      if (!err.includes(2)) {
        err.push(2);
        setError(err);
      }
    } else {
      if (err.includes(2)) {
        let i = err.indexOf(2);
        err.splice(i, 1);
        setError(err);
      }
    }

    // date
    if (!date) {
      if (!err.includes(3)) {
        err.push(3);
        setError(err);
      }
    } else {
      if (err.includes(3)) {
        let i = err.indexOf(3);
        err.splice(i, 1);
        setError(err);
      }
    }

    let nav = props.navigation;
    const location = { city: city, state: state }

    if (err.length === 0 && location && date) {
      cartContext.handleShootLocation(location);
      cartContext.handleShootDate(date);
      if (cartContext.shootLocationToggle) nav.navigate('MerchOrderOverview');
      else nav.navigate('Cart');
    }
  }

  return (
    <>
      <StatusBarPlaceHolder />
      <View style={styles.container}>
        <LinearGradient colors={['#009cd8', '#008CC1', '#0080B1']} style={styles.gradient} >
          <View style={styles.content}>
            { Platform.OS === 'ios' ? (
              <View style={styles.btn_view}>
                <TouchableOpacity onPressIn={ _ => props.navigation.goBack()}>
                  <View style={styles.back_btn}>
                    <Text style={styles.back_btn_text}>Back</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : null }
            <View style={styles.text_box}>
              <Text style={styles.text_title}>Step Three</Text>
              <Text style={styles.text_content}>Choose your shoot location and date</Text>
            </View>
            <View style={styles.address_box}>
              { error.includes(1) ? (
                <View style={styles.error_box}>
                  <Text style={styles.error_text}>Please Enter a Valid City</Text>
                </View>
              ): null }
              { error.includes(2) ? (
                <View style={styles.error_box}>
                  <Text style={styles.error_text}>Please Enter a Valid State</Text>
                </View>
              ): null }
              { error.includes(3) ? (
                <View style={styles.error_box}>
                  <Text style={styles.error_text}>Please Enter a Valid Date</Text>
                </View>
              ): null }
              <TextInput 
                style={[styles.input, error.includes(1) ? styles.input_err : null ]}
                placeholder={'City'}
                placeholderTextColor='#fff'
                onChangeText={e => handleSetCity(e)}
                value={city}>
              </TextInput>
              <TextInput 
                style={[styles.input, error.includes(2) ? styles.input_err : null ]}
                placeholder={'State'}
                placeholderTextColor='#fff'
                onChangeText={e => handleSetState(e)}
                value={state}>
              </TextInput>
              <TextInput 
                style={[styles.input, error.includes(3) ? styles.input_err : null ]}
                placeholder={'Date: MM-DD-YY'}
                placeholderTextColor='#fff'
                onChangeText={e => handleSetDate(e)}
                value={date}>
              </TextInput>
            </View>
            <TouchableOpacity style={styles.continue_btn} onPress={ _ => handleSubmit() }>
              <Text style={styles.continue_btn_text}>Continue</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </>
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
      // justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },

      btn_view: {
        alignSelf: 'flex-start',
      },

      back_btn: {
        // position: 'absolute',
        // borderWidth: 1,
        // alignSelf: 'flex-start',
        marginTop: 15,
        marginLeft: 15,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20,
        backgroundColor: '#0078A4',
        // elevation: 5,
        // zIndex: 10,
        // elevation: ,
      },

        back_btn_text: {
          fontWeight: 'bold',
          // opacity: 0.65,
          color: '#fff',
        },

      text_box: {
        width: Dimensions.get('screen').width - 60,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        // marginTop: Dimensions.get('screen').height / 2 - 220,
        marginTop: 40,
      },

        text_title: {
          color: '#fefefe',
          fontWeight: 'bold',
          fontSize: 26,
        },

        text_content: {
          color: '#efefef',
          fontSize: 14,
          lineHeight: 19,
          width: '80%',
        },

    address_box: {
      width: Dimensions.get('screen').width - 60,
      flexWrap: 'wrap',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginTop: 10,
    },

        error_box: {
          width: '100%',
          padding: 5,
          marginTop: 10,
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
          backgroundColor: '#0078A4',
          borderRadius: 4,
          marginTop: 10,
          width: Dimensions.get('screen').width - 60,
          color: '#fefefe',
        },

        input_err: {
          borderWidth: 1,
          borderColor: 'pink',
        },

    continue_btn: {
      padding: 14,
      marginTop: 20,
      borderRadius: 6,
      backgroundColor: '#fefefe',
      flexDirection: 'row', 
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 20,
      position: 'absolute',
      width: Dimensions.get('screen').width - 60,
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
      },

      continue_btn_text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#018bc0',
      },
});