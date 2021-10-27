import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import BG from '../assets/bg.png'
import Logo_large from '../assets/logo_large.png';
import { Dimensions, StyleSheet, StatusBar, View, Image, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getStatusBarHeight } from 'react-native-status-bar-height'

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight() : 0

function StatusBarPlaceHolder() {
  return (
    <View style={{
      width: "100%",
      height: STATUS_BAR_HEIGHT,
      backgroundColor: "#009cd8"
    }}>
      <StatusBar barStyle="light-content" backgroundColor="#009cd8"/>
    </View>
  );
}

export default function Index(props) {
  return (
    <>
      <StatusBarPlaceHolder />
      <View style={styles.container}>
        <LinearGradient colors={['#009cd8', '#008CC1', '#0080B1']} style={styles.gradient} >
          <View style={styles.content}>
            <Image source={Logo_large} style={styles.logo} />
            <Image source={BG} style={styles.bg} />
            <View style={styles.buttons_container}>
              <TouchableOpacity style={styles.shoot_btn} onPress={ _ => props.navigation.navigate('BookingStepOne')}>
                <Text style={styles.shoot_btn_text}>Book a Photo Shoot</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.merch_btn} onPress={ _ => props.navigation.navigate('Store')}>
                <Text style={styles.merch_btn_text}>Merch Store</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },

    content: {
      width: Dimensions.get('screen').width,
      height: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1,
    },

      logo: {
        width: 220,
        height: 220,
        marginTop: 80,
      },

      buttons_container: {
        marginBottom: 40,
        justifyContent: 'space-between',
        zIndex: 1,
      },

        shoot_btn: {
          width: Dimensions.get('screen').width - 80,
          padding: 14,
          borderWidth: 2,
          borderColor: '#fff',
          backgroundColor: '#fff',
          borderRadius: 8,
        },

        shoot_btn_text: {
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#5e5e5e',
          fontSize: 16,
        },

        merch_btn: {
          width: Dimensions.get('screen').width - 80,
          padding: 14,
          marginTop: 14,
          borderWidth: 2,
          borderColor: '#005D80',
          backgroundColor: '#005D80',
          borderRadius: 8,
        },

        merch_btn_text: {
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#fff',
          fontSize: 16,
        },

    bg: {
      position: 'absolute',
      width: Dimensions.get('screen').width,
      height: 400,
      opacity: 0.6,
      bottom: 0,

    },

    gradient: {
      padding: 0,
      alignItems: 'center',
    },
});
