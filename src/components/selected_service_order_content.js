import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import Context from '../context/context.js';

import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function SelectedServiceOrderContent(props) {
  const cartContext = useContext(Context);
  const route = useRoute();

  return (
    <ScrollView contentContainerStyle={styles.container}>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: Dimensions.get('screen').width,
    // borderWidth: 1,
  },
});