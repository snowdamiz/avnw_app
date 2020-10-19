import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import Context from '../context/context.js';

import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function Login(props) {
  return (
    <View style={styles.container}>
      <View contentContainerStyle={styles.login}>
        <Text>Login</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});