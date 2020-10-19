import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function CartContent(props, { navigation }) {
  // const cart = props.cart;
  // console.log(props.cart);

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
            {/* { cart.length < 1 ? (
              <Text style={styles.cart_container_content_text}>Your Cart is Empty</Text>
            ) : (
              <View></View>
            )} */}
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
            marginRight: 10,
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

          cart_container_content_text: {
            opacity: 0.6,
          },
});