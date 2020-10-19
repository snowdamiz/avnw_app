import React, { useState, useEffect } from 'react';

import Header from '../components/header.js';

import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';

export default function Login({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header navigation={navigation} />

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