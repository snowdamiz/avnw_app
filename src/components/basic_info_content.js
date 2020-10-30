import React, { useContext, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';

import EditIMG from '../assets/edit.png';
import EditOnIMG from '../assets/edit_on.png'
import Context from '../context/context.js';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

export default function ShippingContent(props) {
  const cartContext = useContext(Context);
  const route = useRoute();

  const [toggle, setToggle] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.header, toggle ? styles.header_on : null]}
        onPress={ _ => setToggle(!toggle)}>
        <Text style={[styles.header_text, toggle ? styles.header_text_on : null]}>Basic Information</Text>
        <View style={styles.header_btns}>
          { toggle ? (
            <TouchableOpacity style={styles.edit_img_box}>
              <Image
                source={ toggle ? EditOnIMG : EditIMG }
                style={[styles.header_edit_IMG, toggle ? styles.header_edit_IMG_on : null]} />
            </TouchableOpacity>
          ) : null }
          <TouchableOpacity onPress={ _ => setToggle(!toggle) }>
            <View style={ toggle ? styles.arrow_btn_up : styles.arrow_btn_down}></View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      { toggle ? (
        <View style={styles.container_box}>
          <View style={styles.content}>
            <Text style={styles.content_title}>Name:</Text>
            <Text style={styles.content_text}>{cartContext.user.name}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.content_title}>Email:</Text>
            <Text style={styles.content_text}>{cartContext.user.email}</Text>
          </View>
          <View style={styles.content_gbr}>
            <Text style={styles.content_title}>Phone:</Text>
            <Text style={styles.content_text}>{cartContext.user.phone}</Text>
          </View>
        </View>
      ) : null }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    width: Dimensions.get('screen').width - 30,
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 6,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 6,
  },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 15,
      paddingLeft: 15,
      height: 55,
      borderBottomColor: '#DDDDDD',
      borderTopColor: '#fff',
      borderLeftColor: '#fff',
      borderRightColor: '#fff',
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
    },

    header_on: {
      backgroundColor: '#009cd8',
    },

      header_text: {
        fontSize: 15,
        fontWeight: 'bold',
        opacity: 0.5,
        color: '#000',
      },

      header_text_on: {
        color: '#fefefe',
        opacity: 1,
      },

        header_btns: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginRight: 5,
        },

        edit_img_box: {
          width: 30,
          height: 30,
          // borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
        },

          header_edit_IMG: {
            width: 16,
            height: 16,
            opacity: 0.5,
            // marginRight: 15,
          },

          header_edit_IMG_on: {
            opacity: 1,
          },

        arrow_btn_down: {
          width: 0,
          height: 0,
          borderLeftWidth: 8,
          borderRightWidth: 8,
          borderTopWidth: 13,
          borderStyle: 'solid',
          backgroundColor: 'transparent',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: '#000',
          opacity: 0.35,
        },

        arrow_btn_up: {
          width: 0,
          height: 0,
          borderLeftWidth: 8,
          borderRightWidth: 8,
          borderBottomWidth: 13,
          borderStyle: 'solid',
          backgroundColor: 'transparent',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: '#fefefe',
          opacity: 1,
        },

    content: {
      width: '100%',
      paddingTop: 10,
      // paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    container_box: {
      width: Dimensions.get('screen').width - 30
    },  

      content_g: {
        backgroundColor: '#E8E8E8',
        width: '100%',
        // paddingTop: 5,
        // paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      
      content_gbr: {
        // backgroundColor: '#E8E8E8',
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomRightRadius: 6,
        borderBottomLeftRadius: 6,
      },

        content_title: {
          fontSize: 13,
          opacity: 0.5,
        },

        content_text: {
          fontSize: 13,
          opacity: 0.5,
        },
});








































