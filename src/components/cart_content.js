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
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

export default function CartContent(props) {
  const [total, setTotal] = useState(0);
  const cartContext = useContext(Context);

  useEffect(() => {
    let cart = cartContext.cart;
    let total = 0;
    cart.map(el => {
      total = total + (el.price * el.quantity);
    })

    setTotal(total);
  },[cartContext.cart])

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
                      <TextInput 
                        style={styles.cart_container_content_Q_input}
                        placeholder={`${el.quantity}`}
                        placeholderTextColor='#000'
                        // value={}
                        // value={cartContext.cart.quantity}
                        onChangeText={q => cartContext.changeItemQuantity(q, el)}>
                      </TextInput>
                      <Text style={styles.cart_container_content_QP_price}>{el.price * el.quantity}</Text>
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
        { cartContext.cart.length > 0 ? (
          <View style={styles.cart_footer}>
            <View style={styles.cart_footer_price_box}>
              <Text style={styles.cart_footer_price_text}>Total Price:</Text>
              <View style={styles.cart_footer_price_circle}>
                <Text style={styles.cart_footer_price_amount}>{total}</Text>
              </View>
            </View>
            <LinearGradient colors={['#04A3E1', '#009cd8', '#009cd8']} style={styles.gradient} >
              <TouchableOpacity style={styles.cart_btn}>
                <Text style={styles.cart_btn_text}>Order</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ) : null }
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
          },

            cart_container_header_QP_text: {
              fontWeight: 'bold',
              opacity: 0.45,
              paddingLeft: 30,
            },

        cart_container_content: {
          width: '100%',
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
          },

            cart_container_content_Q_input: {
              height: 24,
              width: 24,
              borderWidth: 1,
              marginRight: 60,
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              fontWeight: 'bold',
              paddingTop: 0,
              paddingBottom: 0,
              opacity: 0.7,
              borderRadius: 4,
            },

              cart_container_content_QP_item: {
                width: 20,
                height: 20,
                borderWidth: 1,
                fontWeight: 'bold',
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

    gradient: {
      alignItems: 'center',
      borderRadius: 6, 
    },

    cart_footer: {
      width: '100%',
      // borderWidth: 1,
      marginTop: 15,
      marginBottom: 15,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },

      cart_footer_price_box: {
        // width: '45%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: '#fff',
        // borderWidth: 1,
        marginRight: 15,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 20,
        paddingRight: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.28,
        shadowRadius: 3.2,
        elevation: 6,
      },

        cart_footer_price_text: {
          fontWeight: 'bold',
          color: 'gray',
        },

        cart_footer_price_circle: {
          width: 32,
          height: 32,
          borderRadius: 17,
          // borderWidth: 1,
          marginLeft: 10,
          backgroundColor: '#009cd8',
          justifyContent: 'center',
          alignItems: 'center',
        },

          cart_footer_price_amount: {
            fontWeight: 'bold',
            color: '#fff',
          },

    cart_btn: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 120,
      height: 50,
      // borderWidth: 1,
      borderRadius: 6,
    },

      cart_btn_text: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 15,
      },
});








































