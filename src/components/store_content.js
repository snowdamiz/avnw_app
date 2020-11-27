import React, { useContext, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import Context from '../context/context.js';

import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

export default function StoreContent(props) {
  const cartContext = useContext(Context);

  useEffect( _ => {
    cartContext.setPreviousRoute('Store');
  }, [])

  const handleProductSelect = el => {
    cartContext.setChosenProduct(el);
    props.navigation.navigate('SelectedProduct');
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.store}>
        {cartContext.merch.map((el) => {
          return (
            <TouchableOpacity onPress={ _ => handleProductSelect(el)} key={el.id}>
              <View style={styles.prod_box}>
                <View style={styles.prod_img_box}>
                  <Image source={{ uri: el.image1 }} style={styles.prod_img} />
                </View>
                <View style={styles.prod_price}>
                  <Text style={styles.prod_price_text}>{`$${el.price}`}</Text>
                </View>
                <View style={styles.prod_desc}>
                  <View>
                    <Text style={styles.prod_desc_title}>{el.product}</Text>
                    <Text style={styles.prod_desc_text}>{`${el.description.substring(1, 40)} ...`}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
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
        borderWidth: 1,
        borderColor: 'lightgray',
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
          width: 44,
          height: 44,
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
          height: 120,
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
          
      gradient: {
        alignItems: 'center',
        borderRadius: 8, 
      },
});