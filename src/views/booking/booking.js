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
      <StatusBar />
      <Header navigation={navigation} />
      <BookingContent navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});