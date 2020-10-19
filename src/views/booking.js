import React from 'react';

import Header from '../components/header.js';
import BookingContent from '../components/booking_content.js';

import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
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