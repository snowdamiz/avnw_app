import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Platform,
  Button,
  View,
  StatusBar,
  Text,
  TouchableNativeFeedback,
} from 'react-native';

export default function StoreContent({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.store}>
      </View>

        <LinearGradient colors={['#00C3BF', '#00BBB7', '#00BBB7']} style={styles.gradient} >
          <TouchableNativeFeedback onPress={ _ => navigation.navigate('Booking')} >
            <View style={styles.book_btn}>
              <Text style={styles.book_btn_text} >
                Schedule A Photo Shoot
              </Text>
            </View>
          </TouchableNativeFeedback>
        </LinearGradient>
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
    borderColor: 'red',
  },

    store: {
      width: '100%',
      borderColor: 'blue',
    },

    gradient: {
      marginBottom: 15,
      alignItems: 'center',
      borderRadius: 8, 
    },

    book_btn: {
      width: Dimensions.get('screen').width - 30,
      height: 60,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },

      book_btn_text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
      }
});