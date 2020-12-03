import React from 'react';
import Header from '../components/header.js';
import BasicInfoStepContent from '../components/basic_info_step_content.js';
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

export default function BasicInfoStep(props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBarPlaceHolder />
      <Header navigation={props.navigation} />
      <BasicInfoStepContent navigation={props.navigation} />
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
  }
});
