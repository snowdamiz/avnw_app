import React, { useContext, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';

import EditIMG from '../../assets/edit.png';
import AddIMG from '../../assets/add.png';
import AddOnIMG from '../../assets/add_on.png';
import DeleteIMG from '../../assets/trash.png';
import Context from '../../context/context.js';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';

export default function ServicesContent(props) {
  const [toggle, setToggle] = useState(false);

  const cartContext = useContext(Context);
  const route = useRoute();
  
  useEffect( _ => {
    cartContext.getPhotographers();
  },[cartContext.services])

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.header, toggle ? styles.header_on : null]} onPress={ _ => setToggle(!toggle)}>
        <Text style={[styles.header_text, toggle ? styles.header_text_on : null]}>Services</Text>
        <View style={styles.header_btns}>
          { toggle ? (
            <TouchableOpacity
              style={styles.add_photographer_box}
              onPress={ _ => cartContext.handleNewPhotographerToggle()}>
              <Image
                source={ toggle ? AddOnIMG : AddIMG }
                style={[styles.header_add_IMG, toggle ? styles.header_add_IMG_on : null]} />
            </TouchableOpacity>
          ) : null }
          <TouchableOpacity onPress={ _ => setToggle(!toggle) }>
            <View style={ toggle ? styles.arrow_btn_up : styles.arrow_btn_down}></View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      { toggle ? (
        <View style={styles.container_box}>
          { cartContext.photographers ? cartContext.photographers.map(el => {
            return (
              <View style={styles.photographer_card} key={el.id}>
                <View style={styles.photographer_content}>
                  <View style={styles.photographer_row}>
                    <Text style={styles.photographer_label}>Name:</Text>
                    <Text style={styles.photographer_text}>{el.name}</Text>
                  </View>
                  <View style={styles.photographer_row}>
                    <Text style={styles.photographer_label}>Insta:</Text>
                    <Text style={styles.photographer_text}>{el.insta_username}</Text>
                  </View>
                </View>
                <View style={styles.btns}>
                  <TouchableOpacity style={[styles.btn]}>
                    <Image source={EditIMG} style={[styles.btn_IMG]} />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.btn]}>
                    <Image source={DeleteIMG} style={[styles.btn_IMG]} />
                  </TouchableOpacity>
                </View>
              </View>
            ) 
          }) : null }
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
    // height: '100%',
    marginTop: 15,
    marginBottom: 30,
    // paddingBottom: 30,
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
      // borderBottomColor: '#DDDDDD',
      borderTopColor: '#fff',
      borderLeftColor: '#fff',
      borderRightColor: '#fff',
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
    },

    header_on: {
      backgroundColor: '#009cd8',
      // borderWidth: 2,
      // borderColor: '#009cd8',
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

        add_photographer_box: {
          width: 30,
          height: 30,
          // borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
        },

          header_add_IMG: {
            width: 16,
            height: 16,
            opacity: 0.5,
            // marginRight: 15,
          },

          header_add_IMG_on: {
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

  container_box: {
    // borderWidth: 1,
    // borderColor: '#009cd8',
    paddingBottom: 10,
    // marginBottom: 30,
  },

    photographer_card: {
      width: Dimensions.get('screen').width - 50,
      borderWidth: 1,
      borderColor: 'lightgray',
      borderRadius: 4,
      padding: 10,
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

      photographer_content: {
        // borderWidth: 1,
      },

        photographer_row: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: 4,
        },

        photographer_row_reverse: {
          flexDirection: 'column',
        },

          photographer_label: {
            fontWeight: 'bold',
            opacity: 0.65,
          },

          photographer_text: {
            fontSize: 14,
            opacity: 0.8,
            marginLeft: 6,
          },

        btns: {
          // borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          // width: '100%',
        },

          btn: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 34,
            height: 34,
            borderRadius: 17,
            // borderWidth: 1,
            marginLeft: 4,
          },

            btn_IMG: {
              width: 20,
              height: 20,
              opacity: 0.65,
              // borderRadius: 17,
            }

});








































