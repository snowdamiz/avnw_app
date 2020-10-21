import React, { useEffect, useState, useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import Context from '../context/context.js';
import CartContent from '../components/cart_content.js';
import BasicInfoContent from './basic_info_content.js';
import ShippingContent from './shipping_content.js';

import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function MerchOrderOverviewContent(props) {
  const cartContext = useContext(Context);

  return (
    <View style={styles.container}>
      <ScrollView>
        <BasicInfoContent navigation={props.navigation} />
        <ShippingContent navigation={props.navigation} />
        <CartContent navigation={props.navigation} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    zIndex: 1,
  },
});