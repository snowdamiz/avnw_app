import React, { useEffect, useState, useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Context from '../context/context.js';
import Instagram from '../insta/instagram.js';

import InstagramIMG from '../assets/instagram.png';
import CloseIMG from '../assets/close.png';

import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';

export default function Gallery(props) {
  const cartContext = useContext(Context);

  useEffect(() => {
    let username = cartContext.curPhotographer.insta_username;
    Instagram.getFeed(username).then(media => {
      cartContext.setCurGallery(media.slice(0, 15));
    });
  }, [])

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.content}>
          <TouchableOpacity style={styles.close_btn} onPress={ _ => props.navigation.navigate('BookingStepOne')}>
            <Image style={styles.close_img} source={CloseIMG} />
          </TouchableOpacity>
          <View style={styles.content_header}>
            <Image
              source={{ uri: cartContext.curPhotographer.profile_image}}
              style={styles.profile_img} />
            <View style={styles.profile_info}>
              <Image source={InstagramIMG} style={styles.instagram_img}/>
              <Text style={styles.instagram_handle}>{cartContext.curPhotographer.insta_username}</Text>
            </View>
          </View>
          <View style={styles.gallery_box}>
            { cartContext.curGallery.map((el) => {
              return (
                <Image
                  key={el.url}
                  style={styles.gallery_img}
                  source={{ uri: el.src }} />
              )
            })}
          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
    // width: '100%',
    // height: '100%',
    // borderWidth: 1,
  },

    content: {
      // width: '100%',
      width: Dimensions.get('screen').width,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      // flexWrap: 'wrap',
      // borderWidth: 1,
      // borderColor: 'red',
      // padding: 20,
    },

    content_header: {
      marginTop: 15,
      // width: Dimensions.get('screen').width,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      // borderWidth: 1,
    },

    close_btn: {
      alignSelf: 'flex-end',
      marginTop: 20,
      marginRight: 20,
    },

      close_img: {
        width: 22,
        height: 22,
        opacity: 0.45,
      },
    
    profile_img: {
      width: 160,
      height: 160,
      borderRadius: 80,
      marginTop: -20,
      // shadowColor: '#000',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 1,
      // shadowRadius: 1,
      // elevation: 4,
      // zIndex: 3,
      // borderWidth: 1,
    },

    profile_info: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      // width: 200,
      // height: 45,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 15,
      paddingRight: 15,
      marginTop: -30,
      borderRadius: 12,
      // borderWidth: 1,
      backgroundColor: '#fefefe',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 1,
      elevation: 4,
      // top: 0,
    },

      instagram_img: {
        width: 40,
        height: 40,
      },

      instagram_handle: {
        color: '#565656',
      },

      gallery_box: {
        // width: '100%',
        padding: 20,
        // borderWidth: 1,
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        // flex: 1,
      },

        gallery_img: {
          width: Dimensions.get('screen').width / 2 - 30,
          height: 200,
          marginBottom: 15,
          borderRadius: 10,
          // borderWidth: 2,
          borderColor: '#565656',
        },
});
