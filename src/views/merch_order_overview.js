import React from 'react';
import Header from '../components/header.js';
import MerchOrderOverviewContent from '../components/merch_order_overview_content.js';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight() : 0;

function StatusBarPlaceHolder() {
  return (
    <View style={{
      width: "100%",
      height: STATUS_BAR_HEIGHT,
      backgroundColor: "#009cd8"
    }}>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';

export default function MerchOrderOverview(props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBarPlaceHolder />
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
