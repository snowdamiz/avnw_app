import React from 'react';
import Header from '../components/header.js';
import SelectedMerchOrderContent from '../components/selected_merch_order_content.js';
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
} from 'react-native';

export default function SelectedMerchOrder(props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBarPlaceHolder />
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