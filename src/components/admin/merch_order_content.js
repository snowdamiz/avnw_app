import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import Context from '../../context/context.js';

export default function MerchOrderContent(props) {
  const [toggle, setToggle] = useState(false);
  const cartContext = useContext(Context);

  useEffect( _ => {
    getAllMerchOrders();
  }, [])

  // GET ALL MERCH ORDERS
  const getAllMerchOrders = async _ => {
    const token = await AsyncStorage.getItem('token');
    const config = { headers: { Authorization: token }}

    try {
      await axios.get(`https://avnw-api.herokuapp.com/merch-orders`, config)
      .then(res => {
        cartContext.setMerchOrdersALL(res.data)
        console.log(res.data);
      })
      .catch(err => console.log(err))
    } catch (err) { console.log(err)}
  }

  // HANDLE MERCH ORDER SELECTION
  const handleMerchOrderSelect = el => {
    cartContext.setSelectedMerchOrder(el);
    props.navigation.navigate('SelectedMerchOrderADMIN');
  }

  // CONVERT DATE
  const convertDate = el => {
    let date = el;
    let dd = date.getDate();
    let mm = date.getMonth();
    let yy = date.getYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    date = dd + '/' + mm + '/' + yy;
    return date;
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.header, toggle ? styles.header_on : null]}
        onPress={ _ => setToggle(!toggle)}>
        <Text style={[styles.header_text, toggle ? styles.header_text_on : null]}>Product Orders</Text>
        <View style={styles.header_btns}>
          <TouchableOpacity onPress={ _ => setToggle(!toggle) }>
            <View style={ toggle ? styles.arrow_btn_up : styles.arrow_btn_down}></View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      { toggle ? (
          cartContext.merchOrdersALL.length > 0 ? (
            cartContext.merchOrdersALL.map(el => {
              return (
                <TouchableOpacity
                  style={styles.order} key={el.id}
                  onPress={ _ => handleMerchOrderSelect(el)}>
                  <Text style={styles.order_product}>{el.user.name}</Text>
                  <Text style={styles.order_product}>{el.createdAt}</Text>
                  <Text style={styles.order_status}>{el.status.toUpperCase()}</Text>
                </TouchableOpacity>
              )
            })
          ) : (
            <View style={styles.err}>
              <Text style={styles.err_text}>You have no orders</Text>
            </View>
          )
        ) : null }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    width: Dimensions.get('screen').width - 30,
    // marginTop: 15,
    marginBottom: 15,
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

        add_photographer_box: {
          width: 30,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
        },

          header_add_IMG: {
            width: 16,
            height: 16,
            opacity: 0.5,
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
      paddingBottom: 10,
    },

      err: {
        width: '100%',
        // borderWidth: 1,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
      },

        err_text: {
          padding: 10,
          opacity: 0.8,
        },

      order: {
        width: '100%',
        backgroundColor: '#fff',
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 10,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
      },

        order_product: {
          // fontWeight: 'bold',
          opacity: 0.7,
          maxWidth: 230,
          marginRight: 20,
          width: '30%',
          // borderWidth: 1,
        },

        order_status: {
          fontSize: 13,
          fontWeight: 'bold',
          opacity: 0.7,
          width: '25%',
          // borderWidth: 1,
        },
});








































