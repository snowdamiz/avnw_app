import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';

import CartIMG from '../../assets/cart.svg';
import ProfileIMG from '../../assets/profile.svg';
import LogoIMG from '../../assets/logo.png';

import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Platform,
  Button,
  View,
  Image,
  StatusBar,
  Text,
  TouchableNativeFeedback,
} from 'react-native';

export default function Header({ navigation }) {
  const route = useRoute();
  console.log(route.name);

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={ _ => navigation.navigate('Store')} >
        <LinearGradient colors={['#00BBB7', '#00C3BF', '#00BBB7']} style={styles.gradient} >
          <View name="logo" style={styles.logo}>
            <Image source={require('../../assets/logo.png')} style={styles.logoIMG} />
          </View>
        </LinearGradient>
      </TouchableNativeFeedback>

      <View name="navBox" style={styles.navBox}>
        { route.name === 'Store' ? (
          <TouchableNativeFeedback onPress={ _ => navigation.navigate('Store')} >
            <View name="filter" style={styles.filter}>
              <Text style={styles.filterText}>Filter</Text>
            </View>
          </TouchableNativeFeedback>
        ) :null }

        <TouchableNativeFeedback onPress={ _ => navigation.navigate('Store')} >
          <View name="cart" style={styles.cart}>
            <Image source={require('../../assets/cart.png')} style={styles.cartIMG} />
          </View>  
        </TouchableNativeFeedback>

        <TouchableNativeFeedback onPress={ _ => navigation.navigate('Store')} >
          <View name="profile" style={styles.profile}>
            <Image source={require('../../assets/profile.png')} style={styles.profileIMG} />
          </View>  
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    justifyContent: 'space-between',
  },

    logo: {
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
    },

    gradient: {
      padding: 0,
      alignItems: 'center',
      borderRadius: 8,
    },

    logoIMG: {
      width: 30,
      height: 30,
    },

    navBox: {
      height: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'flex-end',
    },

      filter: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: '#DEDEDE',
        backgroundColor: '#F1F1F1',
        marginRight: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },

      filterText: {
        color: '#7D7D7D',
        fontWeight: 'bold',
      },

      cart: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopColor: '#DEDEDE',
        borderLeftColor: '#DEDEDE',
        borderBottomColor: '#DEDEDE',
        borderRightColor: '#F1F1F1',
        backgroundColor: '#F1F1F1',
      },

      cartIMG: {
        width: 32,
        height: 32,
        opacity: 0.4,
        marginLeft: 5,
      },

      profile: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderTopColor: '#DEDEDE',
        borderRightColor: '#DEDEDE',
        borderLeftColor: '#F1F1F1',
        borderBottomColor: '#DEDEDE',
        backgroundColor: '#F1F1F1',
      },

      profileIMG: {
        width: 30,
        height: 30,
        marginRight: 5,
        opacity: 0.4,
      }
});