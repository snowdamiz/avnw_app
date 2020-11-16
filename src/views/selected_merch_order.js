import React from 'react';
import Header from '../components/header.js';
import SelectedMerchOrderContent from '../components/selected_merch_order_content.js';

import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function SelectedMerchOrder(props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#009cd8" />
      <Header navigation={props.navigation} />
      <SelectedMerchOrderContent navigation={props.navigation} />
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
  }
});