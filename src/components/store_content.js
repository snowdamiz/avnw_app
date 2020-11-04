import React, { useContext, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import Context from '../context/context.js';

import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

export default function StoreContent(props) {
  const cartContext = useContext(Context);

  useEffect( _ => {
    cartContext.setPreviousRoute('Store');
  }, [])

  const handleCartToggle = (prod) => cartContext.handleCart(prod);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.store}>
        {cartContext.merch.map((el) => {
          return (
            <View style={[styles.prod_box, styles.shadow1]} key={el.id}>
              <View style={styles.prod_img_box}>
                <Image source={{ uri: el.image }} style={styles.prod_img} />
              </View>
              <View style={styles.prod_price}>
                <Text style={styles.prod_price_text}>{`$${el.price}`}</Text>
              </View>
              <View style={styles.prod_desc}>
                <View>
                  <Text style={styles.prod_desc_title}>{el.product}</Text>
                  <Text style={styles.prod_desc_text}>{el.description}</Text>
                </View>
                { cartContext.cart.includes(el) ? (
                  <LinearGradient colors={['#04A3E1', '#009cd8', '#009cd8']} style={styles.gradient} >
                    <TouchableOpacity style={styles.cart_btn_on} onPress={ _ => handleCartToggle(el) }>
                      <Text style={styles.cart_btn_text_on}>In Cart</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                ) : (
                  <TouchableOpacity
                    style={styles.cart_btn}
                    disabled={cartContext.menuToggle}
                    onPress={ _ => handleCartToggle(el) }>
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

const elevationShadowStyle = (elevation) => {
  return {
    elevation,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation
  };
}


const styles = StyleSheet.create({
  shadow1: elevationShadowStyle(5),
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fdfdfd',
  },

    store: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      paddingRight: 15,
      paddingLeft: 15,
      paddingBottom: 15,
      paddingTop: 5,
    },

      prod_box: {
        width: Dimensions.get('screen').width / 2 - 24,
        borderRadius: 6,
        backgroundColor: '#fff',
        marginTop: 8,
        marginBottom: 7,
        alignItems: 'center',
      },

        prod_img_box: {
          width: 110,
          height: 110,
          borderTopRightRadius: 6,
          borderTopLeftRadius: 6,
        },

          prod_img: {
            width: '100%',
            height: 120,
            borderTopRightRadius: 6,
            borderTopLeftRadius: 6,
          },

        prod_price: {
          position: 'absolute',
          color: '#fff',
          backgroundColor: '#009cd8',
          fontSize: 14,
          // borderWidth: 1,
          borderRadius: 22,
          // borderColor: '#01A9A5',
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          top: 90,
          right: 10,
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
          height: 180,
          borderBottomRightRadius: 6,
          borderBottomLeftRadius: 6,
          padding: 12,
          backgroundColor: '#F2F2F2',
        },

          prod_desc_title: {
            paddingBottom: 5,
            color: '#666666',
            fontWeight: 'bold',
            fontSize: 14,
            width: 100,
          },

          prod_desc_text: {
            color: 'gray',
            fontSize: 13,
            paddingTop: 4,
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
          
      gradient: {
        alignItems: 'center',
        borderRadius: 8, 
      },
});