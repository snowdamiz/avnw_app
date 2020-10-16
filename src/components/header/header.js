import React from 'react';

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

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.test}>Header</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    // flex: 1,
    width: '100%',
    // height: 80,
    borderColor: "#20232a",
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // border: '1px solid black'
  },

  test: {
    

  }
});