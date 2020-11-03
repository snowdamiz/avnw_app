import React, { useEffect, useState, useContext } from 'react';
import { useRoute } from '@react-navigation/native';

import Context from '../context/context.js';

import CartIMG from '../assets/cart.png';
import ProfileIMG from '../assets/profile.png';
import LogoIMG from '../assets/logo.png';

import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Header(props) {
  const [menuToggle, setMenuToggle] = useState(false);

  const route = useRoute();
  const cartContext = useContext(Context);

  const checkLoggedInUser = _ => {
    if (cartContext.token) setMenuToggle(!menuToggle);
    else props.navigation.navigate('Login')
  }

  const handleSignout = _ => {
    cartContext.handleSignout();
    props.navigation.navigate('Index')
  }

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={ _ => props.navigation.navigate('Index')} >
        <View name="logo" style={styles.logo}>
          <Image source={LogoIMG} style={styles.logoIMG} />
        </View>
      </TouchableNativeFeedback>
      <View name="navBox" style={styles.navBox}>        
        <View style={styles.menu_wrap} >
          <TouchableNativeFeedback onPress={ _ => props.navigation.navigate('Cart')} >
            <View name="cart" style={styles.cart}>
              <Image source={CartIMG} style={styles.cartIMG} />
              {cartContext.cart.length > 0 ? (
                <View style={styles.cart_notification}>
                  <Text style={styles.cart_notification_text}>{cartContext.cart.length}</Text>
                </View>
              ) : null }
            </View>  
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={ _ => checkLoggedInUser()} >
            <View name="profile" style={styles.profile}>
              <Image source={ProfileIMG} style={styles.profileIMG} />
            </View>  
          </TouchableNativeFeedback>
        </View>
      </View>
      { menuToggle ? (
        <View style={styles.cover}></View>
        ): null }
      { menuToggle ? (
        <View style={styles.profile_menu_box}>
          <TouchableOpacity style={[ styles.btn, styles.btn_first]}>
            <Text style={[styles.btn_text]}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[ styles.btn]}>
            <Text style={[styles.btn_text]}>My Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btn_last]} onPressIn={ _ => handleSignout()}>
            <Text style={[styles.btn_text, styles.signout_btn_text]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      ): null }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    justifyContent: 'space-between',
    zIndex: 1,
    backgroundColor: '#009cd8',
  },

    logo: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
    },

    gradient: {
      padding: 0,
      alignItems: 'center',
      borderRadius: 6,
    },

    logoIMG: {
      width: 30,
      height: 30,
    },

    navBox: {
      height: 42,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'flex-end',
      // borderWidth: 1,
    },

      filter: {
        width: 42,
        height: 42,
        backgroundColor: '#fff',
        // shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        // shadowOpacity: 0.28,
        // shadowRadius: 3.2,
        // elevation: 8,
        marginRight: 15,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
      },

      close_IMG: {
        width: 16,
        height: 16,
        opacity: 0.35,
      },

      menu_wrap: {
        width: 100,
        height: 42,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
      },

        cart: {
          width: 52,
          height: 42,
          justifyContent: 'center',
          alignItems: 'center',
          borderTopLeftRadius: 21,
          borderBottomLeftRadius: 21,
          backgroundColor: '#fff',
        },

        cartIMG: {
          width: 24,
          height: 24,
          opacity: 0.45,
          marginLeft: 8,
        },

        cart_notification: {
          width: 16,
          height: 16,
          borderRadius: 8,
          bottom: 6,
          left: 14,
          position: 'absolute',
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        },

          cart_notification_text: {
            color: '#fff',
            fontSize: 9,
            fontWeight: 'bold',
          },

        profile: {
          width: 52,
          height: 42,
          justifyContent: 'center',
          alignItems: 'center',
          borderTopRightRadius: 21,
          borderBottomRightRadius: 21,
          backgroundColor: '#fff',
        },

        profileIMG: {
          width: 24,
          height: 24,
          marginRight: 8,
          opacity: 0.45,
        },

        navBtnBox: {
          width: 26,
          height: 20,
          // borderWidth: 1,
          marginLeft: 20,
          justifyContent: 'space-between',
        },

        navBtnLine: {
          width: '100%',
          height: 4,
          borderRadius: 6,
          backgroundColor: '#fdfdfd',
        },

    profile_menu_box: {
      zIndex: 1,
      position: 'absolute',
      width: 120,
      // height: 150,
      // borderWidth: 1,
      borderRadius: 8,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.7,
      shadowRadius: 10,
      elevation: 6,
      right: 15,
      top: 65,
    },

      btn: {
        width: '100%',
        // borderWidth: 1,
      },

      btn_first: {
        marginTop: 10,
      },

      btn_last: {
        marginBottom: 10,
      },

        btn_text: {
          opacity: 0.6,
          textAlign: 'center',
          padding: 5,
        },

        signout_btn_text: {
          fontWeight: 'bold',
        },

    cover: {
      marginTop: 80,
      position: 'absolute',
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
      backgroundColor: '#fff',
      // borderWidth: 1,
      opacity: 0.5,
    }
});