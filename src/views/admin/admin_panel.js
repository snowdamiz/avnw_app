import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Header from '../../components/header.js';
import PhotographersContent from '../../components/admin/photographers_content.js';
import ServicesContent from '../../components/admin/services_content.js';
import ProductContent from '../../components/admin/products_content.js';

export default function AdminPanel(props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header navigation={props.navigation} />
      <PhotographersContent navigation={props.navigation} />
      <ServicesContent navigation={props.navigation} />
      <ProductContent navigation={props.navigation} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100%',
    // zIndex: 2,
  },
});
