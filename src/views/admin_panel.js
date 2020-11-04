import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Context from '../context/context.js';

import Header from '../components/header.js';
import PhotographersContent from '../components/admin/photographers_content.js';

import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

export default function AdminPanel(props) {
  const [photographerName, setPhotographerName] = useState();
  const [photographerInsta, setPhotographerInsta] = useState();
  const [photographerImage, setPhotographerImage] = useState();
  const [photographerBio, setPhotographerBio] = useState();
  const [cover, setCover] = useState(false);
  const [err, setErr] = useState(0);
    
  const cartContext = useContext(Context);

  useEffect( _ => {
    setPhotographerName(cartContext.photographerEdit.name);
    setPhotographerInsta(cartContext.photographerEdit.insta_username);
    setPhotographerImage(cartContext.photographerEdit.profile_image);
    setPhotographerBio(cartContext.photographerEdit.bio);
  }, [cartContext.photographerEdit])

  useEffect( _ => {
    if (cartContext.newPhotographerToggle || cartContext.editPhotographerToggle || cartContext.deletePhotographerConfirmation) {
      setCover(true)
    } else setCover(false);
  }, [cartContext.newPhotographerToggle, cartContext.editPhotographerToggle])
  
  const handlePhotographerName = e => setPhotographerName(e);
  const handlePhotographerInsta = e => setPhotographerInsta(e);
  const handlePhotographerBio = e => setPhotographerBio(e);
  const handlePhotographerImage = e => setPhotographerImage(e);

  const handleCancelPhotographerNew = _ => {
    cartContext.handleNewPhotographerToggle();
    // setPhotographerName('');
    // setPhotographerInsta('');
    // setPhotographerImage('');
    // setPhotographerBio('');
  }
  
  const handleCancelPhotographerEdit = _ => {
    cartContext.handleEditPhotographerToggle();
  }

  const handleAdd = async _ => {
    if (photographerName && photographerInsta && photographerImage && photographerBio) {
      const photographer = {
        name: photographerName,
        insta_username: photographerInsta,
        profile_image: photographerImage,
        bio: photographerBio,
        createdAt: new Date(),
      }

      try {
        const token = await AsyncStorage.getItem('token');
        const config = { headers: { Authorization: token }}

        await axios.post('http://192.168.51.241:5000/photographers/', photographer, config)
          .then(res => cartContext.handleNewPhotographerToggle())
          .catch(err => console.log(err))
      } catch(err) { console.log(err) }
    } else setErr(1);
  }

  const handleEdit = async (el) => {
    if (photographerName && photographerInsta && photographerImage && photographerBio) {
      const photographer = {
        name: photographerName,
        insta_username: photographerInsta,
        profile_image: photographerImage,
        bio: photographerBio,
      }

      try {
        const token = await AsyncStorage.getItem('token');
        const config = { headers: { Authorization: token }}
        let id = cartContext.photographerEdit.id;

        await axios.put(`http://192.168.51.241:5000/photographers/${id}`, photographer, config)
          .then(res => {
            cartContext.handleEditPhotographerToggle();
            cartContext.getPhotographers();
          })
          .catch(err => console.log(err))
      } catch(err) { console.log(err) }
    } else setErr(1);
  }

  const handleConfirmDelete = async _ => {
    const data = {
      deletedAt: new Date(),
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const config = { headers: { Authorization: token }}
      let id = cartContext.photographerEdit.id;
      console.log(id);

      await axios.put(`http://192.168.51.241:5000/photographers/${id}`, data, config)
        .then(res => {
          cartContext.getPhotographers();
          cartContext.handleDeletePhotographerConfirmation();
        })
        .catch(err => console.log(err))
    } catch (err) { console.log(err) }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header navigation={props.navigation} />
      { cover ? <View style={styles.cover}></View> : null }
      { cartContext.deletePhotographerConfirmation ? (
        <View style={styles.delete_confirmation}>
          <Text style={styles.delete_confirmation_text}>
            Are you sure you want to delete this user?
          </Text>
          <View style={styles.confirmation_btns}>
            <TouchableOpacity
              style={styles.confirm_btn}
              onPress={ _ => handleConfirmDelete()}>
              <Text style={styles.confirm_btn_text}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deny_btn}>
              <Text style={styles.deny_btn_text}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null }
      { cartContext.newPhotographerToggle ? (
        <View style={styles.new_box}>
          <Text style={styles.new_title}>New Photographer</Text>
          <View style={styles.new_content}>
            <TextInput 
              style={[styles.input]}
              placeholder={'Name'}
              placeholderTextColor='#393939'
              onChangeText={(e) => handlePhotographerName(e)}
              value={photographerName}>
            </TextInput>
            <TextInput 
              style={[styles.input]}
              placeholder={'Instagram Handle'}
              placeholderTextColor='#393939'
              onChangeText={(e) => handlePhotographerInsta(e)}
              value={photographerInsta}>
            </TextInput>
            <TextInput 
              style={[styles.input]}
              placeholder={'Image URL'}
              placeholderTextColor='#393939'
              onChangeText={(e) => handlePhotographerImage(e)}
              value={photographerImage}>
            </TextInput>
            <TextInput 
              style={[styles.input, styles.bio_intput]}
              multiline={true}
              placeholder={'Bio'}
              placeholderTextColor='#393939'
              onChangeText={(e) => handlePhotographerBio(e)}
              value={photographerBio}>
            </TextInput>
          </View>
          <View style={styles.btns_box}>
            <TouchableOpacity style={styles.btn} onPress={ _ => handleCancelPhotographerNew()}>
              <Text style={styles.btn_text}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btn_add]} onPress={el => handleAdd(el)}>
              <Text style={styles.btn_text}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      ): null }
      { cartContext.editPhotographerToggle ? (
        <View style={styles.new_box}>
        <Text style={styles.new_title}>Edit Photographer</Text>
        <View style={styles.new_content}>
          <TextInput 
            style={[styles.input]}
            // placeholder={'Name'}
            placeholderTextColor='#393939'
            onChangeText={(e) => handlePhotographerName(e)}
            value={photographerName}>
          </TextInput>
          <TextInput 
            style={[styles.input]}
            placeholder={'Instagram Handle'}
            placeholderTextColor='#393939'
            onChangeText={(e) => handlePhotographerInsta(e)}
            value={photographerInsta}>
          </TextInput>
          <TextInput 
            style={[styles.input]}
            placeholder={'Image URL'}
            placeholderTextColor='#393939'
            onChangeText={(e) => handlePhotographerImage(e)}
            value={photographerImage}>
          </TextInput>
          <TextInput 
            style={[styles.input, styles.bio_intput]}
            multiline={true}
            placeholder={'Bio'}
            placeholderTextColor='#393939'
            onChangeText={(e) => handlePhotographerBio(e)}
            value={photographerBio}>
          </TextInput>
        </View>
        <View style={styles.btns_box}>
          <TouchableOpacity style={styles.btn} onPress={ _ => handleCancelPhotographerEdit()}>
            <Text style={styles.btn_text}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btn_add]} onPress={ el => handleEdit(el)}>
            <Text style={styles.btn_text}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
      ) : null }
      <ScrollView contentContainerStyle={styles.scroll}>
        <PhotographersContent navigation={props.navigation} />  
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

    new_box: {
      width: Dimensions.get('screen').width - 80,
      // height: 320,
      borderRadius: 6,
      // borderWidth: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      position: 'absolute',
      top: '18%',
      zIndex: 1,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.8,
      shadowRadius: 3.2,
      elevation: 8,
    },

      new_title: {
        fontWeight: 'bold',
        fontSize: 20,
        opacity: 0.6,
        marginTop: 30,
      },

      new_content: {
        marginTop: 15,
        marginBottom: 15,
      },

        input: {
          // borderWidth: 1,
          width: Dimensions.get('screen').width - 110,
          padding: 12,
          paddingLeft: 10,
          borderRadius: 4,
          backgroundColor: '#fff',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.6,
          shadowRadius: 3.2,
          elevation: 4,
          marginTop: 12,
        },

        bio_intput: {
          height: 150,
          textAlignVertical: 'top',
          lineHeight: 20,
        },

    btns_box: {
      // borderWidth: 1,
      width: Dimensions.get('screen').width - 110,
      marginBottom: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

      btn: {
        width: Dimensions.get('screen').width / 2 - 62,
        // borderWidth: 1,
        borderRadius: 4,
        backgroundColor: '#005575',
      },

      btn_add: {
        backgroundColor: '#009cd8',
      },

        btn_text: {
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 'bold',
          color: '#fff',
          opacity: 0.9,
          padding: 10,
        },

    delete_confirmation: {
      width: 300,
      height: 150,
      // borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      backgroundColor: '#fff',
      borderRadius: 6,
      zIndex: 1,
      top: '30%',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 6,
      elevation: 8,
      // marginTop: 12,
    },

      delete_confirmation_text: {
        fontSize: 15,
        fontWeight: 'bold',
        width: '70%',
        opacity: 0.6,
        textAlign: 'center',
        marginBottom: 20,
      },

      confirmation_btns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },

        confirm_btn: {
          width: Dimensions.get('screen').width / 2 - 90,
          // borderWidth: 1,
          textAlign: 'center',
          borderRadius: 4,
          marginRight: 5,
          backgroundColor: '#009cd8'
        },

        deny_btn: {
          width: Dimensions.get('screen').width / 2 - 80,
          // borderWidth: 1,
          textAlign: 'center',
          borderRadius: 4,
          marginLeft: 5,
          backgroundColor: '#005575',
        },

          confirm_btn_text: {
            textAlign: 'center',
            padding: 10,
            color: '#fff',
            fontWeight: 'bold',
          },

          deny_btn_text: {
            textAlign: 'center',
            padding: 10,
            color: '#fff',
            fontWeight: 'bold',
          },

    cover: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: 0.7,
      // borderWidth: 1,
      zIndex: 1,
      backgroundColor: '#fff',
      marginTop: 72,
    }
});
