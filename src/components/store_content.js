import React, { useEffect, useState, useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import Context from '../context/context.js';

import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function StoreContent(props) {
  const [merchResults, setMerchResults] = useState([]);
  const cartContext = useContext(Context);

  useEffect(() => {
    let filterList = cartContext.filterList;
    let merch = cartContext.merch;
    let results = [];

    filterList.forEach(e1 => 
      merch.forEach(e2 => {
      if (e1 === e2.category) {
        results.push(e2);
      }
    }))

    if (results.length < 1) {
      setMerchResults(cartContext.merch);
    } else {
      setMerchResults(results);
    }
  },[cartContext.filterList]);

  const handleCartToggle = (id) => {
    cartContext.handleCart(id);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.store}>
        {merchResults.map((el) => {
          return (
            <View style={styles.prod_box} key={el.id}>
              <View style={styles.prod_img}></View>
              <View style={styles.prod_price}>
                <Text style={styles.prod_price_text}>{`$${el.price}`}</Text>
              </View>
              <View style={styles.prod_desc}>
                <View>
                  <Text style={styles.prod_desc_title}>{el.product}</Text>
                  <Text style={styles.prod_desc_text}>{el.desc}</Text>
                </View>
                { cartContext.cart.includes(el.id) ? (
                  <LinearGradient colors={['#04A3E1', '#009cd8', '#009cd8']} style={styles.gradient} >
                    <TouchableOpacity style={styles.cart_btn_on} onPress={ _ => handleCartToggle(el.id) }>
                      <Text style={styles.cart_btn_text_on}>In Cart</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                ) : (
                  <TouchableOpacity style={styles.cart_btn} onPress={ _ => handleCartToggle(el.id) }>
                    <Text style={styles.cart_btn_text}>Add To Cart</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )
        })}
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

    store: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      paddingRight: 15,
      paddingLeft: 15,
      paddingBottom: 15,
    },

      prod_box: {
        width: Dimensions.get('screen').width / 2 - 24,
        height: 280,
        borderRadius: 6,
        borderColor: '#E2E2E2',
        backgroundColor: '#fff',
        marginTop: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.28,
        shadowRadius: 6,
        elevation: 5,
      },

        prod_img: {
          width: '100%',
          height: 120,
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
        },

        prod_price: {
          position: 'absolute',
          color: '#fff',
          backgroundColor: '#009cd8',
          fontSize: 14,
          borderWidth: 1,
          borderRadius: 22,
          borderColor: '#01A9A5',
          width: 44,
          height: 44,
          justifyContent: 'center',
          alignItems: 'center',
          top: 100,
          right: 14,
          zIndex: 2,
        },

          prod_price_text: {
            color: '#fff',
            fontSize: 14,
            fontWeight: 'bold', 
          },

        prod_desc: {
          justifyContent: 'space-between',
          width: '100%',
          height: 160,
          borderBottomRightRadius: 8,
          borderBottomLeftRadius: 8,
          padding: 12,
          backgroundColor: '#F2F2F2',
        },

          prod_desc_title: {
            paddingBottom: 5,
            color: 'grey',
            fontWeight: 'bold',
            fontSize: 16,
            width: 100,
          },

          prod_desc_text: {
            color: 'gray',
            fontSize: 14,
          },

        cart_btn: {
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 42,
          borderWidth: 1,
          borderColor: '#DDDDDD',
          borderRadius: 6,
        },

          cart_btn_text: {
            color: 'gray',
            fontWeight: 'bold',
            fontSize: 12,
          },

        cart_btn_on: {
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 42,
          borderWidth: 1,
          borderColor: '#DDDDDD',
          borderRadius: 6,
        },

          cart_btn_text_on: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 12,
          },

    book_btn_wrap: {
      paddingTop: 15,
    },

      gradient: {
        // marginBottom: 15,
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