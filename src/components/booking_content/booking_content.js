import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Platform,
  Button,
  View,
  StatusBar,
  Text,
} from 'react-native';

export default function BookingContent({ navigation }) {
  return (
    <View style={styles.container}>
      <Button 
        title="Book"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderColor: '#000',
  }
});