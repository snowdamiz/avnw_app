import React, { useEffect, useContext } from 'react';
import Context from '../context/context.js';
import Instagram from '../insta/instagram.js';
import InstagramIMG from '../assets/instagram.png';
import CloseIMG from '../assets/close.png';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 24 : 0;

function StatusBarPlaceHolder() {
  return (
    <View style={{
      width: "100%",
      height: STATUS_BAR_HEIGHT,
      backgroundColor: "#009cd8"
    }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff"/>
    </View>
  );
}

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
    <>
      <StatusBarPlaceHolder />
      <SafeAreaView forceInset={{top: 'never'}} style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <TouchableOpacity
            style={styles.close_btn}
            onPress={ _ => props.navigation.navigate('BookingStepOne')}>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

    content: {
      width: Dimensions.get('screen').width,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },

    content_header: {
      marginTop: 15,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
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
    },

    profile_info: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 15,
      paddingRight: 15,
      marginTop: -30,
      borderRadius: 12,
      backgroundColor: '#fefefe',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.28,
      shadowRadius: 5,
      elevation: 4,
    },

      instagram_img: {
        width: 40,
        height: 40,
      },

      instagram_handle: {
        color: '#565656',
      },

      gallery_box: {
        padding: 20,
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
      },

        gallery_img: {
          width: Dimensions.get('screen').width / 2 - 30,
          height: Dimensions.get('screen').width / 2 * 1.5 - 120,
          marginBottom: 15,
          borderRadius: 10,
          borderColor: '#565656',
        },
});
