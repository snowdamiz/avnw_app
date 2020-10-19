import React from 'react';

import {
  StyleSheet,
  Button,
  View,
} from 'react-native';

export default function BookingContent({ navigation }) {
  return (
    <View style={styles.container}>
      <Button 
        title="Store"
        onPress={ _ => navigation.navigate('Store')}
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