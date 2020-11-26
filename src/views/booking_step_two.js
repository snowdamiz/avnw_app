import React, { useContext, useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';

import Context from '../context/context.js';

import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';

export default function BookingStepTwo(props) {
  const route = useRoute();
  const cartContext = useContext(Context);

  useEffect( _ => {
    cartContext.setPreviousRoute('BookingStepThree');
  }, [])

  const handleServiceToggle = el => cartContext.handleCart(el);

  const handleNavigation = _ => {
    let nav = props.navigation;
    let cart = cartContext.cart;
    let res = [];

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].type.includes( 'service' )) {
        res.push(cart[i]);
      }
    }

    if (res.length > 0) {
      cartContext.handleServiceError(false);
      if (cartContext.token) {
        nav.navigate('BookingStepThree')
      } else {
        nav.navigate('Login')
      }
    } else cartContext.handleServiceError(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <LinearGradient colors={['#fff', '#fff', '#fff']} style={styles.gradient} >
        { Platform.OS === 'ios' ? (
          <View style={styles.btn_view}>
            <TouchableOpacity onPressIn={ _ => props.navigation.goBack()}>
              <View style={styles.back_btn}>
                <Text style={styles.back_btn_text}>Back</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null }
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.text_box}>
            <Text style={styles.text_title}>Step Two</Text>
            <Text style={styles.text_content}>Choose your photoshoot</Text>
          </View>
          { cartContext.serviceError ? (
            <View style={styles.err_box}>
              <Text style={styles.err_text}>Please select a service</Text>
            </View>
          ) : null }
          <View style={styles.services_box}>
            { cartContext.services.map((el) => {
              return (
                <View key={el.id} style={styles.service}>
                  <View style={styles.service_info}>
                    <Text style={styles.service_info_title}>{el.product}</Text>
                    <Text style={styles.service_info_desc}>{el.description}</Text>
                  </View>
                  <View style={styles.service_btns}>
                    <TouchableOpacity
                      onPress={ _ => handleServiceToggle(el)}
                      style={[styles.service_btns_add, cartContext.cart.includes(el) ? styles.service_btns_add_on : null]}>
                      <View style={styles.service_btns_price_circle}>
                        <Text style={styles.service_btns_price_text}>${el.price}</Text>
                      </View>
                      <Text style={[
                        styles.service_btns_add_text,
                        cartContext.cart.includes(el) ? styles.service_btns_add_text_on : null]}>
                        { cartContext.cart.includes(el) ? 'In Cart' : 'Select'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            })}
          </View>
          <TouchableOpacity style={styles.continue_btn} onPress={ _ => handleNavigation() }>
            <Text style={styles.continue_btn_text}>Continue</Text>
            <View style={styles.continue_btn_arrow}></View>
          </TouchableOpacity>
        </ScrollView>
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
  },

    content: {
      width: Dimensions.get('screen').width,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
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
        marginTop: 40,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      },

        text_title: {
          color: '#000',
          fontWeight: 'bold',
          fontSize: 26,
          opacity: 0.6,
        },

        text_content: {
          color: '#000',
          fontSize: 17,
          opacity: 0.6,
        },

      services_box: {
        // marginTop: 30,
        marginBottom: 10,
        padding: 5,
        width: Dimensions.get('screen').width,
        borderRadius: 8,
        backgroundColor: '#fefefe',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
      },

        service: { 
          width: Dimensions.get('screen').width - 26,
          padding: 12,
          borderRadius: 6,
          backgroundColor: '#f1f1f1',
          // borderWidth: 1,
          borderColor: 'lightgray',
          marginBottom: 12,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.4,
          shadowRadius: 10,
          elevation: 4,
        },

          service_info: {
            // width: '80%',
            width: Dimensions.get('screen').width - 190,
            // borderWidth: 1,
          },

            service_info_title: {
              fontSize: 15,
              fontWeight: 'bold',
              color: '#000',
              opacity: 0.6,
              // width: '100%',
              // borderWidth: 1,
            },

            service_info_desc: {
              paddingTop: 5,
              color: '#000',
              opacity: 0.5,
            },

          service_btns: {
            // width: '100%',
            // justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
            // marginTop: 15,
          },

          service_btns_add: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#efefef',
            height: 48,
            borderRadius: 6,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 8,
            paddingBottom: 8,
            // width: Dimensions.get('screen').width / 2 * 0.55,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 10,
            elevation: 1,
          },
  
          service_btns_add_on: {
            backgroundColor: '#009cd8',
          },
  
            service_btns_add_text: {
              fontSize: 13,
              fontWeight: 'bold',
              color: '#000',
              opacity: 0.6,
            },
  
            service_btns_add_text_on: {
              color: '#fff',
              opacity: 1,
            },

            service_btns_price_circle: {
              width: 32,
              height: 32,
              borderRadius: 20,
              backgroundColor: '#018bc0',
              justifyContent: 'center',
              alignItems: 'center',
              // marginLeft: 5,
              marginRight: 10,
            },

              service_btns_price_text: {
                color: '#fff',
                fontSize: 11,
                fontWeight: 'bold',
              },

    continue_btn: {
      marginTop: 15,
      marginBottom: 20,
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
        borderLeftColor: '#000',
        marginLeft: 10,
        marginTop: 5,
        opacity: 0.65,
      },

      continue_btn_text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        opacity: 0.65,
      },

  err_box: {
    width: Dimensions.get('screen').width - 26,
    padding: 10,
    backgroundColor: 'pink',
    borderRadius: 6,
    marginTop: 30,
  },

    err_text: {
      color: '#000',
      opacity: 0.5,
      fontSize: 13,
    }
});