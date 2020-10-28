import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import BG from '../assets/bg3.png';
import Logo_large from '../assets/logo_large.png';

import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';

export default function Index(props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#009cd8', '#018bc0', '#018bc0']} style={styles.gradient} >
        <View style={styles.content}>
          <Image source={Logo_large} style={styles.logo} />
          <View style={styles.buttons_container}>
            <TouchableOpacity style={styles.shoot_btn} onPress={ _ => props.navigation.navigate('BookingStepOne')}>
              <Text style={styles.shoot_btn_text}>Book a Photo Shoot</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.merch_btn} onPress={ _ => props.navigation.navigate('Store')}>
              <Text style={styles.merch_btn_text}>Merch Store</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Image source={BG} style={styles.bg} />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },

    content: {
      width: Dimensions.get('screen').width,
      height: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

      logo: {
        width: 220,
        height: 220,
        marginTop: 80,
      },

      buttons_container: {
        marginBottom: 40,
        justifyContent: 'space-between',
        zIndex: 1,
      },

        shoot_btn: {
          width: Dimensions.get('screen').width - 80,
          padding: 14,
          borderWidth: 2,
          borderColor: '#fff',
          backgroundColor: '#fff',
          borderRadius: 12,
        },

        shoot_btn_text: {
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#5e5e5e',
          fontSize: 16,
        },

        merch_btn: {
          width: Dimensions.get('screen').width - 80,
          padding: 14,
          marginTop: 18,
          borderWidth: 2,
          borderColor: '#00597b',
          backgroundColor: '#005d80',
          borderRadius: 12,
        },

        merch_btn_text: {
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#fff',
          fontSize: 16,
        },

    bg: {
      width: Dimensions.get('screen').width,
      height: 500,
      position: 'absolute',
      bottom: -80,
      opacity: 0.2,
    },

    gradient: {
      padding: 0,
      alignItems: 'center',
    },
});
