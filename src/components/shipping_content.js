import React, { useContext } from 'react';
import { useRoute } from '@react-navigation/native';

import EditIMG from '../assets/edit.png';
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_text}>Shipping Information</Text>
        <TouchableOpacity style={styles.header_edit}>
          <Image source={EditIMG} style={styles.header_edit_IMG} />
        </TouchableOpacity>
      </View>
      <View style={styles.content_g}>
        <Text style={styles.content_title}>Street Address:</Text>
        <Text style={styles.content_text}>{cartContext.user.address}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.content_title}>Unit Number:</Text>
        <Text style={styles.content_text}>{cartContext.user.unit}</Text>
      </View>
      <View style={styles.content_g}>
        <Text style={styles.content_title}>City:</Text>
        <Text style={styles.content_text}>{cartContext.user.city}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.content_title}>State:</Text>
        <Text style={styles.content_text}>{cartContext.user.state}</Text>
      </View>
      <View style={styles.content_gbr}>
        <Text style={styles.content_title}>Zip Code:</Text>
        <Text style={styles.content_text}>{cartContext.user.zip}</Text>
      </View>
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
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 4,
  },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: 15,
      borderBottomColor: '#DDDDDD',
      borderTopColor: '#fff',
      borderLeftColor: '#fff',
      borderRightColor: '#fff',
    },

      header_text: {
        fontSize: 15,
        fontWeight: 'bold',
        opacity: 0.5,
      },

      header_edit_IMG: {
        width: 16,
        height: 16,
        opacity: 0.5,
      },

    content: {
      width: '100%',
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    content_g: {
      backgroundColor: '#E8E8E8',
      width: '100%',
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    
    content_gbr: {
      backgroundColor: '#E8E8E8',
      width: '100%',
      padding: 10,
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









































