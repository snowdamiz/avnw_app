import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Context from '../../context/context.js';
import Header from '../../components/header.js';

import { StyleSheet, View, Text, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AdminPanel(props) {
  const [photographerName, setPhotographerName] = useState();
  const [photographerInsta, setPhotographerInsta] = useState();
  const [photographerImage, setPhotographerImage] = useState();
  const [photographerBio, setPhotographerBio] = useState();
  const [err, setErr] = useState(0);
  
  const cartContext = useContext(Context);

  useEffect( _ => {
    setPhotographerName(cartContext.photographerEdit.name);
    setPhotographerInsta(cartContext.photographerEdit.insta_username);
    setPhotographerImage(cartContext.photographerEdit.profile_image);
    setPhotographerBio(cartContext.photographerEdit.bio);
  }, [cartContext.photographerEdit])
  
  const handlePhotographerName = e => setPhotographerName(e);
  const handlePhotographerInsta = e => setPhotographerInsta(e);
  const handlePhotographerBio = e => setPhotographerBio(e);
  const handlePhotographerImage = e => setPhotographerImage(e);

  // Handle Canel Button; Reset State and Navigate
  const handleCancel = _ => {
    props.navigation.navigate('AdminPanel');
    setPhotographerName('');
    setPhotographerInsta('');
    setPhotographerImage('');
    setPhotographerBio('');
  }

  // Determins if form is for new or editing
  const handleFormType = async _ => {
    let formType = cartContext.adminPhotographerInteraction;
    console.log(formType);
    if(formType === 'new') handleAdd()
    else if (formType === 'edit') handleEdit();
  }

  // Handles adding new content
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
          .then(res => {
            cartContext.setPhotographers(res.data);
            props.navigation.navigate('AdminPanel')
          })
          .catch(err => console.log(err))
      } catch(err) { console.log(err, 'Client Error')}
    } else setErr(1);
  }

  // Handles editing content
  const handleEdit = async _ => {
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
            cartContext.setPhotographers(res.data);
            props.navigation.navigate('AdminPanel')
          })
          .catch(err => console.log(err))
      } catch(err) { console.log(err) }
    } else setErr(1);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <Header navigation={props.navigation} />
        <View style={styles.wrap}>
          <Text style={styles.title}>
            { cartContext.adminPhotographerInteraction === 'new' ? 'New Photographer' : 'Edit Photographer' }
          </Text>
          <View style={styles.content}>
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
            <TouchableOpacity style={styles.btn} onPress={ _ => handleCancel()}>
              <Text style={styles.btn_text}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btn_add]} onPress={ _ => handleFormType()}>
              <Text style={styles.btn_text}>
              { cartContext.adminPhotographerInteraction === 'new' ? 'Add' : 'Edit' }
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    </KeyboardAvoidingView>
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

    wrap: {
      width: Dimensions.get('screen').width - 60,
      borderRadius: 6,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      top: 30,
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

      title: {
        fontWeight: 'bold',
        fontSize: 20,
        opacity: 0.6,
        marginTop: 30,
      },

      content: {
        marginTop: 15,
        marginBottom: 15,
      },

        input: {
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
      width: Dimensions.get('screen').width - 110,
      marginBottom: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

      btn: {
        width: Dimensions.get('screen').width / 2 - 62,
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
});
