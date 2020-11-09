import React, { useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';
import Context from '../context/context.js';
import { Dimensions, StyleSheet, SafeAreaView, StatusBar, View, TouchableOpacity, TextInput, Text } from 'react-native';

export default function OrderingStepOne(props) {
  const cartContext = useContext(Context);
  const route = useRoute();

  const [error, setError] = useState(0);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();

  useEffect( _ => {
    handleNullFields();
  }, [])

  // Handle Null Fields
  const handleNullFields = _ => {
    const curName = cartContext.user.name;
    const curPhone = cartContext.user.phone;

    if (curName) setName(curName)
    else setName('');

    if (curPhone) setPhone(curPhone)
    else setPhone('');
  }

  // Text input set onChange
  const handleSetName = e => setName(e);
  const handleSetPhone = e => setPhone(e);  

  // Submit Information
  const handleSubmit = async _ => {
    let nav = props.navigation;
    const user = {
      name: name,
      phone: phone,
    }

    let nameRegex = /^[a-zA-Z\s]*$/;  
    let phoneRegex = /^\d+$/;

    if (user.name && nameRegex.test(user.name)) { // Check Name
      if (phoneRegex.test(user.phone) && phone.length === 10) { // Check Phone
        setError(0);  
        try {
          const token = await AsyncStorage.getItem('token');
          const config = { headers: { Authorization: token }};
          const id = cartContext.user.id;
  
          await axios.put(`https://avnw-api.herokuapp.com/user/${id}`, user, config)
          .then(res => {
            cartContext.setUser(res.data[0]);
            nav.navigate('OrderingStepTwo')
          })
          .catch(err => console.log(err))
        } catch (err) { console.log(err) }
      } else setError(2);
    } else setError(1);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#009cd8" />
      <LinearGradient colors={['#009cd8', '#018bc0', '#018bc0']} style={styles.gradient} >
        <View style={styles.content}>
          <View style={styles.text_box}>
            <Text style={styles.text_title}>Step One</Text>
            <Text style={styles.text_content}>What is your name?</Text>
          </View>
          <View style={styles.address_box}>
            { error ? (
              <View style={styles.error_box}>
                <Text style={styles.error_text}>
                  { error === 1 ? 'Please Enter Your Name' : 'Enter a valid number'}S
                </Text>
              </View>
            ): null}
            <TextInput 
              style={[styles.input, error === 1 ? styles.input_err : null ]}
              placeholder={'Name'}
              placeholderTextColor='#fff'
              onChangeText={e => handleSetName(e)}
              value={name}>
            </TextInput>
            <TextInput 
              style={[styles.input, error === 2 ? styles.input_err : null]}
              placeholder={'Phone'}
              placeholderTextColor='#fff'
              onChangeText={e => handleSetPhone(e)}
              value={phone}>
            </TextInput>
          </View>
          <TouchableOpacity style={styles.continue_btn} onPress={ _ => handleSubmit() }>
            <Text style={styles.continue_btn_text}>Continue</Text>
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
        width: Dimensions.get('screen').width - 60,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        marginTop: -100,
      },

        text_title: {
          color: '#fefefe',
          fontWeight: 'bold',
          fontSize: 28,
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
      marginTop: 20,
    },

        error_box: {
          width: '100%',
          padding: 5,
          // marginBottom: 5,
          borderRadius: 4,
          backgroundColor: 'pink',
        },

          error_text: {
            fontSize: 13,
            color: '#000',
          },

        input: {
          alignSelf: 'center',
          width: Dimensions.get('screen').width - 60,
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 15,
          paddingRight: 15,
          backgroundColor: '#0079a8',
          borderRadius: 4,
          marginTop: 10,
          // shadowColor: "#000",
          // shadowOffset: { width: 0, height: 2 },
          // shadowOpacity: 1,
          // shadowRadius: 2,
          // elevation: 6,
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
      // borderWidth: 1,
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
        // marginLeft: 10,
        // marginTop: 5,
      },

      continue_btn_text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#018bc0',
        // opacity: 0.7,
      },
});