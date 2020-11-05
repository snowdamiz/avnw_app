import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Context from '../context/context.js';

import DeleteConfirmation from '../components/micro/delete_confirmation.js';
import Header from '../components/header.js';
import PhotographersContent from '../components/admin/photographers_content.js';

import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

export default function AdminPanel(props) {
  // const [cover, setCover] = useState(false);
    
  const cartContext = useContext(Context);

  // useEffect( _ => {
  //   handleBGCover();
  // }, [cartContext.deletePhotographerConfirmation])

  // const handleBGCover = _ => {
  //   if (cartContext.deletePhotographerConfirmation) {
  //     setCover(true)
  //   } else setCover(false);
  // }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header navigation={props.navigation} />
      {/* { cover ? <View style={styles.cover}></View> : null } */}
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
      // borderWidth: 1,
      zIndex: 1,
      backgroundColor: '#fff',
      marginTop: 72,
    }
});
