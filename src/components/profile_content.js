import React, { useContext } from 'react';
import Context from '../context/context.js';
import EditBTN from '../assets/edit.png';

import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function ProfileContent(props) {
  const cartContext = useContext(Context);

  const handleEditAccount = _ => cartContext.handleEditAccountToggle();
  const handleEditShipping = _ => cartContext.handleEditShippingToggle();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profile}>
        <View style={styles.heading_warp}>
          <View style={styles.heading_box}>
            <Text style={styles.heading}>Account Details</Text>
            <TouchableOpacity
              style={styles.edit_btn}
              onPress={ _ => handleEditAccount()}>
              <Image source={EditBTN} style={styles.edit_btn_img} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.label}>Name: </Text>
            <Text style={styles.text}>{cartContext.user.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone: </Text>
            <Text style={styles.text}>{cartContext.user.phone}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email: </Text>
            <Text style={styles.text}>{cartContext.user.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Password: </Text>
            <Text style={styles.text}>*************</Text>
          </View>
        </View>
        <View style={[styles.heading_warp, styles.header_wrap_spec]}>
          <View style={styles.heading_box}>
            <Text style={styles.heading}>Shipping Location</Text>
            <TouchableOpacity
              style={styles.edit_btn}
              onPress={ _ => handleEditShipping()}>
              <Image source={EditBTN} style={styles.edit_btn_img} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.label}>Address: </Text>
            <Text style={styles.text}>{cartContext.user.address}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Unit: </Text>
            <Text style={styles.text}>{cartContext.user.unit}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>City: </Text>
            <Text style={styles.text}>{cartContext.user.city}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>State: </Text>
            <Text style={styles.text}>{cartContext.user.state}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Zip: </Text>
            <Text style={styles.text}>{cartContext.user.zip}</Text>
          </View>
        </View>
      </View> 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('screen').width - 20,
  },

  profile: {
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 15,
    },

      heading_warp: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 15,
      },

      header_wrap_spec: {
        marginTop: 30,
      },

        heading_box: {
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginLeft: 2,
        },

          heading: {
            fontSize: 18,
            fontWeight: 'bold',
            opacity: 0.60,
          },

          edit_btn: {
            height: 18,
            width: 18,
            justifyContent: 'center',
            alignItems: 'center',
          },

          edit_btn_img: {
            height: 18,
            width: 18,
            opacity: 0.70,
          },

    content: {
      // marginLeft: 5,
      marginTop: 10,
      // borderWidth: 1,
      borderRadius: 6,
      padding: 5,
      backgroundColor: '#efefef',
    },

      row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 4,
      },

        label: {
          fontWeight: 'bold',
          fontSize: 15,
          color: '#005575',
          opacity: 0.75,
          width: 100,
          backgroundColor: '#fff',
          padding: 5,
          borderRadius: 4,
        },

        text: {
          paddingLeft: 4,
          fontSize: 15,
          opacity: 0.60,
          marginLeft: 10,
        },
});