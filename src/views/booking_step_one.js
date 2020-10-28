import React, { useState, useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';

import Context from '../context/context.js';

import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';

export default function BookingStepOne(props) {
  const [showDetails, setShowDetails] = useState(false);

  const route = useRoute();
  const cartContext = useContext(Context);

  const handleDetails = el => {
    setShowDetails(true);
    cartContext.setCurPhotographer(el);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#009cd8', '#018bc0', '#018bc0']} style={styles.gradient} >
        <View style={styles.content}>
          <View style={styles.text_box}>
            <Text style={styles.text_title}>Step One</Text>
            <Text style={styles.text_content}>Choose your photographer</Text>
          </View>
          <View style={[styles.photographer_box, showDetails ? styles.photographer_box_on : null ]}>
            { cartContext.photographers.map(el => {
              return (
                <TouchableOpacity key={el.id} onPress={() => handleDetails(el) }>
                  <Image
                    source={{ uri: el.profile_image }}
                    style={styles.photographer_IMG}
                  />
                  { showDetails ? (
                    <View style={cartContext.curPhotographer.id == el.id ? styles.arrow : null}></View>
                  ) : null }
                </TouchableOpacity>
              )
            })}
          </View>
          { showDetails ? (
            <View style={styles.details_box}>
              <Text style={styles.details_name}>{cartContext.curPhotographer.name}</Text>
              <Text style={styles.details_bio}>{cartContext.curPhotographer.bio}</Text>
              <View style={styles.details_btn_box}>
                <TouchableOpacity
                  style={[ styles.details_btn, styles.gallery_btn]}
                  onPress={ _ => props.navigation.navigate('Gallery')}>
                  <Text style={styles.gallery_btn_text}>See my Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[ styles.details_btn, styles.choose_btn]}
                  onPress={ _ => props.navigation.navigate('BookingStepTwo')}>
                  <Text style={styles.choose_btn_text}>Choose {cartContext.curPhotographer.name}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null }
        </View>
      </LinearGradient>
    </SafeAreaView>
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
      justifyContent: 'center',
      alignItems: 'center',
    },

      text_box: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      },

        text_title: {
          color: '#fefefe',
          fontWeight: 'bold',
          fontSize: 28,
        },

        text_content: {
          color: '#fefefe',
          fontSize: 17,
        },

      photographer_box: {
        marginTop: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
      },

      photographer_box_on: {
        width: '100%',
        marginTop: 20,
      },  

        photographer_IMG: {
          width: 70,
          height: 70,
          margin: 6,
          borderWidth: 4,
          borderColor: '#e5e5e5',
          borderRadius: 35,
        },

      details_box: {
        width: Dimensions.get('screen').width - 60,
        padding: 20,
        backgroundColor: '#fefefe',
        marginTop: 25,
        borderRadius: 10,
      },

        arrow: {
          width: 0,
          height: 0,
          borderLeftWidth: 15,
          borderRightWidth: 15,
          borderBottomWidth: 20,
          borderStyle: 'solid',
          backgroundColor: 'transparent',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: '#fefefe',
          marginLeft: 26,
          marginTop: 90,
          position: 'absolute',
        },

        details_name: {
          fontSize: 22,
          fontWeight: 'bold',
          color: '#000',
          paddingBottom: 12,
          opacity: 0.6,
        },

        details_bio: {
          fontSize: 13,
          color: '#000',
          lineHeight: 18.5,
          opacity: 0.55,
        },

        details_btn_box: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },

          details_btn: {
            width: Dimensions.get('screen').width / 2 - 60,
            padding: 10,
            marginTop: 20,
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
          },

          gallery_btn: {
            backgroundColor: '#009cd8',
          },
          
            gallery_btn_text: {
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 12,
            },

          choose_btn: {
            backgroundColor: '#005d80',
          },

            choose_btn_text: {
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 12,
            }
});