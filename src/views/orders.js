import React from 'react';
import Header from '../components/header.js';
import OrdersContent from '../components/orders_content.js';
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

export default function Orders(props) {
  return (
    <>
      <StatusBarPlaceHolder />
      <View style={styles.container}>
        <Header navigation={props.navigation} />
        <OrdersContent navigation={props.navigation} />
      </View>
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