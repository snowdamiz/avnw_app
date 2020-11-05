import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Header from '../components/header.js';
import PhotographersContent from '../components/admin/photographers_content.js';

export default function AdminPanel(props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header navigation={props.navigation} />
      <PhotographersContent navigation={props.navigation} />  
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

    cover: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: 0.7,
      zIndex: 1,
      backgroundColor: '#fff',
      marginTop: 72,
    }
});
