import React from 'react';
import { StyleSheet, ScrollView, View, StatusBar } from 'react-native';
import Header from '../../components/header.js';
import PhotographersContent from '../../components/admin/photographers_content.js';
import ServicesContent from '../../components/admin/services_content.js';
import ProductContent from '../../components/admin/products_content.js';
import MerchOrderContent from '../../components/admin/merch_order_content.js';
import ServiceOrderContent from '../../components/admin/service_order_content.js';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight() : 0;

function StatusBarPlaceHolder() {
  return (
    <View style={{
      width: "100%",
      height: STATUS_BAR_HEIGHT,
      backgroundColor: "#009cd8"
    }}>
      <StatusBar barStyle="light-content" backgroundColor="#009cd8" />
    </View>
  );
}

export default function AdminPanel(props) {
  return (
    <>
      <StatusBarPlaceHolder />
      <ScrollView contentContainerStyle={styles.container}>
        <Header navigation={props.navigation} />
        <PhotographersContent navigation={props.navigation} />
        <ServicesContent navigation={props.navigation} />
        <ProductContent navigation={props.navigation} />
        <MerchOrderContent navigation={props.navigation} />
        <ServiceOrderContent navigation={props.navigation} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100%',
  },
});
