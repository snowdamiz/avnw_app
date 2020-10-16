import React from 'react';

import Header from '../../components/header/header.js';
import BookingContent from '../../components/booking_content/booking_content.js';

import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Platform,
  Button,
  View,
  StatusBar,
  Text,
} from 'react-native';

export default function Booking({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header />
      <BookingContent navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    marginTop: 20,
    // justifyContent: 'center',
  },
});