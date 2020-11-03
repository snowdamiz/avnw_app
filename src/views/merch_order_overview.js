import React from 'react';

import Header from '../components/header.js';
import MerchOrderOverviewContent from '../components/merch_order_overview_content.js';

import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function MerchOrderOverview(props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header navigation={props.navigation} />
      <MerchOrderOverviewContent navigation={props.navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 1,
  }
});
