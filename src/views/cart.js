import React, { useState, useEffect } from 'react';

import Header from '../components/header.js';
import CartContent from '../components/cart_content.js';

import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';

export default function Cart({ navigation }) {
  // const [cart, setCart] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header navigation={navigation} />
      <CartContent />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }
});