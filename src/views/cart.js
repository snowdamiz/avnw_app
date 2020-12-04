import React from 'react';
import Header from '../components/header.js';
import CartContent from '../components/cart_content.js';
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

export default function Cart(props) {
  return (
    <>
      <StatusBarPlaceHolder />
      <SafeAreaView style={styles.container}>
        <Header navigation={props.navigation} />
        <CartContent navigation={props.navigation}/>
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