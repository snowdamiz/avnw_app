import React from 'react';
import Header from '../components/header.js';
import StoreContent from '../components/store_content.js';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, StatusBar, View } from 'react-native';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight() : 0;

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

export default function Store(props) {
  return (
    <>
      <StatusBarPlaceHolder />
      <View style={styles.container}>
        <Header navigation={props.navigation} />
        <StoreContent navigation={props.navigation} />
      </View>
    </>
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
