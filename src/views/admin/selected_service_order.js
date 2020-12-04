import React from 'react';
import Header from '../../components/header.js';
import SelectedServiceOrderContentADMIN from '../../components/admin/selected_service_order_content.js';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 24 : 0;

function StatusBarPlaceHolder() {
  return (
    <View style={{
      width: "100%",
      height: STATUS_BAR_HEIGHT,
      backgroundColor: "#009cd8"
    }}>
      <StatusBar barStyle="light-content" backgroundColor="#009cd8"/>
    </View>
  );
}

import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';

export default function SelectedServiceOrderADMIN(props) {
  return (
    <>
      <StatusBarPlaceHolder />
      <SafeAreaView style={styles.container}>
        <Header navigation={props.navigation} />
        <SelectedServiceOrderContentADMIN navigation={props.navigation} />
      </SafeAreaView>
    </>
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