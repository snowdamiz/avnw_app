import React, { useEffect, useState } from 'react';

import Header from '../components/header.js';
import StoreContent from '../components/store_content.js';
import { merch, user } from '../../dummydb.js';

import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';

export default function Store(props, { navigation }) {
  const [curMerch, setMerch] = useState([]);

  useEffect(() => {
    getMerch();
  },[])

  function getMerch(){
    setMerch(merch);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header navigation={props.navigation} />
      <StoreContent navigation={navigation} merch={curMerch} />
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
