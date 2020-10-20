import React, { useContext, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import RemoveIMG from '../assets/error.png';
import Context from '../context/context.js';

import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

export default function CartContent(props) {
  const cartContext = useContext(Context);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.cart}>
        <View style={styles.cart_container}>
          <View style={styles.cart_container_header}>
            <Text style={styles.cart_container_header_text}>Item</Text>
            <View style={styles.cart_container_header_QP}>
              <Text style={styles.cart_container_header_QP_text}>Quantity</Text>
              <Text style={styles.cart_container_header_QP_text}>Price</Text>
            </View>
          </View>
          <View style={styles.cart_container_content}>
            { cartContext.cart.length < 1 ? (
              <Text style={styles.cart_container_empty_text}>Your Cart is Empty</Text>
            ) : (
              cartContext.cart.map((el) => {
                return (
                  <View style={styles.cart_container_content_box} key={el.id}>
                    <Text style={styles.cart_container_content_item}>{el.product}</Text>
                    <View style={styles.cart_container_content_QP}>
                      <Text style={styles.cart_container_content_QP_item}>{el.quantity}</Text>
                      <Text style={styles.cart_container_content_QP_price}>{el.price}</Text>
                      <TouchableOpacity style={styles.cart_container_content_removeBTN} onPress={ _ => cartContext.handleCart(el)}>
                        <Image style={styles.cart_container_content_removeIMG} source={RemoveIMG} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })
            )}
          </View>
        </View>
      </ScrollView>
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
  },

    cart: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      paddingRight: 15,
      paddingLeft: 15,
      paddingBottom: 15,
    },

      cart_container: {
        width: '100%',
        // borderWidth: 1,
        marginTop: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.28,
        shadowRadius: 6,
        elevation: 5,
        borderRadius: 6,
      },

        cart_container_header: {
          width: '100%',
          borderWidth: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          padding: 10,
          borderTopRightRadius: 6,
          borderTopLeftRadius: 6,
          backgroundColor: '#fff',
          borderBottomColor: '#DDDDDD',
          borderTopColor: '#fff',
          borderLeftColor: '#fff',
          borderRightColor: '#fff',
        },

          cart_container_header_text: {
            fontWeight: 'bold',
            opacity: 0.45,
          },
          
          cart_container_header_QP: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginRight: 40,
            // borderWidth: 1,
          },

            cart_container_header_QP_text: {
              fontWeight: 'bold',
              opacity: 0.45,
              paddingLeft: 30,
            },

        cart_container_content: {
          width: '100%',
          // borderWidth: 1,
          // borderColor: 'blue',
          padding: 10,
          borderBottomRightRadius: 6,
          borderBottomLeftRadius: 6,
          backgroundColor: '#fff',
        },

          cart_container_empty_text: {
            opacity: 0.6,
            fontSize: 13,
          },

          cart_container_content_box: {
            // borderWidth: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingTop: 4,
            paddingBottom: 4,
          },

            cart_container_content_item: {
              fontSize: 13,
              opacity: 0.6,
              color: '#000',
            },

          cart_container_content_QP: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginRight: 8,
            // borderWidth: 1,
          },

            cart_container_content_QP_item: {
              fontWeight: 'bold',
              marginRight: 76,
            },

            cart_container_content_QP_price: {
              fontWeight: 'bold',
              color: '#009cd8',
              marginRight: 30,
            },

            cart_container_content_removeIMG: {
              opacity: 0.45,
              width: 20,
              height: 20,
            },
});