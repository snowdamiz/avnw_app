import React from 'react';
import Header from '../../components/header.js';
import SelectedMerchOrderContentADMIN from '../../components/admin/selected_merch_order_content.js';

import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function SelectedMerchOrderADMIN(props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#009cd8" />
      <Header navigation={props.navigation} />
      <SelectedMerchOrderContentADMIN navigation={props.navigation} />
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