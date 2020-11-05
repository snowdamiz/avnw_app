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
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#fff', '#fff', '#fff']} style={styles.gradient} >
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
                    <View style={styles.service_btns_price_box}>
                      <Text style={styles.service_btns_price_title}>Starting At:</Text>
                      <View style={styles.service_btns_price_circle}>
                        <Text style={styles.service_btns_price_text}>${el.price}</Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={ _ => handleServiceToggle(el)}
                      style={[styles.service_btns_add, cartContext.cart.includes(el) ? styles.service_btns_add_on : null]}>
                      <Text style={[
                        styles.service_btns_add_text,
                        cartContext.cart.includes(el) ? styles.service_btns_add_text_on : null]}>
                        { cartContext.cart.includes(el) ? 'In Cart' : 'Add to Cart'}
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

      text_box: {
        marginTop: 40,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      },

        text_title: {
          color: '#000',
          fontWeight: 'bold',
          fontSize: 28,
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
        width: Dimensions.get('screen').width - 26,
        borderRadius: 8,
        backgroundColor: '#fefefe',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
      },

        service: { 
          width: Dimensions.get('screen').width - 46,
          padding: 15,
          borderRadius: 6,
          backgroundColor: '#efefef',
          borderWidth: 1,
          borderColor: '#ebebeb',
          marginBottom: 15,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          // shadowColor: '#000',
          // shadowOffset: { width: 0, height: 0 },
          // shadowOpacity: 1,
          // shadowRadius: 8,
          // elevation: 4,
        },

          service_info: {
            width: '100%',
          },

            service_info_title: {
              fontSize: 15,
              fontWeight: 'bold',
              color: '#000',
              opacity: 0.6,
            },

            service_info_desc: {
              paddingTop: 5,
              color: '#000',
              opacity: 0.5,
            },

          service_btns: {
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 15,
          },

            service_btns_price_box: {
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '60%',
              height: 48,
              backgroundColor: '#fff',
              borderRadius: 6,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.6,
              shadowRadius: 6,
              elevation: 3,
            },

              service_btns_price_title: {
                color: '#000',
                fontSize: 14,
                fontWeight: 'bold',
                marginRight: 5,
                opacity: 0.55,
              },

              service_btns_price_circle: {
                width: 32,
                height: 32,
                borderRadius: 20,
                backgroundColor: '#018bc0',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 5,
              },

                service_btns_price_text: {
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 'bold',
                },

        service_btns_add: {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          height: 48,
          borderRadius: 6,
          width: Dimensions.get('screen').width / 2 * 0.55,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.6,
          shadowRadius: 6,
          elevation: 3,
        },

        service_btns_add_on: {
          backgroundColor: '#009cd8',
        },

          service_btns_add_text: {
            fontSize: 12,
            fontWeight: 'bold',
            color: '#000',
            opacity: 0.6,
          },

          service_btns_add_text_on: {
            color: '#fff',
            opacity: 1,
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
    width: Dimensions.get('screen').width - 40,
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