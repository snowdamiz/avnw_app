import React, { useContext, useEffect, useState } from 'react';
import EditIMG from '../assets/edit.png';
import EditOnIMG from '../assets/edit_on.png';
import Context from '../context/context.js';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';

export default function LocationContent(props) {
  const cartContext = useContext(Context);
  const [shootLocation, setShootLocation] = useState([]);

  useEffect( _ => {
    setShootLocation(cartContext.shootLocation);
  }, [cartContext.shootLocation])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.header, cartContext.shootLocationToggle ? styles.header_on : null]}
        onPress={ _ => cartContext.handleShootLocationToggle()}>
        <Text style={[styles.header_text, cartContext.shootLocationToggle ? styles.header_text_on : null]}>
          Photoshoot Information
        </Text>
        <View style={styles.header_btns}>
          { cartContext.shootLocationToggle ? (
            <TouchableOpacity style={styles.edit_img_box} onPress={ _ => props.navigation.navigate('BookingStepThree') }>
              <Image
                source={ cartContext.shootLocationToggle ? EditOnIMG : EditIMG }
                style={[styles.header_edit_IMG, cartContext.shootLocationToggle ? styles.header_edit_IMG_on : null]} />
            </TouchableOpacity>
          ) : null }
          <TouchableOpacity onPress={ _ => cartContext.handleShootLocationToggle() }>
            <View style={ cartContext.shootLocationToggle ? styles.arrow_btn_up : styles.arrow_btn_down}></View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      { cartContext.shootLocationToggle ? (
        <View style={styles.container_box}>
          <View style={styles.content}>
            <Text style={styles.content_title}>City:</Text>
            <Text style={styles.content_text}>{shootLocation.city}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.content_title}>State:</Text>
            <Text style={styles.content_text}>{shootLocation.state}</Text>
          </View>
          <View style={styles.content_gbr}>
            <Text style={styles.content_title}>Date:</Text>
            <Text style={styles.content_text}>{cartContext.date}</Text>
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
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.28,
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
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
        },

          header_edit_IMG: {
            width: 16,
            height: 16,
            opacity: 0.5,
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
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      
      content_gbr: {
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









































