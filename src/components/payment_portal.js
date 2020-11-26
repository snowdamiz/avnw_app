import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/context.js';
import StripeCheckout from './micro/stripe-checkout.js';

import {
  Dimensions,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableNativeFeedback,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Plateform,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function PaymentPortal(props) {
  const cartContext = useContext(Context);
  const route = useRoute();

  const handleClose = _ => {
    console.log('Closed');
    props.navigation.navigate('MerchOrderOverview');
  }

  const handleSuccess = _ => {
    console.log('Success');
    props.navigation.navigate('Orders');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      { Platform.OS === 'ios' ? (
        <View style={styles.btn_view}>
          <TouchableOpacity onPressIn={ _ => props.navigation.goBack()}>
            <View style={styles.back_btn}>
              <Text style={styles.back_btn_text}>Back</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null }
      <StripeCheckout
        navigation={props.navigation}
        publicKey="pk_live_AUzulzbWhPDJgwGRez3gHcBB00oJ5lfR7v"
        amount={cartContext.total}
        imageUrl="https://pbs.twimg.com/profile_images/778378996580888577/MFKh-pNn_400x400.jpg"
        storeName="Alpha Visuals"
        description="Test"
        currency="USD"
        allowRememberMe={false}
        prepopulatedEmail={cartContext.user.email}
        onClose={ _ => handleClose()}
        onPaymentSuccess={ _ => handleSuccess()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
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
});








































